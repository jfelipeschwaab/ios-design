/**
 * Sons ambiente sintetizados na Web Audio API — sem arquivos e sem dependências.
 * Tudo nasce de um buffer de ruído em loop; o que diferencia cada som é o filtro
 * e a modulação por cima dele.
 *
 * O AudioContext só é criado no primeiro clique: a política de autoplay dos
 * navegadores bloqueia (e deixa em `suspended`) qualquer contexto criado sem
 * gesto do usuário.
 */

export type SoundId = 'rain' | 'waves' | 'cafe'

export const SOUNDS: { id: SoundId; label: string }[] = [
  { id: 'rain', label: 'Chuva' },
  { id: 'waves', label: 'Ondas' },
  { id: 'cafe', label: 'Café' },
]

let ctx: AudioContext | null = null
let master: GainNode | null = null
let noise: AudioBuffer | null = null
/** Nós do som tocando agora, para poderem ser desligados. */
let current: { id: SoundId; src: AudioBufferSourceNode; lfo?: OscillatorNode } | null = null
let volume = 0.5

/** Ruído marrom: passo aleatório integrado. Mais grave e menos "chiado" que o branco. */
function brownNoise(context: AudioContext): AudioBuffer {
  const buffer = context.createBuffer(1, context.sampleRate * 4, context.sampleRate)
  const data = buffer.getChannelData(0)
  let last = 0
  for (let i = 0; i < data.length; i++) {
    last = (last + (Math.random() * 2 - 1) * 0.02) / 1.02
    data[i] = last * 3.5
  }
  return buffer
}

function ensure(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext()
    master = ctx.createGain()
    master.gain.value = volume
    master.connect(ctx.destination)
    noise = brownNoise(ctx)
  }
  // Navegadores suspendem o contexto quando a aba perde o foco.
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function stopCurrent() {
  if (!current || !ctx) return
  const { src, lfo } = current
  try {
    // Pequeno atraso em vez de corte no mesmo instante: um stop() seco estala.
    src.stop(ctx.currentTime + 0.12)
    lfo?.stop(ctx.currentTime + 0.12)
  } catch {
    // Já parado — nada a fazer.
  }
  current = null
}

/** Liga o som pedido, ou silencia tudo com `null`. Idempotente. */
export function playSound(id: SoundId | null) {
  if (current?.id === id) return
  stopCurrent()
  if (id === null) return

  const context = ensure()
  if (!noise || !master) return

  const src = context.createBufferSource()
  src.buffer = noise
  src.loop = true

  const filter = context.createBiquadFilter()
  const gain = context.createGain()
  let lfo: OscillatorNode | undefined

  if (id === 'rain') {
    // Chuva: ruído aberto e agudo, com o topo cortado.
    filter.type = 'lowpass'
    filter.frequency.value = 1400
    filter.Q.value = 0.6
    gain.gain.value = 0.9
  } else if (id === 'waves') {
    // Ondas: mesmo ruído, mas com o volume respirando devagar (~9s por ciclo).
    filter.type = 'lowpass'
    filter.frequency.value = 600
    gain.gain.value = 0.55
    lfo = context.createOscillator()
    lfo.frequency.value = 0.11
    const depth = context.createGain()
    depth.gain.value = 0.4
    lfo.connect(depth).connect(gain.gain)
    lfo.start()
  } else {
    // Café: banda estreita nos médios, lembrando o burburinho abafado do salão.
    filter.type = 'bandpass'
    filter.frequency.value = 900
    filter.Q.value = 1.6
    gain.gain.value = 1.6
  }

  src.connect(filter).connect(gain).connect(master)
  src.start()
  current = { id, src, lfo }
}

export function setVolume(v: number) {
  volume = Math.min(Math.max(v, 0), 1)
  if (master && ctx) master.gain.setTargetAtTime(volume, ctx.currentTime, 0.02)
}
