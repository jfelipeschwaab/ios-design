import { paletteFor } from '../palettes'
import type { World } from '../types'
import type { Completed } from '../progress'
import { findSubstep, globalProgress, nextUp, xpFor } from '../progress'
import ProgressBar from './ProgressBar'
import { Apple, ArrowRight, Check, worldIcon } from './icons'

/** Data da prova técnica (2ª fase), conforme o Edital nº 01/2026. */
export const EXAM_DATE = new Date('2026-09-23T14:00:00-03:00')

export const daysUntilExam = () =>
  Math.ceil((EXAM_DATE.getTime() - Date.now()) / 86_400_000)

type Props = {
  worlds: World[]
  completed: Completed
  overrides: Completed
  lastCompletedId: string | null
  onContinue: () => void
}

/**
 * Painel lateral com o estado real da jornada. Onde o mockup mostra vidas, moedas,
 * presentes e missões diárias, aqui vão só os dados que existem: progresso, XP,
 * próximo conteúdo, último concluído e a data da prova.
 */
export default function JourneyRail({
  worlds,
  completed,
  overrides,
  lastCompletedId,
  onContinue,
}: Props) {
  const overall = globalProgress(worlds, completed)
  const next = nextUp(worlds, completed, overrides)
  const last = lastCompletedId ? findSubstep(worlds, lastCompletedId) : null
  const xp = xpFor(worlds, completed)
  const days = daysUntilExam()
  const NextIcon = next ? worldIcon(next.world.icon) : null

  return (
    <aside className="hidden w-80 shrink-0 xl:block">
      <div className="sticky top-24 flex flex-col gap-4 pb-10">
        <section className="rounded-bubble bg-lowest stroke-inner shadow-soft p-5">
          <h2 className="label-caps text-ink-variant">Sua jornada</h2>

          <p className="mt-3 font-display text-[32px] leading-none font-extrabold tabular-nums text-ink">
            {overall.pct}%
          </p>

          <div className="mt-3">
            <ProgressBar pct={overall.pct} label="Progresso geral da jornada" size="lg" />
          </div>

          <dl className="mt-4 grid grid-cols-2 gap-2.5">
            <Stat label="Conteúdos" value={`${overall.done}/${overall.total}`} />
            <Stat label="XP" value={String(xp)} />
            {days > 0 && <Stat label="Dias até a prova" value={String(days)} wide />}
          </dl>
        </section>

        {next && (
          <section
            className="rounded-bubble shadow-soft p-5"
            style={{ background: paletteFor(next.world.color).soft }}
          >
            <h2 className="label-caps" style={{ color: paletteFor(next.world.color).ink }}>
              Estude agora
            </h2>
            <div className="mt-2.5 flex items-start gap-2.5">
              {NextIcon && (
                <NextIcon
                  aria-hidden="true"
                  className="mt-0.5 size-6 shrink-0"
                  style={{ color: paletteFor(next.world.color).accent }}
                  strokeWidth={2}
                />
              )}
              <div className="min-w-0">
                <p className="font-display text-[17px] leading-tight font-bold text-balance text-ink">
                  {next.substep.title}
                </p>
                <p className="mt-1 text-[13px] text-ink-variant">
                  {next.world.shortTitle} · {next.step.title}
                </p>
              </div>
            </div>

            {/* O CTA usa sempre o primary do sistema: a identidade do mundo já é
                dada pelo fundo, pelo ícone e pelo rótulo. Accents escuros de mundo
                num botão dessa área viram um bloco pesado. */}
            <button
              type="button"
              onClick={onContinue}
              className="btn-squish mt-4 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-primary px-4 font-label text-[15px] font-bold text-white"
            >
              Continuar jornada
              <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
            </button>
          </section>
        )}

        {last && (
          <section className="rounded-bubble bg-lowest stroke-inner shadow-soft p-4">
            <h2 className="label-caps text-ink-variant">Último concluído</h2>
            <p className="mt-2 flex items-start gap-2 text-[14px] leading-snug font-medium text-ink">
              <span
                aria-hidden="true"
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-white"
                style={{ background: paletteFor(last.world.color).accent }}
              >
                <Check className="size-3" strokeWidth={3.4} />
              </span>
              <span className="min-w-0">{last.substep.title}</span>
            </p>
            <p className="mt-1 pl-7 text-[12px] text-ink-variant">{last.world.shortTitle}</p>
          </section>
        )}

        <section className="rounded-bubble bg-primary-container p-5 text-center">
          <h2 className="label-caps text-on-primary-container">Objetivo</h2>
          <Apple
            aria-hidden="true"
            className="anim-bob mx-auto mt-2 size-8 text-on-primary-container"
            strokeWidth={2}
          />
          <p className="mt-1.5 font-display text-[17px] leading-tight font-bold text-ink">
            Prova de Design iOS
          </p>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-on-primary-container">
            23 de setembro de 2026
            <br />
            30 questões · 60 pontos · 3 horas
            <br />
            Campus UCB Taguatinga
          </p>
        </section>
      </div>
    </aside>
  )
}

function Stat({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <div className={`rounded-lg bg-low px-3 py-2.5 ${wide ? 'col-span-2' : ''}`}>
      <dt className="label-caps text-[10px] text-ink-variant">{label}</dt>
      <dd className="mt-0.5 font-display text-[18px] leading-none font-bold tabular-nums text-ink">
        {value}
      </dd>
    </div>
  )
}
