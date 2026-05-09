import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function GhostButton({ children, className = '', ...rest }: GhostButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-neutral-100 transition hover:border-amber-400/25 hover:bg-white/[0.06] active:scale-[0.98] disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
