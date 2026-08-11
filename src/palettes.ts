/**
 * Uma paleta por mundo, toda dentro da família pastel do DESIGN.md — os mundos se
 * diferenciam pelo matiz, não pela saturação, para que a jornada não pareça nove
 * produtos diferentes.
 *
 * `accent`  → texto/preenchimento forte; usado sobre `container` e sobre branco.
 * `container` → fundo pastel do mundo.
 * `ink` → texto sobre `container`.
 * `deep` → sombra sólida dos botões squishy.
 *
 * Todos os pares foram verificados acima de 4.5:1 (ver scripts de QA). Ao trocar
 * qualquer valor, rode a checagem de contraste de novo.
 */
export type Palette = {
  accent: string
  container: string
  soft: string
  ink: string
  deep: string
  glow: string
}

export const worldPalettes: Record<string, Palette> = {
  // Menta — "Candy Forest" do DESIGN.md
  cbl: {
    accent: '#2c6e2a',
    container: '#d6f5cf',
    soft: '#edfbea',
    ink: '#174915',
    deep: '#1d4d1b',
    glow: 'rgba(44,110,42,0.20)',
  },
  // Mel
  dt: {
    accent: '#8a5a0b',
    container: '#ffe9b8',
    soft: '#fff7e4',
    ink: '#5c3c05',
    deep: '#5f3d06',
    glow: 'rgba(138,90,11,0.20)',
  },
  // Cherry blossom — o primary do sistema
  ui: {
    accent: '#a2465f',
    container: '#ffd1dc',
    soft: '#fff0f4',
    ink: '#732f43',
    deep: '#7a3247',
    glow: 'rgba(162,70,95,0.20)',
  },
  // Lavanda
  gestalt: {
    accent: '#5b4bb5',
    container: '#e1ddfb',
    soft: '#f2f0fe',
    ink: '#3d3287',
    deep: '#413490',
    glow: 'rgba(91,75,181,0.20)',
  },
  // Ameixa profunda — "Crystal Kingdom", a identidade especial do Mundo de Nielsen
  nielsen: {
    accent: '#36275d',
    container: '#ded5f5',
    soft: '#f1edfc',
    ink: '#241748',
    deep: '#241748',
    glow: 'rgba(54,39,93,0.26)',
  },
  // Turquesa
  a11y: {
    accent: '#1c6b6b',
    container: '#cdeeee',
    soft: '#e9f8f8',
    ink: '#0f4a4a',
    deep: '#134f4f',
    glow: 'rgba(28,107,107,0.20)',
  },
  // Pêssego
  layout: {
    accent: '#a2513a',
    container: '#ffdfd3',
    soft: '#fff2ec',
    ink: '#763424',
    deep: '#7c3826',
    glow: 'rgba(162,81,58,0.20)',
  },
  // Azul-ardósia
  logic: {
    accent: '#4a5578',
    container: '#dde1f2',
    soft: '#eff1f9',
    ink: '#333c5c',
    deep: '#333c5c',
    glow: 'rgba(74,85,120,0.20)',
  },
  // Rosa profundo — o objetivo final
  final: {
    accent: '#7a5761',
    container: '#ffe0e8',
    soft: '#fff4f7',
    ink: '#5e3e47',
    deep: '#5e3e47',
    glow: 'rgba(122,87,97,0.24)',
  },
}

export const paletteFor = (color: string): Palette => worldPalettes[color] ?? worldPalettes.final
