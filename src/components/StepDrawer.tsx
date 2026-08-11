import { useEffect, useRef } from 'react'
import type { Palette } from '../palettes'
import type { Step } from '../types'
import type { Completed } from '../progress'
import { stepProgress } from '../progress'
import SubstepItem from './SubstepItem'
import ProgressBar from './ProgressBar'
import { X } from './icons'

type Props = {
  step: Step | null
  worldTitle: string
  palette: Palette
  completed: Completed
  onToggle: (id: string, origin: { x: number; y: number }) => void
  onClose: () => void
}

/**
 * `<dialog>` nativo: backdrop, fechamento no Esc e retenção de foco vêm do próprio
 * elemento — não precisamos reimplementar nada disso.
 * Mobile: bottom sheet. Desktop (≥1024px): modal centrado.
 */
export default function StepDrawer({
  step,
  worldTitle,
  palette,
  completed,
  onToggle,
  onClose,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (step && !dialog.open) dialog.showModal()
    if (!step && dialog.open) dialog.close()
  }, [step])

  if (!step) return null

  const ratio = stepProgress(step, completed)

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        // Clique no backdrop: o alvo é o próprio dialog, não seu conteúdo.
        if (e.target === ref.current) onClose()
      }}
      aria-labelledby="drawer-title"
      /*
       * Um <dialog>:modal já vem com `position: fixed; inset: 0` do navegador, então
       * o posicionamento é feito só com margem automática:
       *   mobile  → mt-auto/mb-0 encosta no rodapé (bottom sheet)
       *   desktop → lg:m-auto centraliza nos dois eixos (modal)
       * Usar translate junto com o inset do UA desalinha o modal.
       */
      className="anim-sheet mt-auto mr-auto mb-0 ml-auto max-h-[86dvh] w-full max-w-none rounded-t-bubble bg-surface p-0 text-ink lg:m-auto lg:h-fit lg:max-h-[82dvh] lg:w-[min(680px,92vw)] lg:rounded-bubble"
    >
      <div className="flex max-h-[86dvh] flex-col lg:max-h-[82dvh]">
        <header
          className="sticky top-0 z-10 shrink-0 rounded-t-bubble px-5 pt-3 pb-4"
          style={{ background: palette.soft }}
        >
          {/* Alça visual do bottom sheet — some no desktop, onde não há gesto de arrastar. */}
          <div
            aria-hidden="true"
            className="mx-auto mb-3 h-1.5 w-11 rounded-full lg:hidden"
            style={{ background: palette.container }}
          />

          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="label-caps" style={{ color: palette.accent }}>
                {worldTitle}
              </p>
              <h3
                id="drawer-title"
                className="mt-1 font-display text-[22px] leading-tight font-extrabold text-balance"
              >
                {step.title}
              </h3>
              <p className="mt-1 text-[13.5px] text-ink-variant">{step.description}</p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Fechar"
              className="grid size-11 shrink-0 place-items-center rounded-full text-[17px] transition hover:brightness-95 active:scale-95"
              style={{ background: palette.container, color: palette.ink }}
            >
              <X aria-hidden="true" className="size-[18px]" strokeWidth={2.4} />
            </button>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <ProgressBar
              pct={ratio.pct}
              color={palette.accent}
              track="var(--color-lowest)"
              label={`Progresso de ${step.title}`}
            />
            <span
              className="shrink-0 font-label text-[13px] font-bold tabular-nums"
              style={{ color: palette.ink }}
            >
              {ratio.done}/{ratio.total}
            </span>
          </div>
        </header>

        {/* flex-col, não grid: itens de grid têm min-width:auto e não encolhem
            abaixo do próprio conteúdo, o que cortava os títulos longos. */}
        <ul className="flex flex-col gap-2.5 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {step.substeps.map((s) => (
            <SubstepItem
              key={s.id}
              substep={s}
              done={completed.has(s.id)}
              palette={palette}
              onToggle={onToggle}
            />
          ))}
        </ul>
      </div>
    </dialog>
  )
}
