import confetti from 'canvas-confetti'
import type { CreateTypes } from 'canvas-confetti'

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const COLORS = ['#0a7ea4', '#b8860b', '#c2185b', '#5b3fa8', '#0b7a55']

let canvas: HTMLCanvasElement | null = null
let fire: CreateTypes | null = null
let hideTimer: number | undefined

const supportsPopover = () =>
  typeof HTMLElement !== 'undefined' && typeof HTMLElement.prototype.showPopover === 'function'

/**
 * O drawer é um `<dialog>` aberto com showModal(), então ele vive no *top layer* —
 * uma camada acima de todo o documento, que nenhum z-index alcança. Para o confete
 * aparecer na frente dele, o canvas precisa entrar no top layer também; é para isso
 * que serve o `popover`. Sem suporte a popover, cai para um z-index alto (o confete
 * ainda funciona, só fica atrás do drawer quando ele está aberto).
 */
function instance(): CreateTypes {
  if (fire && canvas) return fire

  canvas = document.createElement('canvas')
  canvas.setAttribute('aria-hidden', 'true')
  canvas.style.cssText = [
    'position:fixed',
    'inset:0',
    'width:100%',
    'height:100%',
    'margin:0',
    'padding:0',
    'border:0',
    'background:transparent',
    'pointer-events:none',
    'overflow:hidden',
    'z-index:2147483647',
  ].join(';')

  if (supportsPopover()) canvas.setAttribute('popover', 'manual')
  document.body.appendChild(canvas)

  fire = confetti.create(canvas, { resize: true })
  return fire
}

/**
 * O top layer empilha por ordem de abertura: o último a entrar fica por cima. Como o
 * drawer pode ter sido aberto depois do último confete, reabrimos o popover a cada
 * disparo para garantir que o canvas volte ao topo da pilha.
 */
function raise() {
  if (!canvas || !supportsPopover()) return
  try {
    if (canvas.matches(':popover-open')) canvas.hidePopover()
    canvas.showPopover()
  } catch {
    // Popover pode falhar se o elemento saiu do DOM; o confete ainda desenha.
  }
}

function scheduleHide(ms: number) {
  if (!canvas || !supportsPopover()) return
  window.clearTimeout(hideTimer)
  hideTimer = window.setTimeout(() => {
    try {
      if (canvas?.matches(':popover-open')) canvas.hidePopover()
    } catch {
      /* já removido */
    }
  }, ms)
}

/** Confete curto e discreto, disparado a partir do elemento concluído. */
export function celebrate(origin?: { x: number; y: number }) {
  if (prefersReducedMotion()) return

  const run = instance()
  raise()
  run({
    particleCount: 60,
    spread: 62,
    startVelocity: 32,
    gravity: 1.1,
    ticks: 90,
    scalar: 0.85,
    disableForReducedMotion: true,
    origin: origin ?? { x: 0.5, y: 0.62 },
    colors: COLORS,
  })
  scheduleHide(2200)
}

/** Comemoração maior — reservada para conclusão de um mundo inteiro. */
export function celebrateBig() {
  if (prefersReducedMotion()) return

  const run = instance()
  raise()
  run({
    particleCount: 130,
    spread: 100,
    startVelocity: 42,
    ticks: 140,
    scalar: 1,
    disableForReducedMotion: true,
    origin: { x: 0.5, y: 0.5 },
    colors: [...COLORS, '#1d2b53'],
  })
  scheduleHide(3200)
}
