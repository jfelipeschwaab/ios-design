type Props = {
  pct: number
  color?: string
  /** Descrição para leitores de tela, ex.: "Progresso do Mundo de Nielsen". */
  label: string
  size?: 'sm' | 'md' | 'lg'
  /** Cor do trilho — precisa ser clara em superfícies escuras. */
  track?: string
}

const HEIGHT = { sm: 'h-2', md: 'h-3', lg: 'h-4' } as const

/** Barra grossa e arredondada, conforme "Progress Bars" do DESIGN.md. */
export default function ProgressBar({
  pct,
  color = 'var(--color-primary)',
  label,
  size = 'md',
  track = 'var(--color-high)',
}: Props) {
  return (
    <div
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`${label}: ${pct}%`}
      className={`w-full overflow-hidden rounded-full ${HEIGHT[size]}`}
      style={{ background: track }}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700 ease-out"
        style={{
          width: `${pct}%`,
          background: color,
          // Brilho interno sutil no topo — o "shimmer" cristalino do DESIGN.md.
          boxShadow: pct > 0 ? 'inset 0 1px 0 rgba(255,255,255,0.42)' : undefined,
        }}
      />
    </div>
  )
}
