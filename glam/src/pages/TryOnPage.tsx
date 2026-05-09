import { useLocation, useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import { ArPlaceholder } from '@/components/tryon/ArPlaceholder'

interface TryOnLocationState {
  lookId?: string
  title?: string
}

export function TryOnPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as TryOnLocationState | undefined

  return (
    <div className="flex flex-1 flex-col">
      <TopBar title="Try On" showBack onBack={() => navigate(-1)} />
      <main className="flex flex-1 flex-col gap-4 px-4 pb-4 pt-2">
        {state?.title ? (
          <div className="rounded-2xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-50 ring-1 ring-amber-400/15">
            Trying on: <span className="font-semibold">{state.title}</span>
            {state.lookId ? (
              <span className="mt-1 block text-[11px] text-amber-100/75">Look ID · {state.lookId}</span>
            ) : null}
          </div>
        ) : (
          <p className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-neutral-400">
            Open a look and tap <span className="font-semibold text-neutral-200">Preview on Me</span> to bind AR context.
          </p>
        )}
        <ArPlaceholder />
      </main>
    </div>
  )
}
