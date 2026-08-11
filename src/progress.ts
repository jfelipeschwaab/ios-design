import type { Step, Substep, World } from './types'

/** XP por substep, indexado pelo peso de dificuldade (1, 2, 3). */
export const XP_BY_DIFFICULTY = { 1: 10, 2: 20, 3: 30 } as const

export type Completed = ReadonlySet<string>

export type Ratio = { done: number; total: number; pct: number }

const ratio = (done: number, total: number): Ratio => ({
  done,
  total,
  pct: total === 0 ? 0 : Math.round((done / total) * 100),
})

export const substepsOf = (world: World): Substep[] => world.steps.flatMap((s) => s.substeps)

export const stepProgress = (step: Step, completed: Completed): Ratio =>
  ratio(step.substeps.filter((s) => completed.has(s.id)).length, step.substeps.length)

export const worldProgress = (world: World, completed: Completed): Ratio => {
  const all = substepsOf(world)
  return ratio(all.filter((s) => completed.has(s.id)).length, all.length)
}

export const globalProgress = (worlds: World[], completed: Completed): Ratio => {
  const all = worlds.flatMap(substepsOf)
  return ratio(all.filter((s) => completed.has(s.id)).length, all.length)
}

export const xpFor = (worlds: World[], completed: Completed): number =>
  worlds
    .flatMap(substepsOf)
    .filter((s) => completed.has(s.id))
    .reduce((sum, s) => sum + XP_BY_DIFFICULTY[s.difficulty], 0)

export type WorldState = 'locked' | 'available' | 'in-progress' | 'done'

/**
 * Mundos abrem em sequência: o anterior precisa estar 100%.
 * `overrides` guarda os mundos que o usuário destravou manualmente — a regra
 * é motivacional, não uma cerca. O Desafio Final (`requiresAll`) é a exceção:
 * exige todos os mundos anteriores completos e ignora override.
 */
export const worldState = (
  worlds: World[],
  index: number,
  completed: Completed,
  overrides: Completed,
): WorldState => {
  const world = worlds[index]
  const { pct, total } = worldProgress(world, completed)
  if (total > 0 && pct === 100) return 'done'

  const previous = worlds.slice(0, index)
  const previousAllDone = previous.every((w) => worldProgress(w, completed).pct === 100)

  if (world.requiresAll) {
    if (!previousAllDone) return 'locked'
  } else if (!previousAllDone && !overrides.has(world.id)) {
    return 'locked'
  }

  return pct > 0 ? 'in-progress' : 'available'
}

/** Primeiro substep não concluído em um mundo acessível — o "estude isso agora". */
export const nextUp = (
  worlds: World[],
  completed: Completed,
  overrides: Completed,
): { world: World; step: Step; substep: Substep } | null => {
  for (let i = 0; i < worlds.length; i++) {
    if (worldState(worlds, i, completed, overrides) === 'locked') continue
    for (const step of worlds[i].steps) {
      const substep = step.substeps.find((s) => !completed.has(s.id))
      if (substep) return { world: worlds[i], step, substep }
    }
  }
  return null
}

export const findSubstep = (
  worlds: World[],
  id: string,
): { world: World; step: Step; substep: Substep } | null => {
  for (const world of worlds) {
    for (const step of world.steps) {
      const substep = step.substeps.find((s) => s.id === id)
      if (substep) return { world, step, substep }
    }
  }
  return null
}
