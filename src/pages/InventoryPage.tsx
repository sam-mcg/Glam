import { useNavigate } from 'react-router-dom'
import { mockProducts } from '@/data/mockProducts'
import { ProductGrid } from '@/components/inventory/ProductGrid'
import { TopBar } from '@/components/layout/TopBar'

export function InventoryPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col">
      <TopBar title="Inventory" showBack onBack={() => navigate(-1)} />
      <main className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Your vault</p>
          <h2 className="text-xl font-semibold text-neutral-50">{mockProducts.length} products</h2>
          <p className="mt-1 text-sm text-neutral-500">Scanned cosmetics ready for AI pairing.</p>
        </div>
        <ProductGrid products={mockProducts} />
      </main>
    </div>
  )
}
