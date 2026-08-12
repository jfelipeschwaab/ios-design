/**
 * Conferência da aritmética de Foco. Sem framework de teste no projeto — roda com:
 *   node --experimental-strip-types src/focusMath.test.ts
 */
import assert from 'node:assert/strict'
import { applesFor, dayKey, heatmapDays } from './focusMath.ts'

/* dayKey usa o fuso local, não UTC. */
assert.equal(dayKey(new Date(2026, 0, 5)), '2026-01-05')
assert.equal(dayKey(new Date(2026, 11, 31, 23, 59)), '2026-12-31', 'quase meia-noite ainda é hoje')

/* Maçãs: 1 por sessão + 2 de bônus ao bater a meta (60 min em 3 sessões de 20). */
assert.equal(applesFor(0, 20, 60), 0)
assert.equal(applesFor(19, 20, 60), 0, 'sessão incompleta não rende maçã')
assert.equal(applesFor(20, 20, 60), 1)
assert.equal(applesFor(59, 20, 60), 2, 'duas sessões, meta não batida')
assert.equal(applesFor(60, 20, 60), 5, '3 sessões + 2 de bônus')
assert.equal(applesFor(80, 20, 60), 6, 'passar da meta não paga o bônus de novo')

/* Heatmap: grade fechada, começando num domingo e terminando num sábado. */
const days = heatmapDays(16, new Date(2026, 7, 12)) // quarta-feira
assert.equal(days.length, 112)
assert.equal(days[0].getDay(), 0, 'primeira célula é domingo')
assert.equal(days.at(-1)!.getDay(), 6, 'última célula é sábado')
assert.ok(days.some((d) => dayKey(d) === '2026-08-12'), 'hoje está na grade')

/* Dias consecutivos sem buraco — o caso que a soma ingênua de 86.400.000 ms
   quebraria na virada de horário de verão. */
const unique = new Set(days.map((d) => dayKey(d)))
assert.equal(unique.size, 112, 'nenhum dia repetido ou pulado')
for (const d of days) assert.equal(d.getHours(), 0, 'todo dia zerado à meia-noite local')

/* Virada de mês e ano bissexto. */
const leap = heatmapDays(2, new Date(2028, 2, 1))
assert.ok(leap.some((d) => dayKey(d) === '2028-02-29'), '2028 é bissexto')

console.log('focusMath: ok')
