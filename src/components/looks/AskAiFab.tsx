import { useMemo, useRef, useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { mockProducts } from '@/data/mockProducts'

export function AskAiFab() {
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'ai'; text: string }>>([])
  const scrollRef = useRef<HTMLDivElement | null>(null)

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

  const send = async () => {
    const q = question.trim()
    if (!q || busy) return
    setError(null)
    setBusy(true)
    setQuestion('')
    setMessages((prev) => [...prev, { role: 'user', text: q }])
    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ question: q, products: inventory }),
      })
      const data = await res.json().catch(() => null)
      if (!res.ok) throw new Error((data && (data.error || data.message)) || 'Failed to get answer')
      const answer = typeof data?.answer === 'string' ? data.answer : JSON.stringify(data)
      setMessages((prev) => [...prev, { role: 'ai', text: answer }])
      window.setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
      }, 10)
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      setError(msg)
    } finally {
      setBusy(false)
    }
  }

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
            <div
              ref={scrollRef}
              className="mt-4 max-h-[45dvh] space-y-2 overflow-auto rounded-2xl border border-white/5 bg-black/30 p-3"
            >
              {messages.length === 0 ? (
                <p className="text-sm text-neutral-400">Ask anything — shade matching, technique, product pairing, troubleshooting.</p>
              ) : null}
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={
                    m.role === 'user'
                      ? 'ml-auto w-[92%] rounded-2xl bg-amber-400/10 px-3 py-2 text-sm text-amber-50 ring-1 ring-amber-400/20'
                      : 'mr-auto w-[92%] rounded-2xl bg-white/[0.04] px-3 py-2 text-sm text-neutral-100 ring-1 ring-white/10'
                  }
                >
                  {m.text}
                </div>
              ))}
              {error ? (
                <div className="rounded-2xl bg-red-500/10 px-3 py-2 text-xs font-medium text-red-200 ring-1 ring-red-400/25">
                  {error}
                </div>
              ) : null}
            </div>
            <div className="mt-3 flex gap-2">
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') send()
                }}
                placeholder="Type a question…"
                className="flex-1 rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-neutral-50 outline-none ring-amber-400/30 focus:ring-2"
              />
              <button
                type="button"
                disabled={busy || !question.trim()}
                onClick={send}
                className="rounded-xl bg-gradient-to-r from-amber-300 to-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 disabled:opacity-50"
              >
                {busy ? '…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
