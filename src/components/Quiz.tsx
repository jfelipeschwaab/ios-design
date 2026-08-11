import { useState } from 'react'
import { quiz, quizTotalPoints } from '../data/quiz'
import type { World } from '../types'
import { celebrateBig } from './Confetti'
import { ArrowLeft, ArrowRight, Check, X } from './icons'

type Props = {
  worlds: World[]
  best: number | null
  onFinish: (score: number) => void
  onOpenWorld: (worldId: string) => void
  onBack: () => void
}

export default function Quiz({ worlds, best, onFinish, onOpenWorld, onBack }: Props) {
  const [answers, setAnswers] = useState<Record<string, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const answeredCount = Object.keys(answers).length
  const score = quiz.reduce((sum, q) => (answers[q.id] === q.answer ? sum + q.weight : sum), 0)
  const wrong = quiz.filter((q) => answers[q.id] !== q.answer)

  const submit = () => {
    setSubmitted(true)
    onFinish(score)
    if (score / quizTotalPoints >= 0.7) celebrateBig()
    window.scrollTo({ top: 0 })
  }

  const worldName = (id: string) => worlds.find((w) => w.id === id)?.shortTitle ?? id

  return (
    <div className="mx-auto w-full max-w-3xl px-4 pt-4 lg:px-8">
      <button
        type="button"
        onClick={onBack}
        className="-ml-1 flex min-h-11 items-center gap-1.5 rounded-full px-2 font-label text-[14px] font-bold text-ink-variant transition hover:text-ink active:scale-95"
      >
        <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={2.4} /> Mapa
      </button>

      <h2 className="mt-3 font-display text-[28px] leading-tight font-extrabold">Simulado final</h2>

      <p className="mt-3 rounded-bubble bg-error-container p-4 text-[13px] leading-relaxed text-on-error-container">
        <strong className="font-label font-bold">Simulado não oficial.</strong> Estas {quiz.length}{' '}
        questões foram escritas para este roadmap com base no conteúdo programático do edital e no
        formato descrito nele (múltipla escolha, pesos 1, 2 e 3). Não são questões reais da prova.
      </p>

      {submitted ? (
        <ResultPanel
          score={score}
          best={best}
          wrong={wrong.map((q) => ({ id: q.id, worldId: q.worldId }))}
          worldName={worldName}
          onOpenWorld={onOpenWorld}
          onRetry={() => {
            setAnswers({})
            setSubmitted(false)
            window.scrollTo({ top: 0 })
          }}
        />
      ) : (
        <p className="mt-3 font-label text-[13px] font-bold text-ink-variant tabular-nums">
          {answeredCount} de {quiz.length} respondidas · {quizTotalPoints} pontos no total
        </p>
      )}

      <ol className="mt-6 flex flex-col gap-4">
        {quiz.map((q, i) => {
          const picked = answers[q.id]
          return (
            <li key={q.id} className="rounded-bubble bg-lowest p-4 stroke-inner shadow-soft">
              <div className="flex items-center gap-2">
                <span className="font-label text-[13px] font-bold text-ink-variant tabular-nums">
                  {i + 1}.
                </span>
                <span className="rounded-full bg-container px-2 py-0.5 font-label text-[11px] font-bold text-ink-variant">
                  Peso {q.weight}
                </span>
                <span className="ml-auto text-[11.5px] text-ink-variant">
                  {worldName(q.worldId)}
                </span>
              </div>

              <p className="mt-2.5 font-display text-[15.5px] leading-snug font-bold text-balance">
                {q.prompt}
              </p>

              <fieldset className="mt-3 flex min-w-0 flex-col gap-2" disabled={submitted}>
                <legend className="sr-only">{q.prompt}</legend>
                {q.options.map((opt, oi) => {
                  const isPicked = picked === oi
                  const isRight = oi === q.answer
                  const showRight = submitted && isRight
                  const showWrong = submitted && isPicked && !isRight

                  return (
                    <label
                      key={oi}
                      /* Sem classe de cursor: a regra base em index.css já dá
                         pointer enquanto o radio está ativo e volta ao padrão
                         quando o fieldset é desabilitado após a correção. */
                      className={`flex min-h-12 items-start gap-2.5 rounded-xl p-3 text-[13.5px] leading-snug transition ${
                        showRight
                          ? 'bg-tertiary-container text-on-tertiary-container'
                          : showWrong
                            ? 'bg-error-container text-on-error-container'
                            : isPicked
                              ? 'bg-primary-container text-on-primary-container'
                              : 'bg-low hover:bg-container'
                      }`}
                    >
                      <input
                        type="radio"
                        name={q.id}
                        checked={isPicked}
                        onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        className="mt-0.5 size-4.5 shrink-0 accent-[#78555e]"
                      />
                      <span className="min-w-0 flex-1">{opt}</span>
                      {showRight && (
                        <Check
                          aria-label="Resposta correta"
                          className="size-4 shrink-0"
                          strokeWidth={3}
                        />
                      )}
                      {showWrong && (
                        <X
                          aria-label="Sua resposta, incorreta"
                          className="size-4 shrink-0"
                          strokeWidth={3}
                        />
                      )}
                    </label>
                  )
                })}
              </fieldset>

              {submitted && (
                <p className="mt-3 rounded-xl bg-low p-3 text-[13px] leading-relaxed text-ink-variant">
                  {q.explanation}
                </p>
              )}
            </li>
          )
        })}
      </ol>

      {!submitted && (
        <div className="sticky bottom-20 z-20 mt-6 pb-6 lg:bottom-4">
          <button
            type="button"
            onClick={submit}
            disabled={answeredCount === 0}
            className="btn-squish min-h-14 w-full rounded-full bg-primary px-5 font-label text-[16px] font-bold text-white disabled:bg-outline-variant disabled:text-ink-variant"
          >
            {answeredCount < quiz.length
              ? `Corrigir (${answeredCount}/${quiz.length} respondidas)`
              : 'Corrigir simulado'}
          </button>
        </div>
      )}
    </div>
  )
}

