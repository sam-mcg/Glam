import { useMemo, useState } from 'react'
import { mockLooks } from '@/data/mockLooks'
import type { LookFilterKey } from '@/types'
import { TopBar } from '@/components/layout/TopBar'
import { LooksFilterBar } from '@/components/looks/LooksFilterBar'
import { LookCard } from '@/components/looks/LookCard'
import { GenerateLookSection } from '@/components/looks/GenerateLookSection'
import { AskAiFab } from '@/components/looks/AskAiFab'

export function LooksPage() {
  const [filter, setFilter] = useState<LookFilterKey>('trending')

  const filtered = useMemo(() => mockLooks.filter((l) => l.filter === filter), [filter])

  return (
    <div className="flex flex-1 flex-col">
      <TopBar title="Looks" />
      <main className="relative flex flex-1 flex-col gap-5 px-4 pb-28 pt-2">
        <GenerateLookSection />
        <section className="space-y-3">
          <div className="px-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Gallery</p>
            <h2 className="text-lg font-semibold text-neutral-50">Curated & AI blends</h2>
          </div>
          <LooksFilterBar active={filter} onChange={setFilter} />
          <div className="space-y-4">
            {filtered.map((look) => (
              <LookCard key={look.id} look={look} />
            ))}
          </div>
        </section>
      </main>
      <AskAiFab />
    </div>
  )
}
