import type { Product } from '@/types'
import { ProductTile } from '@/components/inventory/ProductTile'

interface ProductGridProps {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((p) => (
        <ProductTile key={p.id} {...p} />
      ))}
    </div>
  )
}
