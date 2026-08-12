import { useCallback, useEffect, useRef, useState } from 'react'
import { worlds } from './data/roadmap'
import type { Step } from './types'
import { useProgress } from './useProgress'
import {
  XP_BY_DIFFICULTY,
  findSubstep,
  globalProgress,
  nextUp,
  worldProgress,
  worldState,
} from './progress'
import type { Completed } from './progress'
import { celebrate, celebrateBig } from './components/Confetti'
import Journey from './components/Journey'
import JourneyRail, { daysUntilExam } from './components/JourneyRail'
import WorldView from './components/WorldView'
import StepDrawer from './components/StepDrawer'
import Quiz from './components/Quiz'
import Focus from './components/Focus'
import ProgressBar from './components/ProgressBar'
import { paletteFor } from './palettes'
import {
  Apple,
  CalendarDays,
  Check,
  ClipboardList,
  Lock,
  Map,
  Star,
  Timer,
  TrendingUp,
  worldIcon,
} from './components/icons'

type View = 'map' | 'world' | 'quiz' | 'foco'

const PRAISE = ['Boa! Mais um passo.', 'Isso aí.', 'Seguindo firme.', 'Mais um na conta.', 'Vai bem.']

export default function App() {
  const {
    completed,
    overrides,
    lastCompletedId,
    quizBest,
    focus,
    toggleSubstep,
    unlockWorld,
    recordQuiz,
    setFocusGoal,
    logFocus,
    reset,
  } = useProgress()

  // O mapa é a tela inicial: o app abre direto na jornada.
  const [view, setView] = useState<View>('map')
  const [worldId, setWorldId] = useState<string | null>(null)
  const [openStep, setOpenStep] = useState<Step | null>(null)
  const [toast, setToast] = useState<{ key: number; xp: number; text: string } | null>(null)
  const toastTimer = useRef<number | undefined>(undefined)

  const world = worlds.find((w) => w.id === worldId) ?? null
  const overall = globalProgress(worlds, completed)
  const next = nextUp(worlds, completed, overrides)
  const xp = worlds
    .flatMap((w) => w.steps.flatMap((s) => s.substeps))
    .filter((s) => completed.has(s.id))
    .reduce((sum, s) => sum + XP_BY_DIFFICULTY[s.difficulty], 0)
  const days = daysUntilExam()

  useEffect(() => () => window.clearTimeout(toastTimer.current), [])

  const go = useCallback((v: View) => {
    setView(v)
    setOpenStep(null)
    window.scrollTo({ top: 0 })
  }, [])

  const openWorld = useCallback((id: string) => {
    setWorldId(id)
    setView('world')
    setOpenStep(null)
    window.scrollTo({ top: 0 })
  }, [])

  /** Continuar jornada: abre o mundo do próximo conteúdo e já escancara o drawer certo. */
  const continueJourney = useCallback(() => {
    if (!next) return go('map')
    setWorldId(next.world.id)
    setView('world')
    setOpenStep(next.step)
    window.scrollTo({ top: 0 })
  }, [next, go])

  const handleToggle = useCallback(
    (id: string, origin: { x: number; y: number }) => {
      const turnedOn = toggleSubstep(id)
      if (!turnedOn) return

      const found = findSubstep(worlds, id)
      if (!found) return

      celebrate(origin)

      // O mundo ficou completo com este substep? (o estado ainda não foi aplicado
      // aqui, então simulamos o conjunto resultante)
      const after = new Set(completed)
      after.add(id)
      const wp = worldProgress(found.world, after)
      if (wp.pct === 100) window.setTimeout(celebrateBig, 260)

      window.clearTimeout(toastTimer.current)
      setToast({
        key: Date.now(),
        xp: XP_BY_DIFFICULTY[found.substep.difficulty],
        text:
          wp.pct === 100
            ? `Mundo ${found.world.shortTitle} concluído!`
            : PRAISE[Math.floor(Math.random() * PRAISE.length)],
      })
      toastTimer.current = window.setTimeout(() => setToast(null), 2300)
    },
    [completed, toggleSubstep],
  )

  const palette = paletteFor(world?.color ?? 'final')
  const onMap = view === 'map'

  return (
    <div className="min-h-dvh">
      <a
        href="#main"
        /* fixed, não absolute: com a página rolada, um link absolute ficaria acima
           da viewport e o usuário de teclado focaria algo invisível. */
        className="sr-only rounded-full bg-primary px-4 py-2 font-label font-bold text-white focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
      >
        Pular para o conteúdo
      </a>

      <div className="lg:flex">
        <Sidebar
          view={view}
          worldId={worldId}
          pct={overall.pct}
          completed={completed}
          overrides={overrides}
          onGoMap={() => go('map')}
          onGoQuiz={() => go('quiz')}
          onGoFocus={() => go('foco')}
          onOpenWorld={openWorld}
          onReset={reset}
        />

        <div className="min-w-0 flex-1">
          <TopBar
            pct={overall.pct}
            xp={xp}
            days={days}
            done={overall.done}
            total={overall.total}
            onGoMap={() => go('map')}
          />

          <main id="main" className="pb-28 lg:pb-10">
            {onMap && (
              <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 pt-4 lg:px-8">
                <div className="mx-auto w-full max-w-md min-w-0">
                  <MobileSummary
                    pct={overall.pct}
                    xp={xp}
                    days={days}
                    nextLabel={next ? next.substep.title : null}
                    nextIconKey={next?.world.icon ?? 'apple'}
                    onContinue={continueJourney}
                  />
                  <Journey
                    worlds={worlds}
                    completed={completed}
                    overrides={overrides}
                    nextWorldId={next?.world.id ?? null}
                    onOpenWorld={openWorld}
                    onUnlock={unlockWorld}
                  />
                </div>

                <JourneyRail
                  worlds={worlds}
                  completed={completed}
                  overrides={overrides}
                  lastCompletedId={lastCompletedId}
                  onContinue={continueJourney}
                />
              </div>
            )}

            {view === 'world' && world && (
              <WorldView
                world={world}
                completed={completed}
                nextSubstepId={next?.substep.id ?? null}
                onOpenStep={setOpenStep}
                onBack={() => go('map')}
                onStartQuiz={() => go('quiz')}
              />
            )}

            {view === 'foco' && (
              <Focus focus={focus} onSetGoal={setFocusGoal} onLog={logFocus} />
            )}

            {view === 'quiz' && (
              <Quiz
                worlds={worlds}
                best={quizBest}
                onFinish={recordQuiz}
                onOpenWorld={openWorld}
                onBack={() => go('map')}
              />
            )}
          </main>
        </div>
      </div>

      <BottomDock
        view={view}
        onGoMap={() => go('map')}
        onGoQuiz={() => go('quiz')}
        onGoFocus={() => go('foco')}
      />

      <StepDrawer
        step={openStep}
        worldTitle={world?.title ?? ''}
        palette={palette}
        completed={completed}
        onToggle={handleToggle}
        onClose={() => setOpenStep(null)}
      />

      {/* Toast de XP — anunciado por leitores de tela, já que o confete é só visual. */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {toast ? `${toast.text} Mais ${toast.xp} XP.` : ''}
      </div>
      {toast && (
        <div
          key={toast.key}
          aria-hidden="true"
          className="anim-toast pointer-events-none fixed bottom-24 left-1/2 z-50 flex items-center gap-2.5 rounded-full bg-inverse px-4 py-3 text-on-inverse shadow-float lg:bottom-8"
        >
          <span className="grid size-6 place-items-center rounded-full bg-tertiary-container text-on-tertiary-container">
            <Check className="size-3.5" strokeWidth={3.2} />
          </span>
          <span className="font-label text-[14px] font-bold">{toast.text}</span>
          <span className="rounded-full bg-white/16 px-2.5 py-0.5 font-label text-[13px] font-bold tabular-nums">
            +{toast.xp} XP
          </span>
        </div>
      )}
    </div>
  )
}

/* ─────────────────────────── Layout ─────────────────────────── */

function TopBar({
  pct,
  xp,
  days,
  done,
  total,
  onGoMap,
}: {
  pct: number
  xp: number
  days: number
  done: number
  total: number
  onGoMap: () => void
}) {
  return (
    <header className="sticky top-0 z-30 border-b border-high bg-surface/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-2.5 lg:px-8">
        {/* Marca só no mobile — no desktop ela vive na sidebar. */}
        <button
          type="button"
          onClick={onGoMap}
          className="flex min-h-11 items-center gap-2 lg:hidden"
          aria-label="Ir para o mapa"
        >
          <Apple aria-hidden="true" className="size-[22px] text-primary" strokeWidth={2} />
          <span className="font-display text-[15px] leading-none font-extrabold">Design iOS</span>
        </button>

        <div className="hidden min-w-0 flex-1 items-center gap-3 lg:flex">
          <ProgressBar pct={pct} label="Progresso geral da jornada" size="sm" />
          <span className="shrink-0 font-label text-[13px] font-bold tabular-nums text-ink-variant">
            {done}/{total}
          </span>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Chip icon={<Star className="size-4" fill="currentColor" strokeWidth={0} />} value={String(xp)} label={`${xp} pontos de experiência`} tone="primary" />
          <Chip icon={<TrendingUp className="size-4" strokeWidth={2.4} />} value={`${pct}%`} label={`${pct} por cento concluído`} tone="tertiary" />
          {days > 0 && (
            <Chip
              icon={<CalendarDays className="size-4" strokeWidth={2} />}
              value={String(days)}
              label={`${days} dias até a prova`}
              tone="secondary"
            />
          )}
        </div>
      </div>
    </header>
  )
}

const CHIP_TONE = {
  primary: 'bg-primary-container text-on-primary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
  secondary: 'bg-secondary-container text-on-secondary-container',
} as const

function Chip({
  icon,
  value,
  label,
  tone,
}: {
  icon: React.ReactNode
  value: string
  label: string
  tone: keyof typeof CHIP_TONE
}) {
  return (
    <span
      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1.5 font-label text-[13px] font-bold tabular-nums ${CHIP_TONE[tone]}`}
      title={label}
    >
      {icon}
      <span className="sr-only">{label}</span>
      <span aria-hidden="true">{value}</span>
    </span>
  )
}

function Sidebar({
  view,
  worldId,
  pct,
  completed,
  overrides,
  onGoMap,
  onGoQuiz,
  onGoFocus,
  onOpenWorld,
  onReset,
}: {
  view: View
  worldId: string | null
  pct: number
  completed: Completed
  overrides: Completed
  onGoMap: () => void
  onGoQuiz: () => void
  onGoFocus: () => void
  onOpenWorld: (id: string) => void
  onReset: () => void
}) {
  return (
    <aside className="sticky top-0 hidden h-dvh w-64 shrink-0 flex-col border-r border-high bg-low px-4 py-5 lg:flex">
      <button
        type="button"
        onClick={onGoMap}
        className="flex items-center gap-2.5 rounded-xl px-1 text-left"
      >
        <Apple aria-hidden="true" className="size-7 shrink-0 text-primary" strokeWidth={2} />
        <span>
          <span className="block font-display text-[17px] leading-tight font-extrabold">
            Design iOS
          </span>
          <span className="block text-[12px] text-ink-variant">Academy UCB</span>
        </span>
      </button>

      <div className="mt-4 rounded-xl bg-lowest px-3.5 py-3 stroke-inner">
        <p className="label-caps text-[10px] text-ink-variant">Jornada</p>
        <p className="mt-1 font-display text-[24px] leading-none font-extrabold tabular-nums">
          {pct}%
        </p>
        <div className="mt-2">
          <ProgressBar pct={pct} label="Progresso geral da jornada" size="sm" />
        </div>
      </div>

      <nav className="mt-4 flex flex-col gap-1" aria-label="Navegação principal">
        <NavItem icon={<Map className="size-5" strokeWidth={1.9} />} label="Mapa" active={view === 'map'} onClick={onGoMap} />
        <NavItem icon={<Timer className="size-5" strokeWidth={1.9} />} label="Foco" active={view === 'foco'} onClick={onGoFocus} />
        <NavItem icon={<ClipboardList className="size-5" strokeWidth={1.9} />} label="Simulado" active={view === 'quiz'} onClick={onGoQuiz} />
      </nav>

      <p className="label-caps mt-5 px-2 text-[10px] text-ink-variant">Mundos</p>
      <ul className="mt-1.5 flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto pr-1">
        {worlds.map((w, i) => {
          const state = worldState(worlds, i, completed, overrides)
          const { pct: wp, done, total } = worldProgress(w, completed)
          const p = paletteFor(w.color)
          const locked = state === 'locked'
          const active = view === 'world' && worldId === w.id
          const WIcon = worldIcon(w.icon)

          return (
            <li key={w.id}>
              <button
                type="button"
                onClick={locked ? undefined : () => onOpenWorld(w.id)}
                disabled={locked}
                aria-current={active ? 'page' : undefined}
                className={`flex w-full items-center gap-2.5 rounded-xl px-2 py-2 text-left transition ${
                  locked
                    ? 'cursor-not-allowed opacity-45'
                    : active
                      ? 'bg-lowest shadow-soft'
                      : 'hover:bg-lowest/70'
                }`}
              >
                {locked ? (
                  <Lock
                    aria-hidden="true"
                    className="size-[17px] shrink-0 text-ink-variant"
                    strokeWidth={2}
                  />
                ) : (
                  <WIcon
                    aria-hidden="true"
                    className="size-[17px] shrink-0"
                    style={{ color: p.accent }}
                    strokeWidth={2}
                  />
                )}
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-label text-[13px] font-bold">
                    {w.shortTitle}
                  </span>
                  <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-high">
                    <span
                      className="block h-full rounded-full transition-[width] duration-700"
                      style={{ width: `${wp}%`, background: p.accent }}
                    />
                  </span>
                </span>
                <span className="shrink-0 text-[11px] text-ink-variant tabular-nums">
                  {done}/{total}
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <button
        type="button"
        onClick={() => {
          if (confirm('Apagar todo o seu progresso? Isso não pode ser desfeito.')) onReset()
        }}
        className="mt-3 min-h-10 shrink-0 rounded-full px-3 font-label text-[12px] font-bold text-ink-variant transition hover:text-ink"
      >
        Zerar progresso
      </button>
    </aside>
  )
}

function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? 'page' : undefined}
      className={`flex min-h-12 items-center gap-3 rounded-xl px-3 font-label text-[15px] font-bold transition ${
        active ? 'bg-primary-container text-on-primary-container' : 'text-ink hover:bg-lowest/70'
      }`}
    >
      {icon}
      {label}
    </button>
  )
}

/** Navegação em dock no rodapé — o padrão mobile definido no DESIGN.md. */
function BottomDock({
  view,
  onGoMap,
  onGoQuiz,
  onGoFocus,
}: {
  view: View
  onGoMap: () => void
  onGoQuiz: () => void
  onGoFocus: () => void
}) {
  const item = (active: boolean) =>
    `flex min-h-13 flex-1 flex-col items-center justify-center gap-1 rounded-xl font-label text-[12px] font-bold transition ${
      active ? 'bg-primary-container text-on-primary-container' : 'text-ink-variant'
    }`

  return (
    <nav
      aria-label="Navegação principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-high bg-surface/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto flex max-w-sm gap-2">
        <button
          type="button"
          onClick={onGoMap}
          aria-current={view === 'map' || view === 'world' ? 'page' : undefined}
          className={item(view === 'map' || view === 'world')}
        >
          <Map className="size-5" strokeWidth={1.9} />
          Mapa
        </button>
        <button
          type="button"
          onClick={onGoFocus}
          aria-current={view === 'foco' ? 'page' : undefined}
          className={item(view === 'foco')}
        >
          <Timer className="size-5" strokeWidth={1.9} />
          Foco
        </button>
        <button
          type="button"
          onClick={onGoQuiz}
          aria-current={view === 'quiz' ? 'page' : undefined}
          className={item(view === 'quiz')}
        >
          <ClipboardList className="size-5" strokeWidth={1.9} />
          Simulado
        </button>
      </div>
    </nav>
  )
}

/** Resumo compacto acima do mapa — substitui o painel lateral onde ele não cabe. */
function MobileSummary({
  pct,
  xp,
  days,
  nextLabel,
  nextIconKey,
  onContinue,
}: {
  pct: number
  xp: number
  days: number
  nextLabel: string | null
  nextIconKey: string
  onContinue: () => void
}) {
  const NextIcon = worldIcon(nextIconKey)
  return (
    <section className="anim-rise mb-2 rounded-bubble bg-lowest p-4 stroke-inner shadow-soft xl:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="label-caps text-[10px] text-ink-variant">Sua jornada</p>
          <p className="mt-0.5 font-display text-[26px] leading-none font-extrabold tabular-nums">
            {pct}%
          </p>
        </div>
        <div className="text-right text-[12px] text-ink-variant tabular-nums">
          <p>
            <strong className="font-label font-bold text-ink">{xp}</strong> XP
          </p>
          {days > 0 && (
            <p>
              <strong className="font-label font-bold text-ink">{days}</strong> dias até a prova
            </p>
          )}
        </div>
      </div>

      <div className="mt-3">
        <ProgressBar pct={pct} label="Progresso geral da jornada" />
      </div>

      {nextLabel && (
        <button
          type="button"
          onClick={onContinue}
          className="btn-squish mt-3.5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 font-label text-[15px] font-bold text-white"
        >
          <NextIcon aria-hidden="true" className="size-[18px] shrink-0" strokeWidth={2} />
          <span className="truncate">Continuar: {nextLabel}</span>
        </button>
      )}
    </section>
  )
}
