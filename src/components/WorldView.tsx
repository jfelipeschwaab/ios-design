import { paletteFor } from '../palettes'
import type { Step, World } from '../types'
import type { Completed } from '../progress'
import { stepProgress, worldProgress } from '../progress'
import StepNode from './StepNode'
import ProgressBar from './ProgressBar'
import { ArrowLeft, ArrowRight, Check, worldIcon } from './icons'

type Props = {
  world: World
  completed: Completed
  nextSubstepId: string | null
  onOpenStep: (step: Step) => void
  onBack: () => void
  onStartQuiz: () => void
}

export default function WorldView({
  world,
  completed,
  nextSubstepId,
  onOpenStep,
  onBack,
  onStartQuiz,
}: Props) {
  const palette = paletteFor(world.color)
  const ratio = worldProgress(world, completed)
  // O Mundo de Nielsen é o único com header em tom profundo — é a identidade dele.
  const deep = world.id === 'w5'
  const isFinal = Boolean(world.requiresAll)
  const Icon = worldIcon(world.icon)

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-4 lg:px-8">
      <header
        className="rounded-bubble px-5 py-6 shadow-soft"
        style={{
          background: deep
            ? `linear-gradient(160deg, ${palette.accent} 0%, #4a3878 100%)`
            : `linear-gradient(160deg, ${palette.soft} 0%, ${palette.container} 100%)`,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          className={`-ml-1 flex min-h-11 items-center gap-1.5 rounded-full px-2 font-label text-[14px] font-bold transition active:scale-95 ${
            deep ? 'text-white/80 hover:text-white' : 'hover:opacity-70'
          }`}
          style={deep ? undefined : { color: palette.ink }}
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2.4} /> Mapa
        </button>

        <div className="mt-3 flex items-start gap-4">
          <span
            aria-hidden="true"
            className="grid size-16 shrink-0 place-items-center rounded-bubble shadow-soft"
            style={{ background: deep ? 'rgba(255,255,255,0.15)' : 'var(--color-lowest)' }}
          >
            <Icon className="size-8" style={{ color: deep ? '#fff' : palette.accent }} strokeWidth={2} />
          </span>
          <div className="min-w-0 flex-1">
            <h2
              className="font-display text-[26px] leading-tight font-extrabold text-balance"
              style={{ color: deep ? '#fff' : palette.ink }}
            >
              {world.title}
            </h2>
            <p
              className="mt-1.5 text-[14px] leading-relaxed"
              style={{ color: deep ? 'rgba(255,255,255,0.82)' : palette.ink }}
            >
              {world.description}
            </p>
          </div>
        </div>

        <p
          className="mt-4 rounded-xl px-3.5 py-2.5 text-[14px] leading-relaxed italic"
          style={{
            background: deep ? 'rgba(255,255,255,0.12)' : 'var(--color-lowest)',
            color: deep ? 'rgba(255,255,255,0.94)' : palette.ink,
          }}
        >
          {world.tagline}
        </p>

        <div className="mt-4 flex items-center gap-3">
          <ProgressBar
            pct={ratio.pct}
            color={deep ? '#fff' : palette.accent}
            track={deep ? 'rgba(255,255,255,0.24)' : 'var(--color-lowest)'}
            label={`Progresso de ${world.title}`}
            size="lg"
          />
          <span
            className="shrink-0 font-label text-[14px] font-bold tabular-nums"
            style={{ color: deep ? '#fff' : palette.ink }}
          >
            {ratio.done}/{ratio.total}
          </span>
        </div>
      </header>

      <ol className="mt-7">
        {world.steps.map((step, i) => {
          const sr = stepProgress(step, completed)
          const isNext = step.substeps.some((s) => s.id === nextSubstepId)
          const last = i === world.steps.length - 1

          return (
            <li key={step.id} className="relative flex gap-4">
              {/* Trilho vertical ligando os conteúdos centrais. */}
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute top-[64px] bottom-0 left-[28.5px] w-[5px] rounded-full"
                  style={{
                    background: sr.pct === 100 ? palette.accent : 'var(--color-high)',
                    opacity: sr.pct === 100 ? 0.35 : 1,
                  }}
                />
              )}

              <button
                type="button"
                onClick={() => onOpenStep(step)}
                aria-label={`${step.title}. ${sr.done} de ${sr.total} concluídos.`}
                className="relative z-10 shrink-0 rounded-full transition hover:scale-105 active:scale-95"
              >
                <StepNode ratio={sr} palette={palette} isNext={isNext} />
              </button>

              <button
                type="button"
                onClick={() => onOpenStep(step)}
                className="mb-6 flex-1 rounded-bubble bg-lowest p-4 text-left stroke-inner shadow-soft transition hover:shadow-lift active:scale-[0.995]"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-[16.5px] leading-tight font-bold text-balance">
                    {step.title}
                  </h3>
                  {isNext && (
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 font-label text-[11px] font-bold text-white"
                      style={{ background: palette.accent }}
                    >
                      Agora
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-variant">
                  {step.description}
                </p>
                <p
                  className="mt-2.5 flex items-center gap-1 font-label text-[12.5px] font-bold tabular-nums"
                  style={{ color: palette.ink }}
                >
                  {sr.pct === 100 ? (
                    <>
                      <Check aria-hidden="true" className="size-3.5" strokeWidth={3} /> Concluído
                    </>
                  ) : (
                    `${sr.done}/${sr.total} conteúdos`
                  )}
                </p>
              </button>
            </li>
          )
        })}
      </ol>

      {isFinal && (
        <div className="mt-1 pb-6">
          <button
            type="button"
            onClick={onStartQuiz}
            className="btn-squish flex min-h-14 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 font-label text-[16px] font-bold text-white"
          >
            Abrir simulado final
            <ArrowRight aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
          </button>
          <p className="mt-2.5 text-center text-[12px] text-ink-variant">
            Simulado não oficial, escrito para este roadmap.
          </p>
        </div>
      )}
    </div>
  )
}
