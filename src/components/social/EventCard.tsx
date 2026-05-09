import type { SocialEvent } from '@/types'

export function EventCard({ event }: { event: SocialEvent }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] shadow-card">
      <div className="relative aspect-[16/9]">
        <img src={event.coverUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 space-y-1 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-amber-100/85">{event.when}</p>
          <h3 className="text-lg font-semibold leading-tight text-neutral-50">{event.title}</h3>
          <p className="text-xs text-neutral-300">{event.theme}</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-4 py-3 text-xs text-neutral-400">
        <span>
          Host <span className="font-semibold text-neutral-200">{event.host}</span>
        </span>
        <span>{event.attendees} attending</span>
      </div>
    </article>
  )
}
