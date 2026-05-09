import type { ProductCategory } from '@/types'

const categoryLabel: Record<ProductCategory, string> = {
  lip: 'Lip',
  eye: 'Eye',
  face: 'Face',
  cheek: 'Cheek',
  brow: 'Brow',
  tool: 'Tool',
}

interface ProductTileProps {
  name: string
  brand: string
  category: ProductCategory
  imageUrl: string
}

export function ProductTile({ name, brand, category, imageUrl }: ProductTileProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-white/5 bg-white/[0.03] shadow-card">
      <div className="aspect-square overflow-hidden">
        <img src={imageUrl} alt="" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div className="space-y-1 p-3">
        <span className="inline-flex rounded-full bg-amber-400/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-100/90">
          {categoryLabel[category]}
        </span>
        <p className="text-sm font-semibold leading-snug text-neutral-50">{name}</p>
        <p className="text-xs text-neutral-500">{brand}</p>
      </div>
    </article>
  )
}
