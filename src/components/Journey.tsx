import { useEffect, useRef } from 'react'
import { paletteFor } from '../palettes'
import type { Palette } from '../palettes'
import type { World } from '../types'
import type { Completed, WorldState } from '../progress'
import { worldProgress, worldState } from '../progress'
import { Check, Lock, worldIcon } from './icons'

/** Deslocamento horizontal de cada nó, em múltiplos de AMPLITUDE — dá a serpentina. */
const OFFSETS = [0, 1, 0, -1]
/**
 * Mantido pequeno de propósito: o nó é deslocado com translateX, então amplitude
 * grande demais empurra o rótulo para fora da viewport em telas de 360px.
 */
const AMPLITUDE = 40
const CONNECTOR_H = 66

const offsetOf = (i: number) => OFFSETS[i % OFFSETS.length]

const STATE_HINT: Record<WorldState, string> = {
  locked: 'Bloqueado',
  available: 'Começar',
  'in-progress': 'Em progresso',
  done: 'Concluído',
}

type Props = {
  worlds: World[]
  completed: Completed
  overrides: Completed
  nextWorldId: string | null
  onOpenWorld: (worldId: string) => void
  onUnlock: (worldId: string) => void
}

export default function Journey({
  worlds,
  completed,
  overrides,
  nextWorldId,
  onOpenWorld,
  onUnlock,
}: Props) {
  // O mapa é lido de baixo para cima: o Mundo 1 fica no pé e a prova no topo.
  const order = worlds.map((_, i) => i).reverse()
  const untouched = completed.size === 0

  // Sem isto o mapa abriria no topo, onde só há mundos bloqueados — o usuário
  // veria uma parede de cadeados em vez de onde ele está.
  const currentRef = useRef<HTMLLIElement>(null)
  useEffect(() => {
    const el = currentRef.current
    if (!el) return
    // window.scrollTo em vez de el.scrollIntoView(): o scrollIntoView também move o
    // "sequential focus navigation starting point" do Chrome, e aí o primeiro Tab
    // pularia direto para o mapa, deixando o link "Pular para o conteúdo" e a barra
    // superior inalcançáveis pelo teclado.
    const rect = el.getBoundingClientRect()
    const top = window.scrollY + rect.top - (window.innerHeight - rect.height) / 2
    window.scrollTo({
      top: Math.max(0, top),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    })
  }, [])

  return (
    <div className="relative w-full">
      {/* Fundo em degradê lilás: o "chão" do mapa, sob os nós. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 rounded-bubble"
        style={{
          background:
            'linear-gradient(180deg, var(--color-surface) 0%, var(--color-low) 34%, var(--color-high) 100%)',
        }}
      />

      <ol className="flex flex-col items-center px-4 py-6">
        {order.map((worldIndex, position) => {
          const world = worlds[worldIndex]
          const state = worldState(worlds, worldIndex, completed, overrides)
          const ratio = worldProgress(world, completed)
          const palette = paletteFor(world.color)
          const locked = state === 'locked'
          const isNext = world.id === nextWorldId
          const dir = offsetOf(worldIndex)

          return (
            <li
              key={world.id}
              ref={isNext ? currentRef : undefined}
              className="flex w-full flex-col items-center"
            >
              <WorldNode
                world={world}
                state={state}
                pct={ratio.pct}
                done={ratio.done}
                total={ratio.total}
                palette={palette}
                isNext={isNext}
                showStartHint={isNext && untouched}
                offset={dir * AMPLITUDE}
                onOpen={() => onOpenWorld(world.id)}
                onUnlock={() => onUnlock(world.id)}
                lockedReason={
                  world.requiresAll
                    ? 'Conclua todos os mundos anteriores'
                    : 'Conclua o mundo anterior'
                }
                canOverride={!world.requiresAll}
              />

              {/* Conector até o próximo nó (o de baixo, já que a lista está invertida). */}
              {position < order.length - 1 && (
                <Connector
                  from={dir}
                  to={offsetOf(order[position + 1])}
                  color={locked ? 'var(--color-outline-variant)' : palette.accent}
                  dashed={locked}
                />
              )}
            </li>
          )
        })}
      </ol>

      <p className="pb-8 text-center text-[12.5px] text-ink-variant">
        Comece por baixo. Cada mundo desbloqueia o próximo.
      </p>
    </div>
  )
}

