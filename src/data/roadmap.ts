import type { World } from '../types'

/**
 * CONTEÚDO — não misturar com UI nem com estado de progresso.
 *
 * Fonte de autoridade: Edital nº 01/2026 (Apple Developer Academy / UCB), Capítulo V,
 * item 1 — "CONTEÚDO PROGRAMÁTICO PARA A ÁREA DE DESIGNER iOS: Princípios de Gestalt,
 * Heurísticas de Nielsen, acessibilidade e layout no design de interfaces, lógica e
 * conteúdos das trilhas definidas no item a1 da primeira fase" — sendo as trilhas do
 * item a1: Soluções Tecnológicas com CBL, Design Thinking na prática e Design de
 * Interface de Usuário (UI Design).
 *
 * Os nove mundos e a ordem vêm do edital. Os substeps são o detalhamento canônico de
 * cada tema (as 10 heurísticas do NN/g, as leis da Gestalt, as fases do CBL, o POUR do
 * WCAG etc.) — expansão do que o edital nomeia, nunca substituição.
 *
 * Todas as URLs abaixo foram verificadas (HTTP 200) antes de entrarem no arquivo.
 */

const NNG = 'Nielsen Norman Group'
const HIG = 'Apple Human Interface Guidelines'
const W3C = 'W3C — Web Accessibility Initiative'
const IXDF = 'Interaction Design Foundation'

