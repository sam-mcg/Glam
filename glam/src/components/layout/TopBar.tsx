import { Link } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import type { ReactNode } from 'react'

interface TopBarProps {
  title?: string
  showBack?: boolean
  onBack?: () => void
  rightSlot?: ReactNode
}

export function TopBar({ title, showBack, onBack, rightSlot }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-2 border-b border-white/5 bg-neutral-950/80 px-4 py-3 pt-[calc(env(safe-area-inset-top,0px)+12px)] backdrop-blur-xl">
      <div className="flex min-w-[40px] items-center justify-start">
        {showBack ? (
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl p-2 text-neutral-300 transition hover:bg-white/5 hover:text-amber-100"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        ) : null}
      </div>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        {title ? <h1 className="text-sm font-semibold tracking-tight text-neutral-50">{title}</h1> : null}
      </div>
      <div className="flex min-w-[40px] justify-end">{rightSlot}</div>
    </header>
  )
}

export function ProfileAvatarLink({ src, alt }: { src: string; alt: string }) {
  return (
    <Link
      to="/profile"
      className="block overflow-hidden rounded-full ring-2 ring-amber-400/25 ring-offset-2 ring-offset-neutral-950"
      aria-label="Open profile"
    >
      <img src={src} alt={alt} className="h-9 w-9 object-cover" />
    </Link>
  )
}
