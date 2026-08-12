/**
 * Aritmética da tela de Foco. Sem React e sem DOM de propósito: é a parte com
 * casos de borda de verdade (virada de mês, horário de verão, fuso) e é a única
 * que dá para conferir sozinha — ver focusMath.test.ts.
 */

/**
 * Chave de dia no fuso local. `toISOString()` usaria UTC e, à noite no Brasil,
 * jogaria o estudo para o dia seguinte.
 */
export const dayKey = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

/**
 * Maçãs de um dia: 1 por sessão concluída + 2 de bônus ao bater a meta.
 * Derivado do log, nunca armazenado — como o XP em progress.ts.
 */
export const applesFor = (min: number, sessionMin: number, goalMin: number) =>
  Math.floor(min / sessionMin) + (min >= goalMin ? 2 : 0)

/**
 * Os dias do heatmap, do domingo da primeira coluna até o sábado da última.
 * `setDate` com valores fora do mês é o jeito nativo de somar dias: ele
 * normaliza virada de mês, ano bissexto e horário de verão sozinho.
 */
export function heatmapDays(weeks: number, from = new Date()): Date[] {
  const today = new Date(from)
  today.setHours(0, 0, 0, 0)

  const start = new Date(today)
  start.setDate(start.getDate() - today.getDay() - (weeks - 1) * 7)

  return Array.from({ length: weeks * 7 }, (_, i) => {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    return d
  })
}
