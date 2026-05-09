import { NavLink } from 'react-router-dom'
import { Camera, Home, ScanFace, Sparkles, Users } from 'lucide-react'

const tabs = [
  { to: '/', label: 'Home', icon: Home, end: true },
  { to: '/scan', label: 'Scan', icon: Camera, end: false },
  { to: '/looks', label: 'Looks', icon: Sparkles, end: false },
  { to: '/try-on', label: 'Try On', icon: ScanFace, end: false },
  { to: '/social', label: 'Social', icon: Users, end: false },
] as const

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-1/2 z-40 w-full max-w-[375px] -translate-x-1/2 border-t border-white/5 bg-neutral-950/90 pb-[calc(env(safe-area-inset-bottom,0px)+8px)] pt-2 backdrop-blur-xl"
      aria-label="Primary"
    >
      <ul className="flex items-center justify-between px-3">
        {tabs.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 rounded-xl py-1 text-[10px] font-semibold uppercase tracking-wide transition ${
                  isActive ? 'text-amber-200' : 'text-neutral-500 hover:text-neutral-300'
                }`
              }
            >
              <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              <span>{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
