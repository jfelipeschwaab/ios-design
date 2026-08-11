export type ResourceType = 'article' | 'video' | 'documentation' | 'course'

export type Resource = {
  title: string
  url: string
  type: ResourceType
  /** Fonte exibida no chip do link, ex.: "Nielsen Norman Group". */
  source: string
}

/** Peso de dificuldade — espelha os pesos 1, 2 e 3 da prova (Edital 01/2026, Cap. V). */
export type Difficulty = 1 | 2 | 3

export type Substep = {
  id: string
  title: string
  description: string
  difficulty: Difficulty
  resources: Resource[]
}

export type Step = {
  id: string
  title: string
  description: string
  substeps: Substep[]
}

export type World = {
  id: string
  title: string
  /** Rótulo curto usado no mapa da jornada, onde não cabe o título inteiro. */
  shortTitle: string
  description: string
  /** Chave do ícone lucide em `worldIcon()` (src/components/icons.tsx). */
  icon: string
  /** Chave da paleta em `worldPalettes` (src/palettes.ts). */
  color: string
  /** Citação de abertura exibida no header do mundo. */
  tagline: string
  steps: Step[]
  /** Só o Desafio Final usa: exige 100% dos mundos anteriores, sem override. */
  requiresAll?: boolean
}

export type QuizQuestion = {
  id: string
  /** Id do mundo de origem — usado para mandar o usuário revisar o tema que errou. */
  worldId: string
  weight: Difficulty
  prompt: string
  options: string[]
  /** Índice em `options`. */
  answer: number
  explanation: string
}
