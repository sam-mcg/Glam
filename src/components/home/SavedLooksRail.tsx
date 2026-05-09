import { Link } from 'react-router-dom'
import type { SavedLook } from '@/types'

interface SavedLooksRailProps {
  looks: SavedLook[]
}

export function SavedLooksRail({ looks }: SavedLooksRailProps) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between px-1">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Saved looks</p>
          <h2 className="text-lg font-semibold text-neutral-50">Your glam lineup</h2>
        </div>
        <Link to="/looks" className="text-xs font-semibold text-amber-200/90 hover:text-amber-100">
          See all
        </Link>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {looks.map((look) => (
          <article
            key={look.id}
            className="min-w-[148px] max-w-[148px] overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] shadow-card"
          >
            <div className="relative aspect-[3/4]">
              <img src={look.imageUrl} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-3">
                <p className="text-sm font-semibold leading-tight text-neutral-50">{look.title}</p>
                <p className="text-[11px] text-amber-100/80">{look.mood}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
