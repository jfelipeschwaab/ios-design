import type { Resource, ResourceType } from '../types'
import { ExternalLink, RESOURCE_ICONS } from './icons'

const LABEL: Record<ResourceType, string> = {
  article: 'Artigo',
  video: 'Vídeo',
  documentation: 'Documentação',
  course: 'Curso',
}

export default function ResourceLink({ resource }: { resource: Resource }) {
  const Icon = RESOURCE_ICONS[resource.type]

  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${resource.title} — ${LABEL[resource.type]} em ${resource.source}. Abre em nova aba.`}
      className="group flex min-h-12 items-center gap-3 rounded-xl bg-low px-3 py-2 text-left transition hover:bg-container active:scale-[0.99]"
    >
      <Icon aria-hidden="true" className="size-[18px] shrink-0 text-ink-variant" strokeWidth={1.8} />
      <span className="min-w-0 flex-1">
        <span className="block truncate font-label text-[13px] font-bold text-ink">
          {resource.title}
        </span>
        <span className="block truncate text-[11.5px] text-ink-variant">
          {LABEL[resource.type]} · {resource.source}
        </span>
      </span>
      {/* Sinal visual de link externo, além do aria-label. */}
      <ExternalLink
        aria-hidden="true"
        className="size-4 shrink-0 text-ink-variant transition group-hover:text-ink"
        strokeWidth={1.9}
      />
    </a>
  )
}
