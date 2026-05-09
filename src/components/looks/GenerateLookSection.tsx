import { useMemo, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { GhostButton } from '@/components/ui/GhostButton'
import { mockProducts } from '@/data/mockProducts'
import type { GeneratedLook } from '@/types'

export function GenerateLookSection() {
  const [theme, setTheme] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [generated, setGenerated] = useState<GeneratedLook | null>(null)

  const inventory = useMemo(
    () =>
      mockProducts.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        category: p.category,
      })),
    [],
  )

  const onGenerate = async () => {
    setError(null)
    setGenerated(null)
    setBusy(true)
    try {
      const res = await fetch('/api/generate-look', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ products: inventory, theme: theme.trim() || undefined }),
      })

      const data = await res.json().catch(() => null)
      if (!res.ok) {
        throw new Error((data && (data.error || data.message)) || 'Failed to generate look')
      }
      setGenerated(data as GeneratedLook)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      setError(msg)
    } finally {
      setBusy(false)
    }
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
      <PrimaryButton className="w-full" disabled={busy} onClick={onGenerate}>
        {busy ? 'Generating…' : 'Generate a Look'}
      </PrimaryButton>
      {error ? <p className="rounded-xl bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 ring-1 ring-red-400/25">{error}</p> : null}
      {generated ? (
        <div className="space-y-3 rounded-2xl border border-white/5 bg-black/20 p-3">
          <div>
            <p className="text-sm font-semibold text-neutral-50">{generated.look_name}</p>
            <p className="mt-1 text-xs text-neutral-400">{generated.vibe}</p>
          </div>
          <ol className="space-y-2">
            {generated.steps.slice(0, 8).map((s, idx) => (
              <li key={`${idx}-${s.product}`} className="rounded-xl bg-white/[0.04] px-3 py-2">
                <p className="text-xs font-semibold text-amber-100/90">
                  Step {idx + 1}: {s.product}
                </p>
                <p className="mt-1 text-[11px] text-neutral-400">
                  Tool: {s.tool} · Technique: {s.technique} · Density: {s.density} · Opacity: {s.opacity}
                </p>
                <p className="mt-1 text-xs text-neutral-200">{s.directions}</p>
              </li>
            ))}
          </ol>
          <div className="flex gap-2">
            <GhostButton className="flex-1" onClick={() => setGenerated(null)}>
              Clear
            </GhostButton>
            <GhostButton
              className="flex-1"
              onClick={() => {
                navigator.clipboard?.writeText(JSON.stringify(generated, null, 2))
              }}
            >
              Copy JSON
            </GhostButton>
          </div>
        </div>
      ) : null}
    </Card>
  )
}
