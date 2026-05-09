import { Outlet } from 'react-router-dom'
import { BottomNav } from '@/components/layout/BottomNav'

export function MobileShell() {
  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-[375px] flex-col shadow-[0_0_80px_rgba(0,0,0,0.65)]">
      <div className="flex flex-1 flex-col pb-[calc(env(safe-area-inset-bottom,0px)+72px)]">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  )
}
