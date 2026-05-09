import type { ButtonHTMLAttributes } from 'react'

interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean
}

export function Chip({ active, children, className = '', ...rest }: ChipProps) {
  return (
    <button
      type="button"
      className={`rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide transition ${
        active
          ? 'bg-amber-400/20 text-amber-100 ring-1 ring-amber-400/35'
          : 'bg-white/[0.05] text-neutral-400 ring-1 ring-transparent hover:text-neutral-200'
      } ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
