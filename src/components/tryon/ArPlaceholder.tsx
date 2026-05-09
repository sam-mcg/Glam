import { Glasses } from 'lucide-react'

export function ArPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-amber-400/35 bg-black/35 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/10 ring-1 ring-amber-400/25">
        <Glasses className="h-8 w-8 text-amber-100" strokeWidth={1.5} />
      </div>
      <div>
        <p className="text-lg font-semibold text-neutral-50">AR try-on</p>
        <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-neutral-400">
          8th Wall integration lands here — face tracking, realistic cosmetics shaders, and look swapping tied to
          your previews.
        </p>
      </div>
    </div>
  )
}
