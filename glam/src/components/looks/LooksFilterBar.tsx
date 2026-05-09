import { Chip } from '@/components/ui/Chip'
import type { LookFilterKey } from '@/types'

const filters: { key: LookFilterKey; label: string }[] = [
  { key: 'myProducts', label: 'My Products Only' },
  { key: 'trending', label: 'Trending' },
  { key: 'customAi', label: 'Custom AI' },
]

interface LooksFilterBarProps {
  active: LookFilterKey
  onChange: (key: LookFilterKey) => void
}

export function LooksFilterBar({ active, onChange }: LooksFilterBarProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {filters.map((f) => (
        <Chip key={f.key} active={active === f.key} onClick={() => onChange(f.key)}>
          {f.label}
        </Chip>
      ))}
    </div>
  )
}
