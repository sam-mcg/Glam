import { Aperture } from 'lucide-react'

export function CameraPlaceholder() {
  return (
    <div className="relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-3xl border border-white/10 bg-black/40">
      <div className="pointer-events-none absolute inset-8 rounded-2xl border border-dashed border-amber-400/35" />
      <div className="pointer-events-none absolute left-6 top-6 h-10 w-10 rounded-tl-xl border-l-2 border-t-2 border-amber-200/55" />
      <div className="pointer-events-none absolute right-6 top-6 h-10 w-10 rounded-tr-xl border-r-2 border-t-2 border-amber-200/55" />
      <div className="pointer-events-none absolute bottom-6 left-6 h-10 w-10 rounded-bl-xl border-b-2 border-l-2 border-amber-200/55" />
      <div className="pointer-events-none absolute bottom-6 right-6 h-10 w-10 rounded-br-xl border-b-2 border-r-2 border-amber-200/55" />
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400/10 ring-1 ring-amber-400/25">
          <Aperture className="h-7 w-7 text-amber-100" strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-50">Camera preview</p>
          <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-neutral-500">
            Live capture will activate here in Safari. For now, upload a clear photo of the label or flat lay.
          </p>
        </div>
      </div>
    </div>
  )
}
