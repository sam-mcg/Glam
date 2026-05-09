import { useMemo, useState } from 'react'
import type { Friend } from '@/types'
import { Card } from '@/components/ui/Card'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { GhostButton } from '@/components/ui/GhostButton'

interface CreateEventFormProps {
  friends: Friend[]
}

export function CreateEventForm({ friends }: CreateEventFormProps) {
  const [name, setName] = useState('Golden Studio Night')
  const [theme, setTheme] = useState('Molten gold eyes')
  const [when, setWhen] = useState('Next Saturday · 8 PM')
  const [invitees, setInvitees] = useState<string[]>(() => friends.slice(0, 2).map((f) => f.id))
  const [sent, setSent] = useState(false)

  const toggleInvite = (id: string) => {
    setInvitees((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]))
  }

  const summary = useMemo(() => friends.filter((f) => invitees.includes(f.id)), [friends, invitees])

  const onSubmit = () => {
    console.log('[Glam stub] Create themed event', { name, theme, when, invitees })
    setSent(true)
    window.setTimeout(() => setSent(false), 2800)
  }

  return (
    <Card className="space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Host</p>
        <h3 className="text-lg font-semibold text-neutral-50">Themed event</h3>
        <p className="mt-1 text-sm text-neutral-500">Invite friends to co-create a glam brief.</p>
      </div>
      <label className="block text-xs font-medium text-neutral-400">
        Event name
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-400/35 focus:ring-2 focus:ring-amber-400/15"
        />
      </label>
      <label className="block text-xs font-medium text-neutral-400">
        Theme
        <input
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-400/35 focus:ring-2 focus:ring-amber-400/15"
        />
      </label>
      <label className="block text-xs font-medium text-neutral-400">
        When
        <input
          value={when}
          onChange={(e) => setWhen(e.target.value)}
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-sm text-neutral-100 outline-none focus:border-amber-400/35 focus:ring-2 focus:ring-amber-400/15"
        />
      </label>
      <div>
        <p className="text-xs font-medium text-neutral-400">Invite friends</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {friends.map((f) => {
            const on = invitees.includes(f.id)
            return (
              <GhostButton
                key={f.id}
                type="button"
                onClick={() => toggleInvite(f.id)}
                className={`rounded-full px-3 py-1.5 text-xs ${on ? 'border-amber-400/35 bg-amber-400/10 text-amber-50' : ''}`}
              >
                {f.name}
              </GhostButton>
            )
          })}
        </div>
      </div>
      <PrimaryButton className="w-full" onClick={onSubmit}>
        Send invites
      </PrimaryButton>
      {sent ? (
        <p className="rounded-xl bg-emerald-500/15 px-3 py-2 text-center text-xs font-semibold text-emerald-100 ring-1 ring-emerald-400/25">
          Invites sent (mock) — {summary.length ? summary.map((f) => f.name).join(', ') : 'No friends selected'}
        </p>
      ) : null}
    </Card>
  )
}
