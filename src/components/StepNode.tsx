import type { Palette } from '../palettes'
import type { Ratio } from '../progress'
import { Check, Play } from './icons'

type Props = {
  ratio: Ratio
  palette: Palette
  /** Destaca o nó como "estude isso agora". */
  isNext?: boolean
  size?: number
}

/**
 * Círculo de progresso de um conteúdo central.
 * 0% → vazio · parcial → anel preenchido proporcionalmente · 100% → cheio com ✓.
 */
export default function StepNode({ ratio, palette, isNext = false, size = 62 }: Props) {
  const { pct, done, total } = ratio
  const complete = pct === 100
  const stroke = 6
  const r = (size - stroke) / 2 - 1
  const circumference = 2 * Math.PI * r
  const offset = circumference * (1 - pct / 100)

  return (
    <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
      {isNext && !complete && (
        <span
          aria-hidden="true"
          className="anim-pulse-ring absolute inset-0 rounded-full"
          style={{ background: palette.glow }}
        />
      )}

      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full"
        style={{
          background: complete ? palette.accent : palette.container,
          boxShadow: `0 3px 0 ${complete ? palette.deep : palette.accent}2e`,
        }}
      />

      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="absolute -rotate-90"
        aria-hidden="true"
      >
        {!complete && (
          <circle
            className="ring-fill"
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={palette.accent}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
          />
        )}
      </svg>

      {complete ? (
        <Check
          aria-hidden="true"
          className="anim-pop absolute size-7 text-white"
          strokeWidth={3}
        />
      ) : pct === 0 ? (
        <Play
          aria-hidden="true"
          className="absolute size-5"
          style={{ color: palette.ink }}
          fill="currentColor"
          strokeWidth={0}
        />
      ) : (
        <span
          className="absolute font-label font-bold tabular-nums"
          style={{ color: palette.ink, fontSize: size * 0.25 }}
        >
          {done}/{total}
        </span>
      )}
    </span>
  )
}
