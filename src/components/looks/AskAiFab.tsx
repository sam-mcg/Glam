import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export function AskAiFab() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div
        className="pointer-events-none fixed bottom-0 left-1/2 z-50 w-full max-w-[375px] -translate-x-1/2 px-5"
        style={{ bottom: 'calc(env(safe-area-inset-bottom, 0px) + 84px)' }}
      >
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="pointer-events-auto mx-auto flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-300 to-amber-500 px-5 py-3 text-sm font-semibold text-neutral-950 shadow-xl shadow-amber-900/35"
          aria-haspopup="dialog"
          aria-expanded={open}
        >
          <MessageCircle className="h-5 w-5" strokeWidth={2} aria-hidden />
          Ask AI
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-black/55 px-4 pb-[calc(env(safe-area-inset-bottom,0px)+88px)] pt-10 backdrop-blur-sm"
          role="presentation"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Ask AI"
            className="w-full max-w-[343px] rounded-3xl border border-white/10 bg-neutral-950 p-4 shadow-card ring-1 ring-amber-400/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Concierge</p>
                <p className="text-lg font-semibold text-neutral-50">Ask AI</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-xl p-2 text-neutral-400 hover:bg-white/5 hover:text-neutral-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-3 rounded-2xl border border-white/5 bg-black/30 p-3">
              <p className="text-sm text-neutral-400">
                Glam AI chat will live here — product pairing, shade troubleshooting, and look critiques.
              </p>
              <div className="rounded-xl bg-white/[0.04] px-3 py-2 text-xs text-neutral-500">
                Stub: connect models & safety rails before enabling messaging.
              </div>
            </div>
            <button
              type="button"
              disabled
              className="mt-4 w-full rounded-xl border border-white/10 bg-white/[0.06] py-3 text-sm font-semibold text-neutral-500"
            >
              Send (disabled)
            </button>
          </div>
        </div>
      ) : null}
    </>
  )
}
