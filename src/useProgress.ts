import { useCallback, useEffect, useRef, useState } from 'react'
import { dayKey } from './focusMath'

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
  /** Configuração e histórico da tela de Foco. */
  focus: FocusState
}

/** Meta de estudo diária + minutos focados por dia. Maçãs são derivadas daqui. */
export type FocusState = {
  goalMin: number
  /** Em quantos pomodoros a meta é dividida. */
  sessions: number
  onboarded: boolean
  /** 'AAAA-MM-DD' (fuso local) → minutos focados naquele dia. */
  log: Record<string, number>
}

const EMPTY_FOCUS: FocusState = { goalMin: 60, sessions: 3, onboarded: false, log: {} }

const EMPTY: ProgressState = {
  completed: [],
  overrides: [],
  history: [],
  quizBest: null,
  focus: EMPTY_FOCUS,
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(Math.round(n), min), max)

function parseFocus(raw: unknown): FocusState {
  if (!raw || typeof raw !== 'object') return EMPTY_FOCUS
  const o = raw as Partial<FocusState>

  const log: Record<string, number> = {}
  if (o.log && typeof o.log === 'object' && !Array.isArray(o.log)) {
    for (const [k, v] of Object.entries(o.log)) {
      if (/^\d{4}-\d{2}-\d{2}$/.test(k) && typeof v === 'number' && v > 0) log[k] = Math.round(v)
    }
  }

  return {
    goalMin: typeof o.goalMin === 'number' && o.goalMin > 0 ? clamp(o.goalMin, 5, 720) : 60,
    sessions: typeof o.sessions === 'number' && o.sessions > 0 ? clamp(o.sessions, 1, 12) : 3,
    onboarded: o.onboarded === true,
    log,
  }
}

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
      focus: parseFocus(parsed.focus),
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

  const setFocusGoal = useCallback((goalMin: number, sessions: number) => {
    setState((prev) => ({
      ...prev,
      focus: {
        ...prev.focus,
        goalMin: clamp(goalMin, 5, 720),
        sessions: clamp(sessions, 1, 12),
        onboarded: true,
      },
    }))
  }, [])

  /**
   * Soma minutos ao dia de hoje. Chamado ao fim (ou aborto) de uma sessão —
   * nunca a cada tick, senão o localStorage seria reescrito uma vez por segundo.
   */
  const logFocus = useCallback((minutes: number) => {
    const m = Math.floor(minutes)
    if (m < 1) return
    const k = dayKey()
    setState((prev) => ({
      ...prev,
      focus: { ...prev.focus, log: { ...prev.focus.log, [k]: (prev.focus.log[k] ?? 0) + m } },
    }))
  }, [])

  const reset = useCallback(() => setState(EMPTY), [])

  const lastCompletedId = state.history.at(-1) ?? null

  return {
    completed,
    overrides,
    lastCompletedId,
    quizBest: state.quizBest,
    focus: state.focus,
    toggleSubstep,
    unlockWorld,
    recordQuiz,
    setFocusGoal,
    logFocus,
    reset,
  }
}
