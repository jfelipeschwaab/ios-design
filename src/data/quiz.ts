import type { QuizQuestion } from '../types'

/**
 * Simulado NÃO OFICIAL. Estas questões foram escritas para este roadmap com base nos
 * temas do conteúdo programático do Edital nº 01/2026 e no formato descrito nele
 * (múltipla escolha, pesos 1, 2 e 3). Não são questões reais da prova, e a UI diz isso
 * ao usuário antes de começar.
 */
export const quiz: QuizQuestion[] = [
  {
    id: 'q1',
    worldId: 'w5',
    weight: 1,
    prompt:
      'Um aplicativo exibe uma barra de progresso enquanto envia um arquivo grande. Qual heurística de Nielsen está sendo atendida?',
    options: [
      'Visibilidade do status do sistema',
      'Reconhecimento em vez de memorização',
      'Design estético e minimalista',
      'Ajuda e documentação',
    ],
    answer: 0,
    explanation:
      'Manter o usuário informado sobre o que está acontecendo, com feedback em tempo razoável, é exatamente a primeira heurística.',
  },
  {
    id: 'q2',
    worldId: 'w5',
    weight: 2,
    prompt:
      'Um formulário só avisa que o CPF é inválido depois do envio, apagando todos os campos. Além da heurística 9, qual outra é mais claramente violada?',
    options: [
      'Correspondência com o mundo real',
      'Prevenção de erros',
      'Ajuda e documentação',
      'Flexibilidade e eficiência de uso',
    ],
    answer: 1,
    explanation:
      'Validar em tempo real impediria o erro de acontecer. Prevenir é sempre preferível a comunicar bem depois.',
  },
  {
    id: 'q3',
    worldId: 'w5',
    weight: 2,
    prompt: 'Qual é a ordem correta das três primeiras heurísticas de Nielsen?',
    options: [
      'Consistência e padrões; Prevenção de erros; Controle do usuário',
      'Visibilidade do status; Correspondência com o mundo real; Controle e liberdade do usuário',
      'Correspondência com o mundo real; Visibilidade do status; Consistência e padrões',
      'Controle e liberdade do usuário; Visibilidade do status; Prevenção de erros',
    ],
    answer: 1,
    explanation:
      'A ordem oficial do NN/g começa com visibilidade do status, correspondência com o mundo real e controle e liberdade do usuário.',
  },
  {
    id: 'q4',
    worldId: 'w5',
    weight: 3,
    prompt:
      'Ao classificar a severidade de um problema de usabilidade, quais fatores são combinados?',
    options: [
      'Custo de correção, prazo e time responsável',
      'Frequência, impacto e persistência',
      'Número de usuários, receita e prioridade do PM',
      'Estética, consistência e desempenho',
    ],
    answer: 1,
    explanation:
      'Frequência (quão comum), impacto (quão difícil de superar) e persistência (se incomoda repetidamente) definem a nota de severidade.',
  },
  {
    id: 'q5',
    worldId: 'w4',
    weight: 1,
    prompt:
      'Em um formulário, os campos "Cidade" e "Estado" estão bem próximos entre si e distantes do bloco de pagamento. Qual princípio explica a leitura como grupo?',
    options: ['Similaridade', 'Proximidade', 'Fechamento', 'Pregnância'],
    answer: 1,
    explanation:
      'Proximidade é o princípio mais forte de agrupamento: elementos próximos são percebidos como pertencentes ao mesmo conjunto.',
  },
  {
    id: 'q6',
    worldId: 'w4',
    weight: 2,
    prompt:
      'Um card com fundo cinza agrupa itens que estão mais distantes entre si do que de itens fora do card. Qual princípio prevalece?',
    options: [
      'Proximidade, pois a distância sempre vence',
      'Região comum, pois a delimitação compartilhada é mais forte',
      'Continuidade, pois o olho segue a borda',
      'Similaridade, pois os itens têm o mesmo estilo',
    ],
    answer: 1,
    explanation:
      'Região comum é forte o bastante para superar a proximidade: elementos dentro de uma mesma fronteira visual são agrupados.',
  },
  {
    id: 'q7',
    worldId: 'w4',
    weight: 2,
    prompt: 'A lei da pregnância (boa forma) afirma que a percepção tende a:',
    options: [
      'Completar formas incompletas automaticamente',
      'Adotar a organização mais simples, estável e regular possível',
      'Agrupar elementos que se movem na mesma direção',
      'Separar o objeto de interesse do plano de fundo',
    ],
    answer: 1,
    explanation:
      'Pregnância é a lei mais geral da Gestalt: diante de um estímulo ambíguo, percebemos a interpretação mais simples e estável. Completar formas é fechamento.',
  },
  {
    id: 'q8',
    worldId: 'w6',
    weight: 1,
    prompt: 'Os quatro princípios do WCAG (POUR) são:',
    options: [
      'Prático, Objetivo, Usável, Responsivo',
      'Perceptível, Operável, Compreensível, Robusto',
      'Portável, Otimizado, Universal, Rápido',
      'Perceptível, Organizado, Universal, Rastreável',
    ],
    answer: 1,
    explanation:
      'POUR: Perceivable, Operable, Understandable, Robust — Perceptível, Operável, Compreensível e Robusto.',
  },
  {
    id: 'q9',
    worldId: 'w6',
    weight: 2,
    prompt:
      'Segundo o WCAG 2, qual é a razão de contraste mínima para texto normal no nível AA?',
    options: ['3:1', '4.5:1', '7:1', '2:1'],
    answer: 1,
    explanation:
      '4.5:1 para texto normal e 3:1 para texto grande (a partir de 18pt, ou 14pt em negrito).',
  },
  {
    id: 'q10',
    worldId: 'w6',
    weight: 3,
    prompt:
      'Um app usa apenas a cor vermelha para indicar campos com erro. Qual princípio do WCAG isso viola mais diretamente?',
    options: [
      'Robusto, pois quebra em navegadores antigos',
      'Perceptível, pois a informação depende de um único canal sensorial',
      'Operável, pois exige uso do mouse',
      'Compreensível, pois o texto é ambíguo',
    ],
    answer: 1,
    explanation:
      'Cor nunca deve ser o único meio de transmitir informação — quem não distingue a cor perde o conteúdo. É uma falha de percepção.',
  },
  {
    id: 'q11',
    worldId: 'w2',
    weight: 1,
    prompt: 'Qual é a ordem das cinco etapas do Design Thinking?',
    options: [
      'Definir, Empatizar, Idear, Testar, Prototipar',
      'Empatizar, Definir, Idear, Prototipar, Testar',
      'Idear, Empatizar, Definir, Prototipar, Testar',
      'Empatizar, Idear, Definir, Testar, Prototipar',
    ],
    answer: 1,
    explanation:
      'Empatizar → Definir → Idear → Prototipar → Testar, lembrando que o processo é iterativo e não estritamente linear.',
  },
  {
    id: 'q12',
    worldId: 'w2',
    weight: 2,
    prompt: 'Uma declaração "How Might We" é produzida ao final de qual etapa?',
    options: ['Empatizar', 'Definir', 'Idear', 'Testar'],
    answer: 1,
    explanation:
      'O HMW converte o problema definido em um convite à ideação — é a ponte entre Definir e Idear.',
  },
  {
    id: 'q13',
    worldId: 'w2',
    weight: 3,
    prompt:
      'Você quer validar se o fluxo de checkout faz sentido, antes de decidir cores e tipografia. O protótipo adequado é:',
    options: [
      'Alta fidelidade, para o teste ser realista',
      'Baixa fidelidade, porque o objetivo é testar estrutura e fluxo',
      'Nenhum: aplique um questionário',
      'Alta fidelidade, pois baixa fidelidade não permite teste',
    ],
    answer: 1,
    explanation:
      'Baixa fidelidade testa conceito e fluxo de forma rápida e barata. Alta fidelidade se justifica quando o que está em jogo é detalhe visual e microinteração.',
  },
  {
    id: 'q14',
    worldId: 'w1',
    weight: 1,
    prompt: 'Quais são as três fases do Challenge Based Learning?',
    options: [
      'Engage, Investigate, Act',
      'Discover, Define, Deliver',
      'Empathize, Ideate, Build',
      'Plan, Do, Check',
    ],
    answer: 0,
    explanation: 'Engage, Investigate e Act — nessa ordem, com documentação e reflexão atravessando as três.',
  },
  {
    id: 'q15',
    worldId: 'w1',
    weight: 2,
    prompt: 'Na fase Engage do CBL, a sequência correta de produtos é:',
    options: [
      'Challenge → Big Idea → Essential Question',
      'Big Idea → Essential Question → Challenge',
      'Essential Question → Big Idea → Challenge',
      'Big Idea → Challenge → Essential Question',
    ],
    answer: 1,
    explanation:
      'Parte-se de um conceito amplo (Big Idea), recorta-se com uma pergunta essencial e ela vira uma chamada à ação (Challenge), sempre no imperativo.',
  },
  {
    id: 'q16',
    worldId: 'w3',
    weight: 2,
    prompt:
      'No iOS, qual componente é indicado para alternar entre seções de mesmo nível hierárquico do app?',
    options: ['Toolbar', 'Tab bar', 'Alert', 'Sheet modal'],
    answer: 1,
    explanation:
      'Tab bar serve para navegar entre seções irmãs. Toolbar agrupa ações relativas ao contexto da tela atual.',
  },
  {
    id: 'q17',
    worldId: 'w3',
    weight: 3,
    prompt: 'Sobre affordance e significante, é correto afirmar que:',
    options: [
      'São sinônimos usados em contextos diferentes',
      'Affordance é a ação possível; significante é a pista visual que a comunica',
      'Significante é a ação possível; affordance é o rótulo textual',
      'Affordance só existe em interfaces físicas',
    ],
    answer: 1,
    explanation:
      'A affordance pode existir sem ser percebida. O significante é o que torna a possibilidade visível — daí o elemento clicável sem pista nenhuma ser um problema.',
  },
  {
    id: 'q18',
    worldId: 'w7',
    weight: 1,
    prompt: 'Os três componentes estruturais de um grid de página são:',
    options: [
      'Colunas, calhas e margens',
      'Linhas, cores e sombras',
      'Cabeçalho, corpo e rodapé',
      'Padding, border e outline',
    ],
    answer: 0,
    explanation:
      'Colunas (onde o conteúdo se apoia), calhas/gutters (o espaço entre elas) e margens (a borda externa da página).',
  },
  {
    id: 'q19',
    worldId: 'w8',
    weight: 3,
    prompt: 'A negação da proposição "Se chove, então a rua fica molhada" é:',
    options: [
      'Se não chove, então a rua não fica molhada',
      'Chove e a rua não fica molhada',
      'Não chove ou a rua fica molhada',
      'Se a rua fica molhada, então chove',
    ],
    answer: 1,
    explanation:
      'A negação de "P → Q" é "P ∧ ¬Q". Negar um condicional não produz outro condicional — é o erro mais comum nesse tipo de questão.',
  },
  {
    id: 'q20',
    worldId: 'w8',
    weight: 2,
    prompt: 'Quantas linhas tem a tabela-verdade de uma fórmula com 4 proposições simples?',
    options: ['8', '12', '16', '4'],
    answer: 2,
    explanation: '2ⁿ linhas para n proposições. Com n = 4, são 2⁴ = 16 linhas.',
  },
]

export const quizTotalPoints = quiz.reduce((sum, q) => sum + q.weight, 0)
