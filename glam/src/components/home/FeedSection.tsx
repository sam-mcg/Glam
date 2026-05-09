import { Card } from '@/components/ui/Card'

const tips = [
  {
    title: 'Tonight’s palette',
    body: 'Velvet Cocoa Lip Oil pairs with Midnight Gala eyes — tap Looks to preview.',
  },
  {
    title: 'Skin checkpoint',
    body: 'Your Glass Skin Serum Foundation was scanned 3 days ago. Refresh shade match?',
  },
]

export function FeedSection() {
  return (
    <section className="space-y-3">
      <div className="px-1">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">For you</p>
        <h2 className="text-lg font-semibold text-neutral-50">Personalized feed</h2>
      </div>
      <div className="space-y-3">
        {tips.map((tip) => (
          <Card key={tip.title}>
            <p className="text-sm font-semibold text-neutral-50">{tip.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-neutral-400">{tip.body}</p>
          </Card>
        ))}
      </div>
    </section>
  )
}