function Connector({
  from,
  to,
  color,
  dashed,
}: {
  from: number
  to: number
  color: string
  dashed: boolean
}) {
  const w = AMPLITUDE * 2
  const x1 = AMPLITUDE + from * AMPLITUDE
  const x2 = AMPLITUDE + to * AMPLITUDE

  return (
    <svg
      aria-hidden="true"
      width={w}
      height={CONNECTOR_H}
      viewBox={`0 0 ${w} ${CONNECTOR_H}`}
      className="shrink-0"
    >
      <path
        d={`M ${x1} 0 C ${x1} ${CONNECTOR_H * 0.45}, ${x2} ${CONNECTOR_H * 0.55}, ${x2} ${CONNECTOR_H}`}
        fill="none"
        stroke={color}
        strokeWidth={dashed ? 5 : 6}
        strokeLinecap="round"
        strokeDasharray={dashed ? '1 12' : undefined}
        opacity={dashed ? 1 : 0.3}
      />
    </svg>
  )
}

function WorldNode({
  world,
  state,
  pct,
  done,
  total,
  palette,
  isNext,
  showStartHint,
  offset,
  onOpen,
  onUnlock,
  lockedReason,
  canOverride,
}: {
  world: World
  state: WorldState
  pct: number
  done: number
  total: number
  palette: Palette
  isNext: boolean
  showStartHint: boolean
  offset: number
  onOpen: () => void
  onUnlock: () => void
  lockedReason: string
  canOverride: boolean
}) {
  const locked = state === 'locked'
  const complete = state === 'done'
  const Icon = worldIcon(world.icon)
  const size = 88
  const stroke = 7
  const r = (size - stroke) / 2 - 1
  const c = 2 * Math.PI * r

  return (
    // w-fit, não w-full: um elemento de largura total deslocado com translateX
    // sempre estoura a viewport pela direita.
    <div
      className="flex w-fit max-w-full flex-col items-center"
      style={{ transform: `translateX(${offset}px)` }}
    >
      {showStartHint && (
        <span
          aria-hidden="true"
          className="anim-bob mb-2 rounded-full bg-lowest px-3 py-1.5 font-label text-[13px] font-bold shadow-float"
          style={{ color: palette.ink }}
        >
          Comece aqui!
        </span>
      )}

      <button
        type="button"
        onClick={locked ? undefined : onOpen}
        disabled={locked}
        aria-label={`${world.title}. ${STATE_HINT[state]}. ${done} de ${total} conteúdos concluídos.`}
        className={`relative grid place-items-center rounded-full transition-transform duration-150 ${
          locked ? 'cursor-not-allowed' : 'cursor-pointer hover:scale-105 active:scale-95'
        }`}
        style={{ width: size, height: size }}
      >
        {isNext && !complete && !locked && (
          <span
            aria-hidden="true"
            className="anim-pulse-ring absolute inset-0 rounded-full"
            style={{ background: palette.glow }}
          />
        )}

        {/* Base sólida com "lift": o nó parece um botão físico pousado no mapa. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 rounded-full"
          style={{
            background: locked ? 'var(--color-high)' : complete ? palette.accent : palette.container,
            boxShadow: locked
              ? 'inset 0 0 0 1px var(--color-highest)'
              : `0 4px 0 ${complete ? palette.deep : palette.accent}33, 0 8px 18px ${palette.glow}`,
          }}
        />

        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="absolute -rotate-90"
          aria-hidden="true"
        >
          {!locked && !complete && (
            <circle
              className="ring-fill"
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={palette.accent}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={c}
              strokeDashoffset={c * (1 - pct / 100)}
            />
          )}
        </svg>

        {locked ? (
          <Lock aria-hidden="true" className="relative size-8 text-ink-variant" strokeWidth={2} />
        ) : (
          <Icon
            aria-hidden="true"
            className={`relative size-9 ${complete ? 'anim-pop' : ''}`}
            style={{ color: complete ? '#fff' : palette.ink }}
            strokeWidth={2}
          />
        )}

        {complete && (
          <span
            aria-hidden="true"
            className="absolute -right-1 -bottom-1 grid size-7 place-items-center rounded-full text-white shadow-float"
            style={{ background: palette.deep, outline: '3px solid var(--color-surface)' }}
          >
            <Check className="size-4" strokeWidth={3.2} />
          </span>
        )}
      </button>

      <div className="mt-2.5 w-[13rem] max-w-full text-center">
        <span
          className="inline-block rounded-full px-3 py-1 font-label text-[13px] font-bold"
          style={{
            background: locked ? 'var(--color-high)' : palette.container,
            color: locked ? 'var(--color-ink-variant)' : palette.ink,
          }}
        >
          {world.shortTitle}
        </span>

        <p className="mt-1.5 text-[12px] text-ink-variant tabular-nums">
          {locked ? lockedReason : complete ? 'Concluído' : `${done}/${total} · ${pct}%`}
        </p>

        {locked && canOverride && (
          <button
            type="button"
            onClick={onUnlock}
            className="mt-2 min-h-10 rounded-full bg-lowest px-3 font-label text-[12px] font-bold text-ink-variant stroke-inner transition hover:text-ink active:scale-95"
          >
            Desbloquear mesmo assim
          </button>
        )}
      </div>
    </div>
  )
}
