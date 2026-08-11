import {
  Accessibility,
  Apple,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Brain,
  CalendarDays,
  Check,
  ClipboardList,
  Eye,
  ExternalLink,
  FileText,
  GraduationCap,
  Lightbulb,
  Lock,
  Map,
  Palette,
  Play,
  PuzzleIcon,
  Ruler,
  Star,
  Target,
  TrendingUp,
  Video,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/**
 * Ícones do shadcn/ui — ou seja, lucide-react. Nenhum emoji na interface: os
 * traços uniformes casam com o "modern flat" do DESIGN.md e escalam com a cor
 * e o tamanho do texto ao redor.
 */

/** Ícone de cada mundo. A chave vem de `World.icon` em src/data/roadmap.ts. */
const WORLD_ICONS: Record<string, LucideIcon> = {
  target: Target,
  lightbulb: Lightbulb,
  palette: Palette,
  eye: Eye,
  brain: Brain,
  accessibility: Accessibility,
  ruler: Ruler,
  puzzle: PuzzleIcon,
  apple: Apple,
}

export const worldIcon = (key: string): LucideIcon => WORLD_ICONS[key] ?? Apple

/** Ícone de cada tipo de material de apoio. */
export const RESOURCE_ICONS = {
  article: BookOpen,
  video: Video,
  documentation: FileText,
  course: GraduationCap,
} as const

export {
  Apple,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ClipboardList,
  ExternalLink,
  Lock,
  Map,
  Play,
  Star,
  TrendingUp,
  X,
}