function ResultPanel({
  score,
  best,
  wrong,
  worldName,
  onOpenWorld,
  onRetry,
}: {
  score: number
  best: number | null
  wrong: { id: string; worldId: string }[]
  worldName: (id: string) => string
  onOpenWorld: (worldId: string) => void
  onRetry: () => void
}) {
  const pct = Math.round((score / quizTotalPoints) * 100)
  // Mundos a revisar, sem repetir — o link leva direto ao conteúdo do erro.
  const toReview = [...new Set(wrong.map((w) => w.worldId))]

  return (
    <div className="mt-4 rounded-bubble bg-primary-container p-5 shadow-soft">
      <p className="label-caps text-on-primary-container">Resultado</p>
      <p className="mt-2 font-display text-[40px] leading-none font-extrabold tabular-nums text-ink">
        {score}
        <span className="font-sans text-[18px] font-medium text-on-primary-container">
          {' '}
          / {quizTotalPoints} pts
        </span>
      </p>
      <p className="mt-2 text-[13px] text-on-primary-container tabular-nums">
        {pct}% de aproveitamento ponderado
        {best !== null && best > score && ` · seu melhor: ${best} pts`}
      </p>

      {toReview.length > 0 ? (
        <>
          <p className="mt-5 font-label text-[13px] font-bold text-ink">Revise estes mundos:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {toReview.map((wid) => (
              <button
                key={wid}
                type="button"
                onClick={() => onOpenWorld(wid)}
                className="min-h-11 rounded-full bg-lowest px-4 font-label text-[13px] font-bold text-ink transition hover:shadow-soft active:scale-95"
              >
                {worldName(wid)}
                <ArrowRight aria-hidden="true" className="ml-1 inline size-3.5" strokeWidth={2.6} />
              </button>
            ))}
          </div>
        </>
      ) : (
        <p className="mt-4 font-label text-[15px] font-bold text-ink">Gabarito perfeito.</p>
      )}

      <button
        type="button"
        onClick={onRetry}
        className="btn-squish mt-5 min-h-12 w-full rounded-full bg-lowest px-4 font-label text-[14px] font-bold text-ink"
        style={{ '--squish': 'var(--color-primary-dim)' } as React.CSSProperties}
      >
        Refazer simulado
      </button>
    </div>
  )
}
