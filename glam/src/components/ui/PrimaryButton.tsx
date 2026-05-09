import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export function PrimaryButton({ children, className = '', ...rest }: PrimaryButtonProps) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-300/90 to-amber-500/85 px-4 py-2.5 text-sm font-semibold text-neutral-950 shadow-lg shadow-amber-900/30 transition active:scale-[0.98] disabled:opacity-50 ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
