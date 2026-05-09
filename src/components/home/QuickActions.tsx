import { Link } from 'react-router-dom'
import { Boxes, ScanLine, Sparkles } from 'lucide-react'
import { Card } from '@/components/ui/Card'

const actions = [
  {
    to: '/inventory',
    label: 'Vault',
    sub: 'Inventory',
    icon: Boxes,
  },
  {
    to: '/scan',
    label: 'Scan',
    sub: 'Add product',
    icon: ScanLine,
  },
  {
    to: '/looks',
    label: 'Looks',
    sub: 'Explore',
    icon: Sparkles,
  },
] as const

export function QuickActions() {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Quick actions</p>
        <span className="text-[10px] text-neutral-500">Swipe-ready</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {actions.map(({ to, label, sub, icon: Icon }) => (
          <Link
            key={to}
            to={to}
            className="flex flex-col gap-2 rounded-xl bg-black/25 p-3 ring-1 ring-white/5 transition hover:ring-amber-400/25"
          >
            <Icon className="h-5 w-5 text-amber-200/90" strokeWidth={1.75} />
            <div>
              <p className="text-sm font-semibold text-neutral-50">{label}</p>
              <p className="text-[11px] text-neutral-500">{sub}</p>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  )
}
