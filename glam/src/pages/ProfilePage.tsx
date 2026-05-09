import { Bell, ChevronRight, Crown, Lock, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { mockUser } from '@/data/mockUser'
import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'

const rows = [
  { icon: Bell, label: 'Notifications', hint: 'Mentions & event invites' },
  { icon: Lock, label: 'Privacy', hint: 'Vault visibility' },
  { icon: Sparkles, label: 'AI preferences', hint: 'Tone & safety profile' },
] as const

export function ProfilePage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col">
      <TopBar title="Profile" showBack onBack={() => navigate(-1)} />
      <main className="flex flex-1 flex-col gap-5 px-4 pb-4 pt-2">
        <Card className="flex items-center gap-4">
          <img src={mockUser.avatarUrl} alt="" className="h-16 w-16 rounded-2xl object-cover ring-1 ring-white/10" />
          <div className="min-w-0 flex-1">
            <p className="text-lg font-semibold text-neutral-50">{mockUser.displayName}</p>
            <p className="text-sm text-neutral-500">{mockUser.handle}</p>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">{mockUser.bio}</p>
          </div>
        </Card>

        <Card className="flex items-start gap-3 border-amber-400/25 bg-gradient-to-br from-amber-400/15 via-transparent to-transparent">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400/15 ring-1 ring-amber-400/30">
            <Crown className="h-6 w-6 text-amber-100" />
          </div>
          <div className="flex-1 space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-100/85">Subscription</p>
            <p className="text-lg font-semibold text-neutral-50">{mockUser.plan}</p>
            <p className="text-sm text-neutral-400">
              Unlimited AI previews • Priority renders • Social hosting beta.
            </p>
            <button
              type="button"
              className="mt-2 text-xs font-semibold text-amber-100 underline-offset-4 hover:underline"
            >
              Manage plan (stub)
            </button>
          </div>
        </Card>

        <section className="space-y-2">
          <p className="px-1 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Settings</p>
          {rows.map(({ icon: Icon, label, hint }) => (
            <button
              key={label}
              type="button"
              className="flex w-full items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-3 text-left transition hover:border-amber-400/25 hover:bg-white/[0.05]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/35 ring-1 ring-white/10">
                <Icon className="h-5 w-5 text-amber-100/90" strokeWidth={1.75} />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-semibold text-neutral-50">{label}</span>
                <span className="block text-xs text-neutral-500">{hint}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-neutral-600" />
            </button>
          ))}
        </section>

        <p className="px-1 text-center text-[11px] text-neutral-600">
          Member since {mockUser.memberSince} · Glam mock frontend v0.0.1
        </p>
      </main>
    </div>
  )
}
