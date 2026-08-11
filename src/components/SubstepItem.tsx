import type { Palette } from '../palettes'
import type { Substep } from '../types'
import { XP_BY_DIFFICULTY } from '../progress'
import ResourceLink from './ResourceLink'
import { Check } from './icons'

const DIFFICULTY_LABEL = { 1: 'Peso 1', 2: 'Peso 2', 3: 'Peso 3' } as const

type Props = {
  substep: Substep
  done: boolean
  palette: Palette
  onToggle: (id: string, origin: { x: number; y: number }) => void
}

export default function SubstepItem({ substep, done, palette, onToggle }: Props) {
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    onToggle(substep.id, {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    })
  }

  return (
    <li
      className="rounded-bubble p-4 transition-colors"
      style={{
        background: done ? palette.soft : 'var(--color-lowest)',
        boxShadow: done
          ? `inset 0 0 0 2px ${palette.container}`
          : 'inset 0 0 0 1px var(--color-high)',
      }}
    >
      <div className="flex gap-3">
        {/* O checkbox nativo carrega a semântica; o ✓ visível é decorativo. */}
        <label className="relative flex min-h-11 min-w-11 shrink-0 cursor-pointer items-start justify-center pt-0.5">
          <input
            type="checkbox"
            checked={done}
            onChange={handle}
            className="peer size-7 cursor-pointer appearance-none rounded-lg transition"
            style={{
              background: done ? palette.accent : 'var(--color-lowest)',
              boxShadow: done
                ? `0 3px 0 ${palette.deep}`
                : `inset 0 0 0 2px var(--color-highest)`,
            }}
          />
          <span className="sr-only">Marcar “{substep.title}” como concluído</span>
          {done && (
            <span
              aria-hidden="true"
              className="anim-pop pointer-events-none absolute top-0.5 grid size-7 place-items-center text-white"
            >
              <Check className="size-[18px]" strokeWidth={3.2} />
            </span>
          )}
        </label>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5">
            <h4
              className={`font-display text-[15.5px] leading-snug font-bold ${
                done ? 'text-ink-variant line-through decoration-1' : 'text-ink'
              }`}
            >
              {substep.title}
            </h4>
            <span
              className="rounded-full px-2 py-0.5 font-label text-[11px] font-bold"
              style={{ background: palette.container, color: palette.ink }}
            >
              {DIFFICULTY_LABEL[substep.difficulty]} · {XP_BY_DIFFICULTY[substep.difficulty]} XP
            </span>
          </div>

          <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-variant">
            {substep.description}
          </p>

          {substep.resources.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {substep.resources.map((r) => (
                <ResourceLink key={r.url + r.title} resource={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </li>
  )
}
