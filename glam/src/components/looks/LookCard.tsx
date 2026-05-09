import { useNavigate } from 'react-router-dom'
import { Sparkle } from 'lucide-react'
import type { Look } from '@/types'
import { GhostButton } from '@/components/ui/GhostButton'

interface LookCardProps {
  look: Look
}

export function LookCard({ look }: LookCardProps) {
  const navigate = useNavigate()

  return (
    <article className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] shadow-card">
      <div className="relative aspect-[4/5]">
        <img src={look.imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
        <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-100 backdrop-blur-md">
          <Sparkle className="h-3 w-3" aria-hidden />
          {look.filter === 'customAi' ? 'Custom AI' : look.filter === 'trending' ? 'Trending' : 'My stash'}
        </div>
      </div>
      <div className="space-y-3 p-4">
        <div>
          <h3 className="text-base font-semibold text-neutral-50">{look.title}</h3>
          <p className="mt-1 text-sm text-neutral-400">{look.subtitle}</p>
        </div>
        <GhostButton
          className="w-full"
          onClick={() =>
            navigate('/try-on', {
              state: { lookId: look.id, title: look.title },
            })
          }
        >
          Preview on Me
        </GhostButton>
      </div>
    </article>
  )
}
