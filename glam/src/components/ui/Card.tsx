import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padded?: boolean
}

export function Card({ children, className = '', padded = true }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/5 bg-white/[0.03] shadow-card backdrop-blur-sm ${padded ? 'p-4' : ''} ${className}`}
    >
      {children}
    </div>
  )
}
