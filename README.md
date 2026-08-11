# Jornada Design iOS — Apple Developer Academy / UCB

Roadmap gamificado de estudos para a **prova técnica de Designer iOS** (2ª fase) do
processo seletivo do Projeto Apple Developer Academy da Universidade Católica de Brasília.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # produção em dist/
```

## De onde vem o conteúdo

O arquivo `EDITAL DE BOLSA DE CAPACITACAO 2027.pdf` é o **Edital nº 01/2026** — a chamada
de inscrições, não uma apostila. O conteúdo de estudo cabe em um parágrafo (Capítulo V,
item 1):

> **CONTEÚDO PROGRAMÁTICO PARA A ÁREA DE DESIGNER iOS:** Princípios de Gestalt,
> Heurísticas de Nielsen, acessibilidade e layout no design de interfaces, lógica e
> conteúdos das trilhas definidas no item a1 da primeira fase.

E o item a1 define as trilhas: *Soluções Tecnológicas com CBL*, *Design Thinking na
prática* e *Design de Interface de Usuário (UI Design)*.

Daí saem os **9 mundos e a ordem** em que aparecem. O edital não detalha nenhum
subconteúdo — as 10 heurísticas do NN/g, as leis da Gestalt, as fases do CBL, o POUR do
WCAG etc. vêm de fontes canônicas externas. É expansão do que o edital nomeia, nunca
substituição. **Todas as URLs foram verificadas (HTTP 200)** antes de entrarem no código.

Dados da prova, também do edital: múltipla escolha, 30 questões, 60 pontos, 3 horas,
pesos 1/2/3 identificados no caput de cada questão, dia **23/09/2026** no Campus UCB
Taguatinga.

## Design system

O visual segue `DESIGN.md` ("Pastel Study Kingdom"): paleta pastel com neutro ameixa,
tipografia em Plus Jakarta Sans / Be Vietnam Pro / Quicksand, cantos `rounded-xl`,
sombras ambientes tintadas de rosa (nunca cinza), botões "squishy" com sombra sólida de
4px, e navegação em dock no rodapé do mobile.

Ícones são do **shadcn/ui** (lucide-react) — nenhum emoji na interface. O ícone de cada
mundo é uma chave em `World.icon` resolvida por `worldIcon()` em `src/components/icons.tsx`.

O contraste de todos os pares de cor foi verificado acima de 4.5:1 (3:1 para traços de
UI). Ao mudar uma cor em `src/palettes.ts`, rode a checagem de novo.

## Estrutura

```
src/
  types.ts              World, Step, Substep, Resource, QuizQuestion
  data/roadmap.ts       TODO o conteúdo — 9 mundos, 31 steps, 113 substeps
  data/quiz.ts          20 questões do simulado (não oficial)
  progress.ts           seletores puros (progresso, estado de mundo, próximo passo)
  useProgress.ts        estado de conclusão + localStorage
  palettes.ts           uma paleta por mundo
  components/           Journey, JourneyRail, WorldView, StepDrawer, SubstepItem, Quiz…
  components/icons.tsx  registro de ícones lucide (shadcn/ui)
```

Conteúdo, estado e UI ficam separados: `roadmap.ts` não conhece React, `useProgress`
guarda apenas ids de substeps concluídos, e os componentes não têm conteúdo embutido.

## Regras de desbloqueio

Mundos abrem em sequência, mas todo mundo bloqueado traz um botão **"Desbloquear mesmo
assim"** — a progressão é motivacional, não uma cerca. A única exceção é o **Desafio
Final**, que exige os 8 mundos anteriores completos.

## Acessibilidade

Navegação por teclado, foco visível, checkbox nativo, `<dialog>` nativo para o drawer
(backdrop, Esc e retenção de foco de graça), rótulos ARIA nos nós do mapa, links externos
identificados, e `prefers-reduced-motion` respeitado — sem confete e sem transições, mas
todas as mudanças de estado continuam visíveis.

## Simulado

As 20 questões foram escritas para este roadmap, seguindo o formato do edital. **Não são
questões reais da prova** e a interface diz isso antes de começar.
