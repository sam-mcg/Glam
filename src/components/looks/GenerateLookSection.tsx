import { useState } from 'react'
import { Card } from '@/components/ui/Card'
import { PrimaryButton } from '@/components/ui/PrimaryButton'

export function GenerateLookSection() {
  const [theme, setTheme] = useState('')
  const [hint, setHint] = useState<string | null>(null)

  const onGenerate = () => {
    // Stub — no API yet
    console.log('[Glam stub] Generate look theme:', theme || '(empty)')
    setHint('Coming soon — AI generation will use your vault & palette.')
    window.setTimeout(() => setHint(null), 3200)
  }

  return (
    <Card className="space-y-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Create</p>
        <h3 className="text-lg font-semibold text-neutral-50">Generate a Look</h3>
        <p className="mt-1 text-sm text-neutral-500">Describe a vibe — AI will draft looks here soon.</p>
      </div>
      <label className="block text-xs font-medium text-neutral-400">
        Theme
        <input
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          placeholder="e.g. Champagne disco, soft latte matte…"
          className="mt-2 w-full rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-neutral-100 outline-none ring-amber-400/0 transition placeholder:text-neutral-600 focus:border-amber-400/35 focus:ring-2 focus:ring-amber-400/20"
        />
      </label>
      <PrimaryButton className="w-full" onClick={onGenerate}>
        Generate a Look
      </PrimaryButton>
      {hint ? (
        <p className="rounded-xl bg-amber-400/10 px-3 py-2 text-xs font-medium text-amber-100 ring-1 ring-amber-400/25">
          {hint}
        </p>
      ) : null}
    </Card>
  )
}
