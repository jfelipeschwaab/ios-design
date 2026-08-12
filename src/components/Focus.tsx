import { useEffect, useRef, useState } from 'react'
import type { FocusState } from '../useProgress'
import { applesFor, dayKey, heatmapDays } from '../focusMath'
import { SOUNDS, playSound, setVolume } from '../focusSound'
import type { SoundId } from '../focusSound'
import { celebrate } from './Confetti'
import ProgressBar from './ProgressBar'
import {
  Apple,
  CloudRain,
  Coffee,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Settings2,
  Volume2,
  Waves,
  X,
} from './icons'

type Props = {
  focus: FocusState
  onSetGoal: (goalMin: number, sessions: number) => void
  onLog: (minutes: number) => void
}

const SOUND_ICONS: Record<SoundId, typeof CloudRain> = {
  rain: CloudRain,
  waves: Waves,
  cafe: Coffee,
}

const mmss = (ms: number) => {
  const total = Math.max(0, Math.ceil(ms / 1000))
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`
}

export default function Focus({ focus, onSetGoal, onLog }: Props) {
  const { goalMin, sessions, log } = focus

  const sessionMin = Math.max(1, Math.round(goalMin / sessions))
  const sessionMs = sessionMin * 60_000

  /** Rodando: timestamp absoluto do fim. Ocioso/pausado: null. */
  const [endsAt, setEndsAt] = useState<number | null>(null)
  /** O que é exibido — e a fonte da verdade enquanto está pausado. */
  const [leftMs, setLeftMs] = useState(sessionMs)
  const [editing, setEditing] = useState(false)
  const [sound, setSound] = useState<SoundId | null>(null)
  const [vol, setVol] = useState(0.5)
  const [full, setFull] = useState(false)
  const [announce, setAnnounce] = useState('')

  const boxRef = useRef<HTMLDivElement>(null)
  const running = endsAt !== null

  /* ── Timer ──────────────────────────────────────────────────────────────
     A contagem nunca decrementa um contador (que acumularia erro e congelaria
     com a aba em background). A verdade é o timestamp `endsAt`; o intervalo só
     recalcula a diferença para Date.now(). */

  // `finish` muda a cada render; guardá-lo numa ref evita re-assinar o intervalo
  // no meio do segundo, o que reiniciaria a contagem.
  const finishRef = useRef<() => void>(() => {})
  finishRef.current = () => {
    onLog(sessionMin)
    setLeftMs(sessionMs)
    setAnnounce(`Sessão concluída. ${sessionMin} minutos registrados.`)
    celebrate()
  }

  useEffect(() => {
    if (endsAt === null) return

    const tick = () => {
      const left = endsAt - Date.now()
      setLeftMs(left > 0 ? left : 0)
      if (left <= 0) {
        setEndsAt(null)
        finishRef.current()
      }
    }

    tick() // já acerta o relógio no start, sem esperar o primeiro segundo
    const id = window.setInterval(tick, 1000)
    // Aba em background é limitada a ~1 tick/min: recalcula ao voltar para ela.
    document.addEventListener('visibilitychange', tick)
    window.addEventListener('focus', tick)

    return () => {
      window.clearInterval(id)
      document.removeEventListener('visibilitychange', tick)
      window.removeEventListener('focus', tick)
    }
  }, [endsAt])

  /* Meta alterada com o timer parado: recarrega o relógio.
     Depende só de sessionMs — se `endsAt` estivesse nas deps, pausar (que o zera)
     dispararia o efeito e jogaria o relógio de volta para o início. */
  const endsAtRef = useRef(endsAt)
  endsAtRef.current = endsAt
  useEffect(() => {
    if (endsAtRef.current === null) setLeftMs(sessionMs)
  }, [sessionMs])

  /* Sair da tela no meio de uma sessão não pode apagar o tempo já focado.
     A ref vive fora do efeito para que o cleanup (que roda uma vez só, no
     unmount) enxergue os valores do último render. */
  const liveRef = useRef({ endsAt, sessionMs, onLog })
  liveRef.current = { endsAt, sessionMs, onLog }
  useEffect(
    () => () => {
      const { endsAt: e, sessionMs: total, onLog: log } = liveRef.current
      if (e !== null) log((total - (e - Date.now())) / 60_000)
      playSound(null)
    },
    [],
  )

  const start = () => {
    setEndsAt(Date.now() + leftMs)
    setAnnounce(`Sessão de ${sessionMin} minutos iniciada.`)
  }

  const pause = () => {
    if (endsAt === null) return
    setLeftMs(endsAt - Date.now()) // exato mesmo entre dois ticks
    setEndsAt(null)
    setAnnounce('Sessão pausada.')
  }

  /** Abortar credita os minutos parciais — o esforço conta, a maçã não. */
  const abort = () => {
    const done = endsAt === null ? sessionMs - leftMs : sessionMs - (endsAt - Date.now())
    onLog(done / 60_000)
    setEndsAt(null)
    setLeftMs(sessionMs)
    setAnnounce('Sessão encerrada.')
  }

  const toggleFull = () => {
    if (document.fullscreenElement) void document.exitFullscreen()
    else void boxRef.current?.requestFullscreen().catch(() => {})
  }

  useEffect(() => {
    const onChange = () => setFull(document.fullscreenElement !== null)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  /* ── Números derivados ─────────────────────────────────────────────────
     Nada disso é armazenado: como o XP em progress.ts, tudo sai do log. */

  const todayMin = log[dayKey()] ?? 0
  const todayPct = Math.min(100, Math.round((todayMin / goalMin) * 100))
  const todaySessions = Math.floor(todayMin / sessionMin)

  const apples = Object.values(log).reduce((sum, m) => sum + applesFor(m, sessionMin, goalMin), 0)

  const sessionPct = Math.round((1 - leftMs / sessionMs) * 100)

  return (
    <div className="mx-auto flex w-full max-w-6xl gap-6 px-4 pt-4 lg:px-8">
      <div className="mx-auto w-full max-w-md min-w-0 xl:max-w-none xl:flex-1">
        {/* O elemento que entra em tela cheia — por isso ele mesmo pinta o fundo. */}
        <div
          ref={boxRef}
          className={`anim-rise rounded-bubble bg-lowest p-6 stroke-inner shadow-soft ${
            full ? 'grid h-dvh place-content-center rounded-none' : ''
          }`}
        >
          <p className="text-center label-caps text-[10px] text-ink-variant">
            {running ? 'Em foco' : 'Pronto para focar'}
          </p>

          <p
            className={`mt-2 text-center font-display leading-none font-extrabold tabular-nums text-ink ${
              full ? 'text-[18vw]' : 'text-[64px] sm:text-[76px]'
            }`}
          >
            {mmss(leftMs)}
          </p>

          <div className="mx-auto mt-5 w-full max-w-sm">
            <ProgressBar pct={sessionPct} label="Progresso da sessão" size="sm" />
            <p className="mt-2 text-center text-[12.5px] text-ink-variant">
              Sessão de {sessionMin} min · {todaySessions}/{sessions} hoje
            </p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <RoundBtn label="Encerrar sessão" onClick={abort} disabled={!running && leftMs === sessionMs}>
              <X className="size-[18px]" strokeWidth={2.6} />
            </RoundBtn>

            <button
              type="button"
              onClick={running ? pause : start}
              className="btn-squish flex min-h-14 items-center justify-center gap-2 rounded-full bg-primary px-7 font-label text-[15px] font-bold text-white"
            >
              {running ? (
                <Pause aria-hidden="true" className="size-5" fill="currentColor" strokeWidth={0} />
              ) : (
                <Play aria-hidden="true" className="size-5" fill="currentColor" strokeWidth={0} />
              )}
              {running ? 'PAUSAR' : leftMs === sessionMs ? 'INICIAR' : 'RETOMAR'}
            </button>

            <RoundBtn label={full ? 'Sair da tela cheia' : 'Tela cheia'} onClick={toggleFull}>
              {full ? (
                <Minimize2 className="size-[18px]" strokeWidth={2.2} />
              ) : (
                <Maximize2 className="size-[18px]" strokeWidth={2.2} />
              )}
            </RoundBtn>
          </div>
        </div>

        {/* No mobile os cards do rail viram uma pilha abaixo do timer. */}
        <div className="mt-4 flex flex-col gap-4 xl:hidden">
          <TodayCard {...{ todayMin, goalMin, todayPct, apples, onEdit: () => setEditing(true) }} />
          <SoundCard {...{ sound, setSound, vol, setVol }} />
          <HeatmapCard log={log} goalMin={goalMin} />
        </div>
      </div>

      <aside className="hidden w-80 shrink-0 flex-col gap-4 xl:flex">
        <TodayCard {...{ todayMin, goalMin, todayPct, apples, onEdit: () => setEditing(true) }} />
        <SoundCard {...{ sound, setSound, vol, setVol }} />
        <HeatmapCard log={log} goalMin={goalMin} />
      </aside>

      {/* O confete é só visual; o leitor de tela recebe início e fim — nunca os
          segundos, que virariam uma metralhadora de anúncios. */}
      <p aria-live="polite" aria-atomic="true" className="sr-only">
        {announce}
      </p>

      <GoalDialog
        open={!focus.onboarded || editing}
        first={!focus.onboarded}
        goalMin={goalMin}
        sessions={sessions}
        onSave={(g, s) => {
          onSetGoal(g, s)
          setEditing(false)
        }}
        onClose={() => setEditing(false)}
      />
    </div>
  )
}

function RoundBtn({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string
  onClick: () => void
  disabled?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="grid size-12 place-items-center rounded-full bg-high text-ink-variant transition hover:brightness-95 active:scale-95 disabled:opacity-40"
    >
      {children}
    </button>
  )
}

/* ─────────────────────────── Cards do rail ─────────────────────────── */

const CARD = 'rounded-bubble bg-lowest p-5 stroke-inner shadow-soft'

function TodayCard({
  todayMin,
  goalMin,
  todayPct,
  apples,
  onEdit,
}: {
  todayMin: number
  goalMin: number
  todayPct: number
  apples: number
  onEdit: () => void
}) {
  return (
    <section className={CARD}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="label-caps text-[10px] text-ink-variant">Hoje</p>
          <p className="mt-1 font-display text-[26px] leading-none font-extrabold tabular-nums">
            {todayMin}
            <span className="text-[15px] font-bold text-ink-variant">/{goalMin} min</span>
          </p>
        </div>

        <span
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-primary-container px-2.5 py-1.5 font-label text-[13px] font-bold tabular-nums text-on-primary-container"
          title={`${apples} maçãs acumuladas`}
        >
          <Apple aria-hidden="true" className="size-4" strokeWidth={2.2} />
          <span className="sr-only">{apples} maçãs acumuladas</span>
          <span aria-hidden="true">{apples}</span>
        </span>
      </div>

      <div className="mt-3">
        <ProgressBar pct={todayPct} label="Progresso da meta de hoje" />
      </div>

      <button
        type="button"
        onClick={onEdit}
        className="mt-3.5 flex min-h-10 items-center gap-2 rounded-full px-2 font-label text-[12.5px] font-bold text-ink-variant transition hover:text-ink"
      >
        <Settings2 aria-hidden="true" className="size-4" strokeWidth={2.2} />
        Ajustar meta
      </button>
    </section>
  )
}

function SoundCard({
  sound,
  setSound,
  vol,
  setVol,
}: {
  sound: SoundId | null
  setSound: (s: SoundId | null) => void
  vol: number
  setVol: (v: number) => void
}) {
  return (
    <section className={CARD}>
      <p className="label-caps text-[10px] text-ink-variant">Sons de foco</p>

      <ul className="mt-3 flex flex-col gap-1.5">
        {SOUNDS.map((s) => {
          const Icon = SOUND_ICONS[s.id]
          const active = sound === s.id
          return (
            <li key={s.id}>
              <button
                type="button"
                aria-pressed={active}
                onClick={() => {
                  const next = active ? null : s.id
                  setSound(next)
                  playSound(next) // exige gesto do usuário: por isso só aqui
                }}
                className={`flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 font-label text-[13.5px] font-bold transition ${
                  active
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-ink hover:bg-low'
                }`}
              >
                <Icon aria-hidden="true" className="size-[17px] shrink-0" strokeWidth={2} />
                {s.label}
                {active && <span aria-hidden="true" className="anim-pulse-ring ml-auto size-2 rounded-full bg-current" />}
              </button>
            </li>
          )
        })}
      </ul>

      <label className="mt-3 flex items-center gap-2.5 px-1">
        <Volume2 aria-hidden="true" className="size-4 shrink-0 text-ink-variant" strokeWidth={2} />
        <span className="sr-only">Volume dos sons de foco</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(vol * 100)}
          onChange={(e) => {
            const v = Number(e.target.value) / 100
            setVol(v)
            setVolume(v)
          }}
          className="h-1.5 w-full accent-primary"
        />
      </label>
    </section>
  )
}

/* ─────────────────────────── Calendário de constância ─────────────────────────── */

const WEEKS = 16
const LEVELS = ['bg-high', 'bg-primary-container', 'bg-primary-dim', 'bg-primary', 'bg-primary-deep']
const FMT = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: 'short' })

function HeatmapCard({ log, goalMin }: { log: Record<string, number>; goalMin: number }) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const days = heatmapDays(WEEKS)

  const level = (m: number) =>
    m <= 0 ? 0 : m >= goalMin ? 4 : m >= goalMin * 0.5 ? 3 : m >= goalMin * 0.25 ? 2 : 1

  const studied = days.filter((d) => (log[dayKey(d)] ?? 0) > 0).length

  return (
    <section className={CARD}>
      <p className="label-caps text-[10px] text-ink-variant">Constância</p>
      <p className="mt-1 text-[12.5px] text-ink-variant">
        <strong className="font-label font-bold text-ink tabular-nums">{studied}</strong> dias
        estudados nas últimas {WEEKS} semanas
      </p>

      {/* role="img" com um rótulo-resumo: anunciar 112 células uma a uma seria
          ruído, não acessibilidade. O title cobre quem usa mouse. */}
      <ul
        role="img"
        aria-label={`Mapa de estudo: ${studied} dias estudados nas últimas ${WEEKS} semanas`}
        className="mt-3 grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-1"
      >
        {days.map((d) => {
          const m = log[dayKey(d)] ?? 0
          const future = d > today
          return (
            <li
              key={dayKey(d)}
              title={future ? undefined : `${FMT.format(d)}: ${m} min`}
              className={`size-[11px] rounded-[3px] ${future ? 'opacity-0' : LEVELS[level(m)]}`}
            />
          )
        })}
      </ul>

      <div aria-hidden="true" className="mt-2 flex items-center gap-1 text-[10.5px] text-ink-variant">
        Menos
        {LEVELS.map((c) => (
          <span key={c} className={`size-[9px] rounded-[2px] ${c}`} />
        ))}
        Mais
      </div>
    </section>
  )
}

/* ─────────────────────────── Onboarding / ajuste de meta ─────────────────────────── */

function GoalDialog({
  open,
  first,
  goalMin,
  sessions,
  onSave,
  onClose,
}: {
  open: boolean
  first: boolean
  goalMin: number
  sessions: number
  onSave: (goalMin: number, sessions: number) => void
  onClose: () => void
}) {
  const ref = useRef<HTMLDialogElement>(null)
  const [g, setG] = useState(goalMin)
  const [s, setS] = useState(sessions)
  const submitting = useRef(false)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) {
      // Reabrir para editar: os campos partem do que está salvo, não do que
      // ficou digitado numa edição anterior que o usuário cancelou.
      setG(goalMin)
      setS(sessions)
      dialog.showModal()
    }
    if (!open && dialog.open) dialog.close()
  }, [open, goalMin, sessions])

  const handleClose = () => {
    // `method="dialog"` fecha o dialog ao enviar — isso não é um cancelamento.
    if (submitting.current) {
      submitting.current = false
      return
    }
    // Enquanto o onboarding não terminou o app precisa da meta, então o Esc
    // não pode deixar a tela sem configuração.
    if (first) ref.current?.showModal()
    else onClose()
  }

  const per = Math.max(1, Math.round(g / s))

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === ref.current && !first) onClose()
      }}
      aria-labelledby="goal-title"
      className="anim-sheet mt-auto mr-auto mb-0 ml-auto w-full max-w-none rounded-t-bubble bg-surface p-0 text-ink lg:m-auto lg:h-fit lg:w-[min(460px,92vw)] lg:rounded-bubble"
    >
      <form
        method="dialog"
        onSubmit={() => {
          submitting.current = true
          onSave(g, s)
        }}
        className="flex flex-col p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))]"
      >
        <h3 id="goal-title" className="font-display text-[22px] leading-tight font-extrabold text-balance">
          {first ? 'Qual é a sua meta de estudo?' : 'Ajustar meta'}
        </h3>
        <p className="mt-1.5 text-[13.5px] text-ink-variant">
          Cada sessão concluída rende uma maçã. Bater a meta do dia rende mais duas.
        </p>

        <label className="mt-5 block">
          <span className="label-caps text-[10px] text-ink-variant">Minutos por dia</span>
          <input
            type="number"
            required
            min={5}
            max={720}
            step={5}
            value={g}
            onChange={(e) => setG(Number(e.target.value))}
            className="mt-1.5 min-h-12 w-full rounded-xl bg-lowest px-3.5 font-display text-[20px] font-extrabold tabular-nums stroke-inner"
          />
        </label>

        <label className="mt-4 block">
          <span className="label-caps text-[10px] text-ink-variant">Dividir em quantas sessões</span>
          <input
            type="number"
            required
            min={1}
            max={12}
            step={1}
            value={s}
            onChange={(e) => setS(Number(e.target.value))}
            className="mt-1.5 min-h-12 w-full rounded-xl bg-lowest px-3.5 font-display text-[20px] font-extrabold tabular-nums stroke-inner"
          />
        </label>

        <p className="mt-4 rounded-xl bg-primary-container px-3.5 py-3 text-center font-label text-[13.5px] font-bold text-on-primary-container">
          {s} {s === 1 ? 'sessão' : 'sessões'} de {per} min
        </p>

        <div className="mt-5 flex gap-2.5">
          {!first && (
            <button
              type="button"
              onClick={onClose}
              className="min-h-12 flex-1 rounded-full bg-high px-4 font-label text-[15px] font-bold text-ink-variant"
            >
              Cancelar
            </button>
          )}
          <button
            type="submit"
            className="btn-squish flex min-h-12 flex-1 items-center justify-center rounded-full bg-primary px-4 font-label text-[15px] font-bold text-white"
          >
            {first ? 'Começar' : 'Salvar'}
          </button>
        </div>
      </form>
    </dialog>
  )
}
