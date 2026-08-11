---
name: Pastel Study Kingdom
colors:
  surface: '#fdf7ff'
  surface-dim: '#e1d3ff'
  surface-bright: '#fdf7ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f8f1ff'
  surface-container: '#f3eaff'
  surface-container-high: '#eee4ff'
  surface-container-highest: '#e9ddff'
  on-surface: '#201047'
  on-surface-variant: '#4f4446'
  inverse-surface: '#36275d'
  inverse-on-surface: '#f6eeff'
  outline: '#817476'
  outline-variant: '#d3c3c5'
  surface-tint: '#78555e'
  primary: '#78555e'
  on-primary: '#ffffff'
  primary-container: '#ffd1dc'
  on-primary-container: '#7a5761'
  inverse-primary: '#e7bbc6'
  secondary: '#5c5d6e'
  on-secondary: '#ffffff'
  secondary-container: '#e1e1f5'
  on-secondary-container: '#626374'
  tertiary: '#296c27'
  on-tertiary: '#ffffff'
  tertiary-container: '#a7ef9a'
  on-tertiary-container: '#2c6e2a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9e2'
  primary-fixed-dim: '#e7bbc6'
  on-primary-fixed: '#2d141c'
  on-primary-fixed-variant: '#5e3e47'
  secondary-fixed: '#e1e1f5'
  secondary-fixed-dim: '#c5c5d8'
  on-secondary-fixed: '#191b29'
  on-secondary-fixed-variant: '#444655'
  tertiary-fixed: '#acf59f'
  tertiary-fixed-dim: '#91d886'
  on-tertiary-fixed: '#002202'
  on-tertiary-fixed-variant: '#0b5311'
  background: '#fdf7ff'
  on-background: '#201047'
  surface-variant: '#e9ddff'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '500'
    lineHeight: '1.6'
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Quicksand
    fontSize: 14px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  container-padding: 32px
  gutter: 24px
  card-gap: 20px
---

## Brand & Style

The design system is centered around a **Modern Flat Illustration** aesthetic, specifically tailored for a gamified educational environment. It prioritizes a sense of "Kawaii" professionalism—combining the efficiency of a productivity tool with the emotional warmth of a collectible game.

The target audience is students who seek a comforting, low-stress environment for deep focus. The style utilizes soft, organic shapes and a "sticker-like" quality for UI elements. High-quality vector illustrations of candy forests and crystal formations serve as the backdrop for functional modules, creating a narrative journey through study sessions. The visual language should feel optimistic, nurturing, and rewarding.

## Colors

The palette is a curated selection of soft pastels designed to reduce eye strain during long study periods while maintaining a joyful atmosphere.

- **Primary (Cherry Blossom):** Used for main actions, progress highlights, and "Lanches" (snack) rewards.
- **Secondary (Soft Lavender):** Used for secondary navigation, "Crystal Kingdom" themed zones, and "Presentes" (gifts) iconography.
- **Tertiary (Fresh Mint):** Reserved for "Success" states, "Candy Forest" growth indicators, and "Roles" (tasks/milestones).
- **Neutral (Deep Plum):** A soft, non-black neutral used for typography to maintain high legibility without the harshness of pure black.
- **Surface:** The background is a warm, off-white "Milk" tint to ensure the pastels pop without vibration.

## Typography

This design system uses a trio of rounded, friendly sans-serifs to establish hierarchy. **Plus Jakarta Sans** provides a modern, slightly geometric structure for headlines. **Be Vietnam Pro** is used for body text due to its exceptional readability and contemporary feel. **Quicksand** is utilized for small labels and interactive elements to emphasize the "cute" and approachable nature of the app.

All type should be rendered with slightly increased line-height to maintain a "breathable" and airy layout. Avoid all-caps except for very small metadata labels.

## Layout & Spacing

The layout follows a **fluid grid** model with generous white space to prevent the gamification elements from feeling cluttered. 

- **Desktop:** A 12-column grid with 32px side margins. Modular "World" widgets should span 4 or 8 columns.
- **Tablet:** A 6-column grid with 24px margins. Elements stack into a single column for the "Focus Mode."
- **Mobile:** A 2-column grid with 16px margins. Primary navigation moves to a bottom "dock" style bar.

The spacing rhythm is based on an 8px scale. Use large internal padding (24px+) for cards to house vector illustrations comfortably alongside text data.

## Elevation & Depth

Depth is achieved through **Soft Ambient Shadows** and **Tonal Layering**. 

1. **The Base:** The lowest layer is the tinted background color.
2. **The Cards:** Interactive modules use a white background with a very soft, diffused shadow (Blur: 20px, Spread: 0, Opacity: 8%) tinted with the primary pink or secondary lilac color rather than grey.
3. **Floating Elements:** Rewards like "Presentes" or active "Lanches" use a double shadow—one small sharp shadow for "lift" and one large soft shadow for "glow."
4. **No Borders:** Avoid high-contrast outlines. Use subtle 1px inner strokes in a slightly darker shade of the surface color to define edges if necessary.

## Shapes

The shape language is consistently "bubbly" and organic. 

- **Standard Elements:** Use the `rounded` (0.5rem) setting for input fields and small buttons.
- **Feature Cards:** Use `rounded-xl` (1.5rem) to create a soft, friendly container for study worlds.
- **Avatars & Rewards:** Icons for "roles" and "presents" should always be contained within circles or super-ellipses (squircles) to maintain the "collectible sticker" aesthetic.

## Components

- **Buttons:** Primary buttons are "squishy"—they use the primary pink color with a 4px bottom "offset shadow" of a darker pink to look like a physical button. On press, they translate 2px down.
- **Chips:** Used for "Roles" (tags). These should be pill-shaped with light pastel backgrounds and dark neutral text.
- **Input Fields:** Thick 2px strokes in a very light lilac. On focus, the stroke changes to the primary pink and the internal background turns white.
- **Progress Bars:** Thick, rounded bars. The "Candy Forest" world uses a mint green bar that looks like a growing vine, while the "Crystal Kingdom" uses a lilac bar with a slight crystalline shimmer effect.
- **Study World Cards:** Large containers featuring a 2D flat illustration at the top, a headline, and a primary action button at the bottom.
- **Reward Modals:** When receiving "Presentes," use a full-screen backdrop blur (Glassmorphism) with a centered, bouncing illustration of the reward.