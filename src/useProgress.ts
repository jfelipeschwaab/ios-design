import { useCallback, useEffect, useRef, useState } from 'react'

const KEY = 'academy-design-roadmap/v1'

/**
 * Estado de conclusão — deliberadamente separado do conteúdo (src/data/roadmap.ts).
 * Guarda apenas ids; nada aqui sabe o que um substep significa.
 */
export type ProgressState = {
  completed: string[]
  /** Ids de mundos destravados manualmente pelo usuário. */
  overrides: string[]
  /** Ordem de conclusão — o último item é o "último conteúdo concluído" da Home. */
  history: string[]
  /** Melhor pontuação no simulado, em pontos ponderados. */
  quizBest: number | null
}

const EMPTY: ProgressState = { completed: [], overrides: [], history: [], quizBest: null }

function load(): ProgressState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<ProgressState>
    return {
      completed: Array.isArray(parsed.completed) ? parsed.completed : [],
      overrides: Array.isArray(parsed.overrides) ? parsed.overrides : [],
      history: Array.isArray(parsed.history) ? parsed.history : [],
      quizBest: typeof parsed.quizBest === 'number' ? parsed.quizBest : null,
    }
  } catch {
    // localStorage bloqueado (modo privado) ou JSON corrompido: começa do zero.
    return EMPTY
  }
}

export function useProgress() {
  const [state, setState] = useState<ProgressState>(load)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    try {
      localStorage.setItem(KEY, JSON.stringify(state))
    } catch {
      // Sem persistência disponível; a sessão continua funcionando em memória.
    }
  }, [state])

  const completed = new Set(state.completed)
  const overrides = new Set(state.overrides)

  /**
   * Retorna true se o substep passou a estar concluído (para disparar o confete).
   * O valor vem do estado do render atual, e não de uma variável escrita dentro do
   * updater — updaters do React podem não rodar de forma síncrona nem uma única vez.
   */
  const toggleSubstep = useCallback(
    (id: string): boolean => {
      const wasDone = state.completed.includes(id)
      setState((prev) => {
        const has = prev.completed.includes(id)
        return {
          ...prev,
          completed: has ? prev.completed.filter((x) => x !== id) : [...prev.completed, id],
          history: has ? prev.history.filter((x) => x !== id) : [...prev.history, id],
        }
      })
      return !wasDone
    },
    [state.completed],
  )

  const unlockWorld = useCallback((worldId: string) => {
    setState((prev) =>
      prev.overrides.includes(worldId)
        ? prev
        : { ...prev, overrides: [...prev.overrides, worldId] },
    )
  }, [])

  const recordQuiz = useCallback((score: number) => {
    setState((prev) => ({ ...prev, quizBest: Math.max(prev.quizBest ?? 0, score) }))
  }, [])

  const reset = useCallback(() => setState(EMPTY), [])

  const lastCompletedId = state.history.at(-1) ?? null

  return {
    completed,
    overrides,
    lastCompletedId,
    quizBest: state.quizBest,
    toggleSubstep,
    unlockWorld,
    recordQuiz,
    reset,
  }
}