export const worlds: World[] = [
  // ─────────────────────────── MUNDO 1 ───────────────────────────
  {
    id: 'w1',
    title: 'Soluções Tecnológicas com CBL',
    shortTitle: 'CBL',
    description:
      'A metodologia que a Apple usa para transformar uma ideia grande em uma solução real. É a trilha de abertura do edital.',
    icon: 'target',
    color: 'cbl',
    tagline: 'Toda solução começa com uma pergunta que vale a pena responder.',
    steps: [
      {
        id: 'w1s1',
        title: 'Fundamentos do CBL',
        description: 'O que é Challenge Based Learning e por que a Academy inteira gira em torno dele.',
        substeps: [
          {
            id: 'w1s1a',
            title: 'O que é Challenge Based Learning',
            description:
              'Um framework de aprendizagem ativa criado com a Apple: em vez de receber um problema pronto, você identifica um desafio real e constrói uma solução que pode ser implementada.',
            difficulty: 1,
            resources: [
              { title: 'Challenge Based Learning — site oficial', url: 'https://www.challengebasedlearning.org/', type: 'documentation', source: 'CBL' },
            ],
          },
          {
            id: 'w1s1b',
            title: 'As três fases: Engage, Investigate, Act',
            description:
              'Toda a estrutura do CBL cabe em três fases encadeadas. Saber o nome, a ordem e o produto de cada uma é o básico cobrável em prova.',
            difficulty: 1,
            resources: [
              { title: 'O framework CBL em detalhe', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
          {
            id: 'w1s1c',
            title: 'Documentar e refletir ao longo do processo',
            description:
              'No CBL, documentação e reflexão não são a etapa final — atravessam as três fases. É o que permite justificar decisões depois.',
            difficulty: 2,
            resources: [
              { title: 'Framework CBL — documentação e reflexão', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
        ],
      },
      {
        id: 'w1s2',
        title: 'Engage',
        description: 'Da ideia ampla ao desafio acionável.',
        substeps: [
          {
            id: 'w1s2a',
            title: 'Big Idea',
            description:
              'Um conceito amplo e relevante que importa para você e para a sociedade — "saúde mental", "mobilidade urbana". Ainda não é um problema, é um território.',
            difficulty: 1,
            resources: [
              { title: 'Framework CBL — Engage', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
          {
            id: 'w1s2b',
            title: 'Essential Question',
            description:
              'Recorta a Big Idea a partir do seu contexto e interesse. Deve ser aberta, pessoal e impossível de responder com um simples sim ou não.',
            difficulty: 2,
            resources: [
              { title: 'Framework CBL — Engage', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
          {
            id: 'w1s2c',
            title: 'Challenge',
            description:
              'Converte a pergunta em uma chamada à ação, sempre no imperativo — "crie", "desenvolva", "reduza". É o que diferencia CBL de um trabalho de pesquisa.',
            difficulty: 2,
            resources: [
              { title: 'Framework CBL — Engage', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
        ],
      },
      {
        id: 'w1s3',
        title: 'Investigate',
        description: 'Construir o conhecimento necessário antes de propor qualquer coisa.',
        substeps: [
          {
            id: 'w1s3a',
            title: 'Guiding Questions',
            description:
              'Tudo o que você precisa saber para enfrentar o desafio, transformado em perguntas. São geradas por você, não recebidas prontas.',
            difficulty: 1,
            resources: [
              { title: 'Framework CBL — Investigate', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
          {
            id: 'w1s3b',
            title: 'Guiding Activities e Resources',
            description:
              'As atividades e fontes escolhidas para responder cada pergunta: entrevistas, leituras, experimentos, especialistas.',
            difficulty: 2,
            resources: [
              { title: 'Framework CBL — Investigate', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
          {
            id: 'w1s3c',
            title: 'Análise e síntese',
            description:
              'Transformar dados brutos em conclusões que sustentam a solução. Sem esta etapa, o Act vira chute com aparência de método.',
            difficulty: 3,
            resources: [
              { title: 'UX Research Cheat Sheet', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w1s3d',
            title: 'Pesquisa com usuários aplicada ao desafio',
            description:
              'Quando usar entrevista, observação ou teste — e por que dado declarado e dado observado quase nunca coincidem.',
            difficulty: 3,
            resources: [
              { title: 'UX Research Cheat Sheet', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/', type: 'article', source: NNG },
              { title: 'Usability 101: Introduction to Usability', url: 'https://www.nngroup.com/articles/usability-101-introduction-to-usability/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w1s4',
        title: 'Act',
        description: 'Implementar, medir e voltar atrás quando necessário.',
        substeps: [
          {
            id: 'w1s4a',
            title: 'Solution — do conceito ao protótipo',
            description:
              'A solução precisa ser concreta e implementável no contexto real do desafio, não uma proposta hipotética.',
            difficulty: 2,
            resources: [
              { title: 'Framework CBL — Act', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
          {
            id: 'w1s4b',
            title: 'Implementação com público real',
            description:
              'O CBL exige colocar a solução diante das pessoas afetadas. É isso que separa CBL de PBL tradicional.',
            difficulty: 2,
            resources: [
              { title: 'Framework CBL — Act', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
            ],
          },
          {
            id: 'w1s4c',
            title: 'Evaluation e iteração',
            description:
              'Definir como o sucesso será medido antes de implementar, e usar o resultado para refinar — ou para reformular o desafio.',
            difficulty: 3,
            resources: [
              { title: 'Framework CBL — Act', url: 'https://www.challengebasedlearning.org/framework/', type: 'documentation', source: 'CBL' },
              { title: 'Usability Testing 101', url: 'https://www.nngroup.com/articles/usability-testing-101/', type: 'article', source: NNG },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── MUNDO 2 ───────────────────────────
  {
    id: 'w2',
    title: 'Design Thinking na Prática',
    shortTitle: 'Design Thinking',
    description:
      'O processo centrado no ser humano que vai da empatia ao teste. Segunda trilha obrigatória do edital.',
    icon: 'lightbulb',
    color: 'dt',
    tagline: 'Entenda a pessoa antes de desenhar a tela.',
    steps: [
      {
        id: 'w2s1',
        title: 'Fundamentos e duplo diamante',
        description: 'O mapa mental do processo inteiro.',
        substeps: [
          {
            id: 'w2s1a',
            title: 'O que é Design Thinking',
            description:
              'Uma abordagem iterativa e centrada no humano para problemas mal definidos. Não é uma sequência rígida: você volta etapas o tempo todo.',
            difficulty: 1,
            resources: [
              { title: 'Design Thinking 101', url: 'https://www.nngroup.com/articles/design-thinking/', type: 'article', source: NNG },
              { title: 'Design Thinking — visão geral', url: 'https://ixdf.org/literature/topics/design-thinking', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w2s1b',
            title: 'As cinco etapas',
            description:
              'Empatizar, Definir, Idear, Prototipar, Testar. Saber o que entra e o que sai de cada etapa vale mais do que decorar os nomes.',
            difficulty: 1,
            resources: [
              { title: 'Design Thinking 101', url: 'https://www.nngroup.com/articles/design-thinking/', type: 'article', source: NNG },
              { title: 'Design Thinking — IDEO', url: 'https://designthinking.ideo.com/', type: 'article', source: 'IDEO' },
            ],
          },
          {
            id: 'w2s1c',
            title: 'Divergir e convergir (duplo diamante)',
            description:
              'Duas expansões e duas reduções: primeiro sobre o problema, depois sobre a solução. Confundir a ordem é o erro clássico.',
            difficulty: 2,
            resources: [
              { title: 'Design Thinking 101', url: 'https://www.nngroup.com/articles/design-thinking/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w2s2',
        title: 'Empatizar',
        description: 'Coletar entendimento real, não suposição.',
        substeps: [
          {
            id: 'w2s2a',
            title: 'Entrevistas com usuários',
            description:
              'Perguntas abertas, foco em comportamento passado e não em intenção futura. "O que você faria?" é a pergunta que mais engana.',
            difficulty: 2,
            resources: [
              { title: 'UX Research Cheat Sheet', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w2s2b',
            title: 'Mapa de empatia',
            description:
              'Organiza o que a pessoa diz, pensa, faz e sente em quatro quadrantes — e escancara as contradições entre eles.',
            difficulty: 1,
            resources: [
              { title: 'Empathy Mapping: The First Step in Design Thinking', url: 'https://www.nngroup.com/articles/empathy-mapping/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w2s2c',
            title: 'Personas',
            description:
              'Arquétipos construídos a partir de pesquisa real. Persona inventada sem dado é ficção que legitima o que você já queria fazer.',
            difficulty: 2,
            resources: [
              { title: 'Personas: Study Guide', url: 'https://www.nngroup.com/articles/personas-study-guide/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w2s2d',
            title: 'Jornada do usuário',
            description:
              'Visualiza as etapas, ações, emoções e pontos de dor ao longo do tempo. É onde as oportunidades ficam óbvias.',
            difficulty: 2,
            resources: [
              { title: 'Journey Mapping 101', url: 'https://www.nngroup.com/articles/journey-mapping-101/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w2s3',
        title: 'Definir',
        description: 'Transformar pesquisa em um problema que dá para atacar.',
        substeps: [
          {
            id: 'w2s3a',
            title: 'Síntese e agrupamento de achados',
            description:
              'Agrupar observações em padrões (affinity diagram) antes de tirar qualquer conclusão.',
            difficulty: 2,
            resources: [
              { title: 'UX Research Cheat Sheet', url: 'https://www.nngroup.com/articles/ux-research-cheat-sheet/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w2s3b',
            title: 'Point of View / User Need Statement',
            description:
              'A estrutura [usuário] precisa de [necessidade] porque [insight]. A necessidade é um verbo, nunca uma funcionalidade.',
            difficulty: 3,
            resources: [
              { title: 'User Need Statements: The "Define" Stage', url: 'https://www.nngroup.com/articles/user-need-statements/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w2s3c',
            title: 'How Might We',
            description:
              'Converte o problema definido em convite à ideação. Amplo demais paralisa, específico demais já embute a solução.',
            difficulty: 2,
            resources: [
              { title: 'How Might We Questions', url: 'https://www.nngroup.com/articles/how-might-we-questions/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w2s4',
        title: 'Idear',
        description: 'Quantidade primeiro, julgamento depois.',
        substeps: [
          {
            id: 'w2s4a',
            title: 'Regras do brainstorm',
            description:
              'Adiar o julgamento, buscar volume, aceitar ideias absurdas, construir sobre a ideia do outro, um assunto por vez.',
            difficulty: 1,
            resources: [
              { title: 'Design Thinking 101', url: 'https://www.nngroup.com/articles/design-thinking/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w2s4b',
            title: 'Crazy 8s e sketching rápido',
            description:
              'Oito ideias em oito minutos. O tempo curto é justamente o que impede o autoconvencimento na primeira ideia.',
            difficulty: 1,
            resources: [
              { title: 'Design Thinking — métodos de ideação', url: 'https://ixdf.org/literature/topics/design-thinking', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w2s4c',
            title: 'Priorização de ideias',
            description:
              'Matrizes esforço × impacto, votação por pontos, critérios de desejabilidade / viabilidade / exequibilidade.',
            difficulty: 2,
            resources: [
              { title: 'Design Thinking 101', url: 'https://www.nngroup.com/articles/design-thinking/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w2s5',
        title: 'Prototipar e Testar',
        description: 'Errar barato antes de errar caro.',
        substeps: [
          {
            id: 'w2s5a',
            title: 'Baixa vs. alta fidelidade',
            description:
              'Papel e wireframe testam fluxo e conceito; protótipo de alta fidelidade testa detalhe visual e microinteração. Escolher errado desperdiça o teste.',
            difficulty: 2,
            resources: [
              { title: 'Low-Fidelity vs. High-Fidelity Prototypes', url: 'https://www.nngroup.com/articles/ux-prototype-hi-lo-fidelity/', type: 'article', source: NNG },
              { title: 'Prototipagem — visão geral', url: 'https://ixdf.org/literature/topics/prototypes', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w2s5b',
            title: 'Teste de usabilidade',
            description:
              'Tarefas reais, observação silenciosa, pensar em voz alta. Você testa a interface, não a pessoa.',
            difficulty: 2,
            resources: [
              { title: 'Usability Testing 101', url: 'https://www.nngroup.com/articles/usability-testing-101/', type: 'article', source: NNG },
              { title: 'Usability Testing — visão geral', url: 'https://ixdf.org/literature/topics/usability-testing', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w2s5c',
            title: 'Quantos usuários testar',
            description:
              'Cinco usuários revelam a maioria dos problemas de usabilidade; é mais eficiente rodar vários testes pequenos do que um grande.',
            difficulty: 3,
            resources: [
              { title: 'Usability Testing 101', url: 'https://www.nngroup.com/articles/usability-testing-101/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w2s5d',
            title: 'Iterar com base no achado',
            description:
              'Separar o que é problema real do que é preferência declarada, e priorizar por severidade antes de redesenhar.',
            difficulty: 3,
            resources: [
              { title: 'Severity Ratings for Usability Problems', url: 'https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/', type: 'article', source: NNG },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── MUNDO 3 ───────────────────────────
  {
    id: 'w3',
    title: 'Design de Interface de Usuário',
    shortTitle: 'UI Design',
    description:
      'Cor, tipografia, componentes e consistência — a superfície onde tudo se encontra. Terceira trilha obrigatória.',
    icon: 'palette',
    color: 'ui',
    tagline: 'A interface é a conversa. Toda escolha visual diz alguma coisa.',
    steps: [
      {
        id: 'w3s1',
        title: 'Fundamentos de UI',
        description: 'O vocabulário base que a prova assume que você já tem.',
        substeps: [
          {
            id: 'w3s1a',
            title: 'UI e UX: a diferença',
            description:
              'UX é a experiência inteira com o produto; UI é a camada de interação visual. Toda UI é parte da UX, mas UX não se resume a UI.',
            difficulty: 1,
            resources: [
              { title: 'The Definition of User Experience (UX)', url: 'https://www.nngroup.com/articles/definition-user-experience/', type: 'article', source: NNG },
              { title: 'UI Design — visão geral', url: 'https://ixdf.org/literature/topics/ui-design', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w3s1b',
            title: 'Affordance e significante',
            description:
              'Affordance é o que o objeto permite fazer; significante é a pista visual que comunica isso. Um botão sem significante tem affordance invisível.',
            difficulty: 3,
            resources: [
              { title: 'Affordances — visão geral', url: 'https://ixdf.org/literature/topics/affordances', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w3s1c',
            title: 'Elementos de interface',
            description:
              'Controles de entrada, navegação, exibição de informação e contêineres — e qual componente resolve qual tipo de tarefa.',
            difficulty: 1,
            resources: [
              { title: 'What is UI design?', url: 'https://www.figma.com/resource-library/what-is-ui-design/', type: 'article', source: 'Figma' },
              { title: 'HIG — Components', url: 'https://developer.apple.com/design/human-interface-guidelines', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w3s1d',
            title: 'Navegação e arquitetura de informação',
            description:
              'A navegação é a expressão visível da arquitetura de informação. Menu bonito não conserta estrutura errada.',
            difficulty: 3,
            resources: [
              { title: 'IA vs. Navigation', url: 'https://www.nngroup.com/articles/ia-vs-navigation/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w3s2',
        title: 'Cor',
        description: 'Cor como sistema, não como enfeite.',
        substeps: [
          {
            id: 'w3s2a',
            title: 'Matiz, saturação e luminosidade',
            description:
              'As três dimensões que definem qualquer cor. Luminosidade é a que mais afeta legibilidade e contraste.',
            difficulty: 1,
            resources: [
              { title: 'Teoria das cores', url: 'https://ixdf.org/literature/topics/color-theory', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w3s2b',
            title: 'Cor com função na interface',
            description:
              'Cor deve carregar significado consistente: ação primária, destrutiva, sucesso, alerta. Nunca deve ser o único portador da informação.',
            difficulty: 2,
            resources: [
              { title: 'Using Color to Enhance Your Design', url: 'https://www.nngroup.com/articles/color-enhance-design/', type: 'article', source: NNG },
              { title: 'HIG — Color', url: 'https://developer.apple.com/design/human-interface-guidelines/color', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w3s2c',
            title: 'Contraste e legibilidade',
            description:
              'A razão mínima de 4.5:1 para texto normal e 3:1 para texto grande é o número mais cobrável em prova de design.',
            difficulty: 2,
            resources: [
              { title: 'WCAG 2.2 — Contrast (Minimum)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html', type: 'documentation', source: W3C },
            ],
          },
          {
            id: 'w3s2d',
            title: 'Dark Mode e cores dinâmicas',
            description:
              'No iOS, cores semânticas se adaptam sozinhas ao modo claro/escuro. Hex fixo quebra em uma das duas aparências.',
            difficulty: 3,
            resources: [
              { title: 'HIG — Dark Mode', url: 'https://developer.apple.com/design/human-interface-guidelines/dark-mode', type: 'documentation', source: HIG },
            ],
          },
        ],
      },
      {
        id: 'w3s3',
        title: 'Tipografia',
        description: 'A maior parte de uma interface é texto.',
        substeps: [
          {
            id: 'w3s3a',
            title: 'Vocabulário tipográfico',
            description:
              'Família, peso, corpo, entrelinha, kerning, altura-x. Sem esses termos não dá para justificar uma decisão de tipografia.',
            difficulty: 1,
            resources: [
              { title: 'Typography Terms Cheat Sheet', url: 'https://www.nngroup.com/articles/typography-terms-ux/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w3s3b',
            title: 'Hierarquia e escala tipográfica',
            description:
              'Poucos tamanhos, diferenças claras entre eles. Dois tamanhos quase iguais leem como erro, não como hierarquia.',
            difficulty: 2,
            resources: [
              { title: 'Visual Hierarchy', url: 'https://www.nngroup.com/articles/visual-hierarchy-ux-definition/', type: 'article', source: NNG },
              { title: 'Tipografia — visão geral', url: 'https://ixdf.org/literature/topics/typography', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w3s3c',
            title: 'Legibilidade e comprimento de linha',
            description:
              'Entrelinha, contraste e largura de coluna definem se o texto é lido ou pulado.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Typography', url: 'https://developer.apple.com/design/human-interface-guidelines/typography', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w3s3d',
            title: 'Dynamic Type no iOS',
            description:
              'O usuário escolhe o tamanho do texto no sistema e a interface precisa acompanhar sem quebrar. É requisito de acessibilidade, não opcional.',
            difficulty: 3,
            resources: [
              { title: 'HIG — Typography (Dynamic Type)', url: 'https://developer.apple.com/design/human-interface-guidelines/typography', type: 'documentation', source: HIG },
            ],
          },
        ],
      },
      {
        id: 'w3s4',
        title: 'Componentes e padrões iOS',
        description: 'O que a Apple espera de uma interface iOS.',
        substeps: [
          {
            id: 'w3s4a',
            title: 'Projetando para iOS',
            description:
              'Os princípios que atravessam o sistema inteiro e o que diferencia uma interface iOS de uma web adaptada.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Designing for iOS', url: 'https://developer.apple.com/design/human-interface-guidelines/designing-for-ios', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w3s4b',
            title: 'Navegação: tab bars e toolbars',
            description:
              'Tab bar para alternar entre seções irmãs; toolbar para ações do contexto atual. Trocar um pelo outro é erro estrutural.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Tab bars', url: 'https://developer.apple.com/design/human-interface-guidelines/tab-bars', type: 'documentation', source: HIG },
              { title: 'HIG — Toolbars', url: 'https://developer.apple.com/design/human-interface-guidelines/toolbars', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w3s4c',
            title: 'Botões e estados',
            description:
              'Normal, pressionado, desabilitado, carregando. Estado ausente é a origem do duplo toque acidental.',
            difficulty: 1,
            resources: [
              { title: 'HIG — Buttons', url: 'https://developer.apple.com/design/human-interface-guidelines/buttons', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w3s4d',
            title: 'Ícones e SF Symbols',
            description:
              'A biblioteca de símbolos da Apple se alinha à tipografia do sistema e acompanha peso e tamanho do texto.',
            difficulty: 2,
            resources: [
              { title: 'HIG — SF Symbols', url: 'https://developer.apple.com/design/human-interface-guidelines/sf-symbols', type: 'documentation', source: HIG },
              { title: 'HIG — Icons', url: 'https://developer.apple.com/design/human-interface-guidelines/icons', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w3s4e',
            title: 'Feedback, carregamento e alertas',
            description:
              'Como comunicar progresso, sucesso e erro sem interromper a pessoa mais do que o necessário.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Feedback', url: 'https://developer.apple.com/design/human-interface-guidelines/feedback', type: 'documentation', source: HIG },
              { title: 'HIG — Loading', url: 'https://developer.apple.com/design/human-interface-guidelines/loading', type: 'documentation', source: HIG },
              { title: 'HIG — Alerts', url: 'https://developer.apple.com/design/human-interface-guidelines/alerts', type: 'documentation', source: HIG },
            ],
          },
        ],
      },
      {
        id: 'w3s5',
        title: 'Design System e consistência',
        description: 'Decidir uma vez, aplicar muitas.',
        substeps: [
          {
            id: 'w3s5a',
            title: 'O que é um design system',
            description:
              'Mais que uma biblioteca de componentes: princípios, tokens, padrões e a documentação que mantém tudo coerente.',
            difficulty: 2,
            resources: [
              { title: 'Design Systems 101', url: 'https://www.nngroup.com/articles/design-systems-101/', type: 'article', source: NNG },
              { title: 'Design Systems — visão geral', url: 'https://ixdf.org/literature/topics/design-systems', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w3s5b',
            title: 'Tokens e reuso',
            description:
              'Cor, espaçamento e tipografia viram variáveis nomeadas. É o que permite mudar um valor e ver o produto inteiro acompanhar.',
            difficulty: 3,
            resources: [
              { title: 'Design Systems 101', url: 'https://www.nngroup.com/articles/design-systems-101/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w3s5c',
            title: 'Consistência interna e externa',
            description:
              'Interna é ser coerente consigo mesmo; externa é respeitar as convenções da plataforma. Ambas contam.',
            difficulty: 2,
            resources: [
              { title: 'Visual Design Principles', url: 'https://www.nngroup.com/articles/principles-visual-design/', type: 'article', source: NNG },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── MUNDO 4 ───────────────────────────
  {
    id: 'w4',
    title: 'Princípios de Gestalt',
    shortTitle: 'Gestalt',
    description:
      'Como o cérebro agrupa o que vê antes de você pensar a respeito. Citado nominalmente no conteúdo programático.',
    icon: 'eye',
    color: 'gestalt',
    tagline: 'O todo é diferente da soma das partes.',
    steps: [
      {
        id: 'w4s1',
        title: 'Teoria e figura-fundo',
        description: 'De onde vem a Gestalt e o que ela afirma.',
        substeps: [
          {
            id: 'w4s1a',
            title: 'Origem e princípio geral',
            description:
              'Escola de psicologia alemã do início do século XX: a percepção organiza estímulos em conjuntos, e o todo é diferente da soma das partes.',
            difficulty: 1,
            resources: [
              { title: 'Psicologia da Gestalt', url: 'https://pt.wikipedia.org/wiki/Psicologia_da_Gestalt', type: 'article', source: 'Wikipédia' },
              { title: 'Gestalt Principles — visão geral', url: 'https://ixdf.org/literature/topics/gestalt-principles', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w4s1b',
            title: 'Figura e fundo',
            description:
              'A percepção separa automaticamente o objeto de interesse do plano de fundo. Ambiguidade entre os dois gera desconforto e hesitação.',
            difficulty: 2,
            resources: [
              { title: 'Gestalt Principles — figura-fundo', url: 'https://ixdf.org/literature/topics/gestalt-principles', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w4s1c',
            title: 'Pregnância (boa forma)',
            description:
              'A lei mais geral: percebemos a organização mais simples, estável e regular possível diante de um estímulo ambíguo.',
            difficulty: 3,
            resources: [
              { title: 'Psicologia da Gestalt — lei da pregnância', url: 'https://pt.wikipedia.org/wiki/Psicologia_da_Gestalt', type: 'article', source: 'Wikipédia' },
            ],
          },
        ],
      },
      {
        id: 'w4s2',
        title: 'Leis de agrupamento',
        description: 'As cinco que mais aparecem em prova.',
        substeps: [
          {
            id: 'w4s2a',
            title: 'Proximidade',
            description:
              'Elementos próximos são percebidos como um grupo. É o princípio mais forte de todos — vence até diferença de cor.',
            difficulty: 1,
            resources: [
              { title: 'Gestalt Principle of Proximity', url: 'https://www.nngroup.com/articles/gestalt-proximity/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w4s2b',
            title: 'Similaridade',
            description:
              'Elementos parecidos em cor, forma ou tamanho são lidos como pertencentes ao mesmo conjunto, mesmo separados no espaço.',
            difficulty: 1,
            resources: [
              { title: 'Gestalt Principle of Similarity', url: 'https://www.nngroup.com/articles/gestalt-similarity/', type: 'article', source: NNG },
              { title: 'The Law of Similarity', url: 'https://ixdf.org/literature/article/the-law-of-similarity-gestalt-principles-1', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w4s2c',
            title: 'Continuidade',
            description:
              'O olho segue linhas e curvas suaves. É por isso que alinhamento cria caminho de leitura sem precisar de setas.',
            difficulty: 2,
            resources: [
              { title: 'Gestalt Principles — continuidade', url: 'https://ixdf.org/literature/topics/gestalt-principles', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w4s2d',
            title: 'Fechamento',
            description:
              'A percepção completa formas incompletas. Logos e ícones minimalistas dependem inteiramente disso.',
            difficulty: 2,
            resources: [
              { title: 'Gestalt Principles — fechamento', url: 'https://ixdf.org/literature/topics/gestalt-principles', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w4s2e',
            title: 'Região comum',
            description:
              'Elementos dentro de uma mesma borda ou fundo são agrupados — e essa delimitação é forte o bastante para vencer a proximidade.',
            difficulty: 2,
            resources: [
              { title: 'The Principle of Common Region', url: 'https://www.nngroup.com/articles/common-region/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w4s3',
        title: 'Gestalt aplicada à interface',
        description: 'Sair da teoria e ler uma tela.',
        substeps: [
          {
            id: 'w4s3a',
            title: 'Agrupamento em formulários e listas',
            description:
              'Espaçamento entre grupos maior que o espaçamento interno. É a aplicação mais direta de proximidade que existe.',
            difficulty: 2,
            resources: [
              { title: 'Gestalt Principle of Proximity', url: 'https://www.nngroup.com/articles/gestalt-proximity/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w4s3b',
            title: 'Cards, bordas e separadores',
            description:
              'Quando usar região comum e quando espaço em branco basta. Card sem necessidade é ruído visual.',
            difficulty: 2,
            resources: [
              { title: 'The Principle of Common Region', url: 'https://www.nngroup.com/articles/common-region/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w4s3c',
            title: 'Gestalt dentro dos princípios de design visual',
            description:
              'Escala, hierarquia, equilíbrio, contraste e Gestalt trabalham juntos — é assim que se critica uma tela objetivamente.',
            difficulty: 3,
            resources: [
              { title: 'Visual Design Principles', url: 'https://www.nngroup.com/articles/principles-visual-design/', type: 'article', source: NNG },
              { title: 'Good Visual Design, Explained', url: 'https://www.nngroup.com/articles/good-visual-design/', type: 'article', source: NNG },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── MUNDO 5 ───────────────────────────
  {
    id: 'w5',
    title: 'Mundo de Nielsen',
    shortTitle: 'Nielsen',
    description:
      'As 10 heurísticas de usabilidade de Jakob Nielsen, na ordem oficial. Citadas nominalmente no edital.',
    icon: 'brain',
    color: 'nielsen',
    tagline: 'Você entrou no território onde interfaces revelam seus segredos.',
    steps: [
      {
        id: 'w5s1',
        title: 'Heurísticas 1 a 3',
        description: 'Status, linguagem e liberdade.',
        substeps: [
          {
            id: 'w5s1a',
            title: '1 · Visibilidade do status do sistema',
            description:
              'O sistema mantém a pessoa informada sobre o que está acontecendo, com feedback apropriado e em tempo razoável.',
            difficulty: 1,
            resources: [
              { title: 'Visibility of System Status', url: 'https://www.nngroup.com/articles/visibility-system-status/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s1b',
            title: '2 · Correspondência entre o sistema e o mundo real',
            description:
              'Falar a linguagem do usuário, com palavras e conceitos familiares, seguindo convenções do mundo real em ordem natural e lógica.',
            difficulty: 1,
            resources: [
              { title: 'Match Between the System and the Real World', url: 'https://www.nngroup.com/articles/match-system-real-world/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s1c',
            title: '3 · Controle e liberdade do usuário',
            description:
              'Saídas de emergência claras: desfazer, refazer e cancelar quando a pessoa escolhe uma ação por engano.',
            difficulty: 1,
            resources: [
              { title: 'User Control and Freedom', url: 'https://www.nngroup.com/articles/user-control-and-freedom/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w5s2',
        title: 'Heurísticas 4 a 6',
        description: 'Padrões, prevenção e memória.',
        substeps: [
          {
            id: 'w5s2a',
            title: '4 · Consistência e padrões',
            description:
              'Palavras, situações e ações diferentes não devem significar a mesma coisa. Siga as convenções da plataforma.',
            difficulty: 1,
            resources: [
              { title: 'Consistency and Standards', url: 'https://www.nngroup.com/articles/consistency-and-standards/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s2b',
            title: '5 · Prevenção de erros',
            description:
              'Melhor que uma boa mensagem de erro é um design que impede o erro de acontecer — eliminando condições propensas a falha ou confirmando antes de agir.',
            difficulty: 2,
            resources: [
              { title: 'Preventing User Errors', url: 'https://www.nngroup.com/articles/error-prevention/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s2c',
            title: '6 · Reconhecimento em vez de memorização',
            description:
              'Deixe elementos, ações e opções visíveis. A pessoa não deveria precisar lembrar informação de uma tela para outra.',
            difficulty: 2,
            resources: [
              { title: 'Recognition vs. Recall in UX', url: 'https://www.nngroup.com/articles/recognition-and-recall/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w5s3',
        title: 'Heurísticas 7 a 10',
        description: 'Eficiência, estética, erros e ajuda.',
        substeps: [
          {
            id: 'w5s3a',
            title: '7 · Flexibilidade e eficiência de uso',
            description:
              'Aceleradores invisíveis para o iniciante que agilizam o usuário experiente, e possibilidade de personalizar ações frequentes.',
            difficulty: 2,
            resources: [
              { title: 'Flexibility and Efficiency of Use', url: 'https://www.nngroup.com/articles/flexibility-efficiency-heuristic/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s3b',
            title: '8 · Design estético e minimalista',
            description:
              'Interfaces não devem conter informação irrelevante ou raramente necessária — cada unidade extra compete com a informação relevante.',
            difficulty: 2,
            resources: [
              { title: 'Aesthetic and Minimalist Design', url: 'https://www.nngroup.com/articles/aesthetic-minimalist-design/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s3c',
            title: '9 · Ajudar a reconhecer, diagnosticar e recuperar-se de erros',
            description:
              'Mensagens em linguagem simples, que indicam o problema com precisão e sugerem uma solução — sem códigos crus.',
            difficulty: 2,
            resources: [
              { title: 'Error Message Guidelines', url: 'https://www.nngroup.com/articles/error-message-guidelines/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s3d',
            title: '10 · Ajuda e documentação',
            description:
              'O ideal é dispensar documentação, mas quando ela existe deve ser fácil de buscar, focada na tarefa e concreta.',
            difficulty: 1,
            resources: [
              { title: 'Help and Documentation', url: 'https://www.nngroup.com/articles/help-and-documentation/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w5s4',
        title: 'Avaliação heurística na prática',
        description: 'Usar as 10 como instrumento, não como decoreba.',
        substeps: [
          {
            id: 'w5s4a',
            title: 'As 10 heurísticas em conjunto',
            description:
              'Revise a lista completa e a ordem oficial. Saber qual heurística um problema viola é a pergunta típica de prova.',
            difficulty: 1,
            resources: [
              { title: '10 Usability Heuristics for User Interface Design', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s4b',
            title: 'Como conduzir uma avaliação heurística',
            description:
              'Vários avaliadores percorrem a interface de forma independente e só depois consolidam os achados.',
            difficulty: 3,
            resources: [
              { title: 'How to Conduct a Heuristic Evaluation', url: 'https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w5s4c',
            title: 'Classificar severidade',
            description:
              'Frequência, impacto e persistência definem a nota de severidade — é ela que determina o que consertar primeiro.',
            difficulty: 3,
            resources: [
              { title: 'Severity Ratings for Usability Problems', url: 'https://www.nngroup.com/articles/how-to-rate-the-severity-of-usability-problems/', type: 'article', source: NNG },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── MUNDO 6 ───────────────────────────
  {
    id: 'w6',
    title: 'Acessibilidade',
    shortTitle: 'Acessibilidade',
    description:
      'Projetar para que todas as pessoas consigam usar. Citada nominalmente no conteúdo programático.',
    icon: 'accessibility',
    color: 'a11y',
    tagline: 'Acessibilidade não é um recurso extra. É a régua.',
    steps: [
      {
        id: 'w6s1',
        title: 'Fundamentos e design inclusivo',
        description: 'Por que isso existe e para quem.',
        substeps: [
          {
            id: 'w6s1a',
            title: 'O que é acessibilidade digital',
            description:
              'Produtos projetados para que pessoas com deficiência possam perceber, entender, navegar e interagir.',
            difficulty: 1,
            resources: [
              { title: 'Introduction to Web Accessibility', url: 'https://www.w3.org/WAI/fundamentals/accessibility-intro/', type: 'documentation', source: W3C },
            ],
          },
          {
            id: 'w6s1b',
            title: 'Tipos de deficiência e barreiras',
            description:
              'Visual, auditiva, motora, cognitiva — permanentes, temporárias ou situacionais. A deficiência situacional atinge todo mundo.',
            difficulty: 2,
            resources: [
              { title: 'Acessibilidade — visão geral', url: 'https://ixdf.org/literature/topics/accessibility', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w6s1c',
            title: 'Design inclusivo',
            description:
              'Projetar considerando a diversidade desde o início custa menos e beneficia mais gente do que adaptar depois.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Inclusion', url: 'https://developer.apple.com/design/human-interface-guidelines/inclusion', type: 'documentation', source: HIG },
            ],
          },
        ],
      },
      {
        id: 'w6s2',
        title: 'WCAG e os princípios POUR',
        description: 'O padrão internacional e seus quatro pilares.',
        substeps: [
          {
            id: 'w6s2a',
            title: 'O que é o WCAG',
            description:
              'As Web Content Accessibility Guidelines do W3C, organizadas em princípios, diretrizes e critérios de sucesso.',
            difficulty: 1,
            resources: [
              { title: 'WCAG 2 Overview', url: 'https://www.w3.org/WAI/standards-guidelines/wcag/', type: 'documentation', source: W3C },
            ],
          },
          {
            id: 'w6s2b',
            title: 'POUR: Perceptível, Operável, Compreensível, Robusto',
            description:
              'Os quatro princípios que organizam todo o WCAG. Saber o que cada um cobre é o item mais previsível da prova.',
            difficulty: 2,
            resources: [
              { title: 'Accessibility Principles', url: 'https://www.w3.org/WAI/fundamentals/accessibility-principles/', type: 'documentation', source: W3C },
            ],
          },
          {
            id: 'w6s2c',
            title: 'Níveis A, AA e AAA',
            description:
              'Três níveis de conformidade. AA é o alvo prático adotado pela maioria das legislações e políticas.',
            difficulty: 2,
            resources: [
              { title: 'How to Meet WCAG (Quick Reference)', url: 'https://www.w3.org/WAI/WCAG22/quickref/', type: 'documentation', source: W3C },
            ],
          },
          {
            id: 'w6s2d',
            title: 'Contraste mínimo na prática',
            description:
              '4.5:1 para texto normal, 3:1 para texto grande (18pt, ou 14pt em negrito). Decore esses números.',
            difficulty: 3,
            resources: [
              { title: 'WCAG 2.2 — Contrast (Minimum)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html', type: 'documentation', source: W3C },
            ],
          },
        ],
      },
      {
        id: 'w6s3',
        title: 'Acessibilidade na Apple',
        description: 'Como o ecossistema iOS trata o assunto.',
        substeps: [
          {
            id: 'w6s3a',
            title: 'Diretrizes de acessibilidade do HIG',
            description:
              'O que a Apple exige e recomenda: rótulos, ordem de foco, alvos de toque, alternativas a gestos complexos.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Accessibility', url: 'https://developer.apple.com/design/human-interface-guidelines/accessibility', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w6s3b',
            title: 'VoiceOver e tecnologias assistivas',
            description:
              'O leitor de tela do iOS. Se o elemento não tem rótulo, ele simplesmente não existe para quem usa VoiceOver.',
            difficulty: 2,
            resources: [
              { title: 'Accessibility — Apple Developer', url: 'https://developer.apple.com/documentation/accessibility', type: 'documentation', source: 'Apple Developer' },
            ],
          },
          {
            id: 'w6s3c',
            title: 'Dynamic Type e alvos de toque',
            description:
              'Texto que escala com a preferência do sistema e áreas tocáveis grandes o suficiente para uso confortável.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Layout (alvos de toque)', url: 'https://developer.apple.com/design/human-interface-guidelines/layout', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w6s3d',
            title: 'Reduce Motion e preferências de movimento',
            description:
              'Animação pode causar desconforto vestibular. O sistema expõe essa preferência e a interface precisa respeitá-la.',
            difficulty: 3,
            resources: [
              { title: 'HIG — Motion', url: 'https://developer.apple.com/design/human-interface-guidelines/motion', type: 'documentation', source: HIG },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── MUNDO 7 ───────────────────────────
  {
    id: 'w7',
    title: 'Layout no Design de Interfaces',
    shortTitle: 'Layout',
    description:
      'Grid, espaço e hierarquia — como o conteúdo se organiza na tela. Citado nominalmente no edital.',
    icon: 'ruler',
    color: 'layout',
    tagline: 'Antes de decorar, organize.',
    steps: [
      {
        id: 'w7s1',
        title: 'Grid e alinhamento',
        description: 'A estrutura invisível por trás de toda tela que parece certa.',
        substeps: [
          {
            id: 'w7s1a',
            title: 'Colunas, calhas e margens',
            description:
              'Os três componentes de qualquer grid de página. Definir os três é o que torna o layout reprodutível.',
            difficulty: 1,
            resources: [
              { title: 'Grids 101', url: 'https://www.nngroup.com/videos/grids-101/', type: 'video', source: NNG },
              { title: 'Grid Systems — visão geral', url: 'https://ixdf.org/literature/topics/grid-systems', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w7s1b',
            title: 'Alinhamento e eixos',
            description:
              'Alinhamentos consistentes criam linhas invisíveis que o olho segue. Cada eixo novo cobra um preço de atenção.',
            difficulty: 2,
            resources: [
              { title: 'Good Visual Design, Explained', url: 'https://www.nngroup.com/articles/good-visual-design/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w7s1c',
            title: 'Sistema de espaçamento (grid de 8pt)',
            description:
              'Espaçamentos múltiplos de um valor base tornam decisões rápidas e o resultado coerente entre telas.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Layout', url: 'https://developer.apple.com/design/human-interface-guidelines/layout', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w7s1d',
            title: 'Proximidade e agrupamento no layout',
            description:
              'É a Gestalt operando dentro do grid: o espaço entre blocos comunica relação antes de qualquer borda.',
            difficulty: 2,
            resources: [
              { title: 'Gestalt Principle of Proximity', url: 'https://www.nngroup.com/articles/gestalt-proximity/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w7s2',
        title: 'Hierarquia visual e espaço',
        description: 'Dizer o que importa sem escrever "importante".',
        substeps: [
          {
            id: 'w7s2a',
            title: 'O que é hierarquia visual',
            description:
              'A ordem em que o olho percorre a tela, construída com tamanho, peso, cor, posição e espaço.',
            difficulty: 1,
            resources: [
              { title: 'Visual Hierarchy', url: 'https://www.nngroup.com/articles/visual-hierarchy-ux-definition/', type: 'article', source: NNG },
              { title: 'Hierarquia visual — visão geral', url: 'https://ixdf.org/literature/topics/visual-hierarchy', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w7s2b',
            title: 'Escala, contraste e equilíbrio',
            description:
              'Os princípios de design visual que sustentam a hierarquia. Se tudo tem destaque, nada tem.',
            difficulty: 2,
            resources: [
              { title: 'Visual Design Principles', url: 'https://www.nngroup.com/articles/principles-visual-design/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w7s2c',
            title: 'Espaço em branco',
            description:
              'Espaço vazio não é desperdício: é o que agrupa, separa e dá respiro à leitura.',
            difficulty: 2,
            resources: [
              { title: 'Visual Design: Glossary', url: 'https://www.nngroup.com/articles/visual-design-cheat-sheet/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w7s2d',
            title: 'Padrões de varredura',
            description:
              'Leitura em F e em Z descrevem como as pessoas varrem uma página antes de decidir se vão ler.',
            difficulty: 3,
            resources: [
              { title: 'Visual Hierarchy', url: 'https://www.nngroup.com/articles/visual-hierarchy-ux-definition/', type: 'article', source: NNG },
            ],
          },
        ],
      },
      {
        id: 'w7s3',
        title: 'Layout adaptativo no iOS',
        description: 'A mesma interface em muitas telas.',
        substeps: [
          {
            id: 'w7s3a',
            title: 'Safe areas e margens de leiaute',
            description:
              'Notch, Dynamic Island, indicador de home. Conteúdo importante nunca deve encostar nessas regiões.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Layout', url: 'https://developer.apple.com/design/human-interface-guidelines/layout', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w7s3b',
            title: 'Tamanhos de tela e orientação',
            description:
              'O layout precisa funcionar do iPhone menor ao iPad em paisagem, sem simplesmente esticar.',
            difficulty: 2,
            resources: [
              { title: 'HIG — Designing for iOS', url: 'https://developer.apple.com/design/human-interface-guidelines/designing-for-ios', type: 'documentation', source: HIG },
            ],
          },
          {
            id: 'w7s3c',
            title: 'Materiais, camadas e profundidade',
            description:
              'Como a Apple usa translucidez e camadas para comunicar hierarquia sem adicionar bordas.',
            difficulty: 3,
            resources: [
              { title: 'HIG — Materials', url: 'https://developer.apple.com/design/human-interface-guidelines/materials', type: 'documentation', source: HIG },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── MUNDO 8 ───────────────────────────
  {
    id: 'w8',
    title: 'Lógica e Resolução de Problemas',
    shortTitle: 'Lógica',
    description:
      'O edital lista "lógica" no conteúdo programático e cita lógica e resolução de problemas entre os critérios de avaliação.',
    icon: 'puzzle',
    color: 'logic',
    tagline: 'A parte da prova que não perdoa chute.',
    steps: [
      {
        id: 'w8s1',
        title: 'Lógica proposicional',
        description: 'A base formal.',
        substeps: [
          {
            id: 'w8s1a',
            title: 'Proposições e valor-verdade',
            description:
              'Uma proposição é uma sentença declarativa que só pode ser verdadeira ou falsa — nunca ambas, nunca nenhuma.',
            difficulty: 1,
            resources: [
              { title: 'Lógica proposicional', url: 'https://pt.wikipedia.org/wiki/L%C3%B3gica_proposicional', type: 'article', source: 'Wikipédia' },
              { title: 'Lógica matemática', url: 'https://mundoeducacao.uol.com.br/matematica/logica-matematica.htm', type: 'article', source: 'Mundo Educação' },
            ],
          },
          {
            id: 'w8s1b',
            title: 'Conectivos lógicos',
            description:
              'Negação, conjunção, disjunção, condicional e bicondicional — com seus símbolos e leituras em português.',
            difficulty: 2,
            resources: [
              { title: 'Lógica matemática — conectivos', url: 'https://www.todamateria.com.br/logica-matematica/', type: 'article', source: 'Toda Matéria' },
            ],
          },
          {
            id: 'w8s1c',
            title: 'Tabelas-verdade',
            description:
              'Montar a tabela é o método infalível quando a intuição falha. 2ⁿ linhas para n proposições.',
            difficulty: 2,
            resources: [
              { title: 'Tabela verdade', url: 'https://pt.wikipedia.org/wiki/Tabela_verdade', type: 'article', source: 'Wikipédia' },
            ],
          },
          {
            id: 'w8s1d',
            title: 'Equivalências e negações',
            description:
              'Leis de De Morgan e a negação do condicional. A negação de "se P então Q" é "P e não Q" — o erro mais comum em prova.',
            difficulty: 3,
            resources: [
              { title: 'Lógica proposicional — equivalências', url: 'https://pt.wikipedia.org/wiki/L%C3%B3gica_proposicional', type: 'article', source: 'Wikipédia' },
            ],
          },
        ],
      },
      {
        id: 'w8s2',
        title: 'Raciocínio e sequências',
        description: 'Lógica sem fórmula.',
        substeps: [
          {
            id: 'w8s2a',
            title: 'Dedução, indução e abdução',
            description:
              'Do geral ao particular, do particular ao geral, e do efeito à hipótese mais provável. Design usa os três.',
            difficulty: 2,
            resources: [
              { title: 'Silogismo', url: 'https://pt.wikipedia.org/wiki/Silogismo', type: 'article', source: 'Wikipédia' },
            ],
          },
          {
            id: 'w8s2b',
            title: 'Silogismos e validade',
            description:
              'Um argumento pode ser válido e mesmo assim ter conclusão falsa. Validade é sobre a forma, não sobre o conteúdo.',
            difficulty: 3,
            resources: [
              { title: 'Silogismo', url: 'https://pt.wikipedia.org/wiki/Silogismo', type: 'article', source: 'Wikipédia' },
            ],
          },
          {
            id: 'w8s2c',
            title: 'Sequências e padrões',
            description:
              'Sequências numéricas, alfabéticas e de figuras — o formato clássico de questão de peso 2 e 3.',
            difficulty: 2,
            resources: [
              { title: 'Lógica matemática', url: 'https://mundoeducacao.uol.com.br/matematica/logica-matematica.htm', type: 'article', source: 'Mundo Educação' },
            ],
          },
        ],
      },
      {
        id: 'w8s3',
        title: 'Resolução aplicada',
        description: 'Estratégia de prova.',
        substeps: [
          {
            id: 'w8s3a',
            title: 'Estratégias de resolução',
            description:
              'Decompor, testar casos extremos, eliminar alternativas, trabalhar de trás para frente.',
            difficulty: 2,
            resources: [
              { title: 'Lógica matemática', url: 'https://www.todamateria.com.br/logica-matematica/', type: 'article', source: 'Toda Matéria' },
            ],
          },
          {
            id: 'w8s3b',
            title: 'Gestão de tempo com pesos 1, 2 e 3',
            description:
              'A prova identifica o peso no enunciado de cada questão. Garanta os pesos 3 antes de gastar tempo em peso 1.',
            difficulty: 1,
            resources: [],
          },
          {
            id: 'w8s3c',
            title: 'Lógica aplicada a problemas de design',
            description:
              'Fluxos condicionais, estados de tela e regras de negócio são lógica proposicional com outra roupa.',
            difficulty: 3,
            resources: [
              { title: 'Preventing User Errors', url: 'https://www.nngroup.com/articles/error-prevention/', type: 'article', source: NNG },
            ],
          },
        ],
      },
    ],
  },

  // ─────────────────────────── MUNDO 9 ───────────────────────────
  {
    id: 'w9',
    title: 'Desafio Final — Prova de Design',
    shortTitle: 'Prova',
    description:
      'Segunda fase do processo seletivo. Tudo o que você percorreu converge aqui.',
    icon: 'apple',
    color: 'final',
    tagline: 'Você chegou até aqui. Agora é revisar e provar.',
    requiresAll: true,
    steps: [
      {
        id: 'w9s1',
        title: 'Formato da prova',
        description: 'Os dados oficiais, direto do Edital nº 01/2026.',
        substeps: [
          {
            id: 'w9s1a',
            title: 'Estrutura e pontuação',
            description:
              'Múltipla escolha, 30 questões, 60 pontos no total, duração máxima de três horas. Três níveis de dificuldade valendo pesos 1, 2 e 3, identificados no caput de cada questão.',
            difficulty: 1,
            resources: [],
          },
          {
            id: 'w9s1b',
            title: 'Data, local e regras',
            description:
              'Dia 23/09/2026, no Campus da UCB em Taguatinga. Chegue com pelo menos 30 minutos de antecedência: atrasados não fazem a prova. Documento oficial com foto é obrigatório e nenhum aparelho eletrônico é permitido.',
            difficulty: 1,
            resources: [
              { title: 'Academy UCB — site oficial', url: 'https://academy.ucb.br/', type: 'documentation', source: 'Apple Developer Academy UCB' },
            ],
          },
          {
            id: 'w9s1c',
            title: 'Critérios de avaliação',
            description:
              'O edital declara três: lógica, resolução de problemas e fundamentos técnicos. Passam para a terceira fase as 40 melhores notas da área de Design.',
            difficulty: 1,
            resources: [],
          },
        ],
      },
      {
        id: 'w9s2',
        title: 'Revisão geral',
        description: 'Passe os olhos em tudo antes do dia.',
        substeps: [
          {
            id: 'w9s2a',
            title: 'Revisar as 10 heurísticas',
            description:
              'Consegue citar as dez na ordem e dar um exemplo de violação para cada? Esse é o teste.',
            difficulty: 2,
            resources: [
              { title: '10 Usability Heuristics', url: 'https://www.nngroup.com/articles/ten-usability-heuristics/', type: 'article', source: NNG },
            ],
          },
          {
            id: 'w9s2b',
            title: 'Revisar Gestalt e layout',
            description:
              'Leis de agrupamento, figura-fundo, hierarquia visual, grid e espaçamento em uma passada só.',
            difficulty: 2,
            resources: [
              { title: 'Visual Design Principles', url: 'https://www.nngroup.com/articles/principles-visual-design/', type: 'article', source: NNG },
              { title: 'Gestalt Principles', url: 'https://ixdf.org/literature/topics/gestalt-principles', type: 'article', source: IXDF },
            ],
          },
          {
            id: 'w9s2c',
            title: 'Revisar acessibilidade e trilhas',
            description:
              'POUR, níveis de conformidade, contraste mínimo, e as três trilhas obrigatórias: CBL, Design Thinking e UI Design.',
            difficulty: 2,
            resources: [
              { title: 'Accessibility Principles', url: 'https://www.w3.org/WAI/fundamentals/accessibility-principles/', type: 'documentation', source: W3C },
            ],
          },
        ],
      },
      {
        id: 'w9s3',
        title: 'Simulado',
        description: 'Vinte questões no formato do edital.',
        substeps: [
          {
            id: 'w9s3a',
            title: 'Fazer o simulado',
            description:
              'Questões de múltipla escolha com pesos 1, 2 e 3, cobrindo todos os mundos. Marque como concluído depois de fazer pelo menos uma vez.',
            difficulty: 3,
            resources: [],
          },
        ],
      },
    ],
  },
]
