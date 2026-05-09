import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TopBar } from '@/components/layout/TopBar'
import { Card } from '@/components/ui/Card'
import { GhostButton } from '@/components/ui/GhostButton'
import { PrimaryButton } from '@/components/ui/PrimaryButton'
import { supabase } from '@/supabase'
import { useAuth } from '@/auth/AuthContext'

type Mode = 'login' | 'signup'

function classNames(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function AuthPage() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const [mode, setMode] = useState<Mode>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const canSubmit = useMemo(() => {
    if (!email.trim() || !password.trim()) return false
    if (mode === 'signup' && !name.trim()) return false
    return true
  }, [email, password, name, mode])

  async function onSubmit() {
    setError(null)
    setMessage(null)
    setBusy(true)
    try {
      if (mode === 'signup') {
        const { error: signUpError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name: name.trim(),
            },
          },
        })
        if (signUpError) throw signUpError
        setMessage('Account created. Check your email to confirm, then log in.')
        setMode('login')
        return
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })
      if (signInError) throw signInError
      navigate('/profile')
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong'
      setError(msg)
    } finally {
      setBusy(false)
    }
  }

  async function onLogout() {
    setBusy(true)
    try {
      const { error: signOutError } = await supabase.auth.signOut()
      if (signOutError) throw signOutError
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-neutral-950">
      <TopBar title="Sign in" showBack onBack={() => navigate(-1)} />
      <main className="mx-auto flex w-full max-w-[375px] flex-1 flex-col gap-4 px-4 pb-6 pt-4">
        {user ? (
          <Card className="space-y-3">
            <p className="text-sm font-semibold text-neutral-50">You’re signed in.</p>
            <p className="text-xs text-neutral-400">{user.email}</p>
            <div className="flex gap-2">
              <GhostButton className="flex-1" onClick={() => navigate('/profile')}>
                Go to profile
              </GhostButton>
              <PrimaryButton className="flex-1" disabled={busy} onClick={onLogout}>
                Log out
              </PrimaryButton>
            </div>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={classNames(
                  'rounded-xl border px-3 py-2 text-sm font-semibold transition',
                  mode === 'login'
                    ? 'border-amber-400/30 bg-amber-400/10 text-amber-100'
                    : 'border-white/10 bg-white/[0.04] text-neutral-200 hover:border-amber-400/25',
                )}
              >
                Log in
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={classNames(
                  'rounded-xl border px-3 py-2 text-sm font-semibold transition',
                  mode === 'signup'
                    ? 'border-amber-400/30 bg-amber-400/10 text-amber-100'
                    : 'border-white/10 bg-white/[0.04] text-neutral-200 hover:border-amber-400/25',
                )}
              >
                Sign up
              </button>
            </div>

            <Card className="space-y-3">
              {mode === 'signup' ? (
                <label className="block">
                  <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-neutral-50 outline-none ring-amber-400/30 focus:ring-2"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>
              ) : null}

              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Email</span>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-neutral-50 outline-none ring-amber-400/30 focus:ring-2"
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                />
              </label>

              <label className="block">
                <span className="block text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">Password</span>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2.5 text-sm text-neutral-50 outline-none ring-amber-400/30 focus:ring-2"
                  placeholder="••••••••"
                  type="password"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                />
              </label>

              {error ? <p className="text-sm text-red-300">{error}</p> : null}
              {message ? <p className="text-sm text-emerald-200">{message}</p> : null}

              <div className="flex gap-2 pt-1">
                <GhostButton className="flex-1" disabled={busy} onClick={() => navigate(-1)}>
                  Cancel
                </GhostButton>
                <PrimaryButton className="flex-1" disabled={busy || !canSubmit} onClick={onSubmit}>
                  {mode === 'signup' ? 'Create account' : 'Log in'}
                </PrimaryButton>
              </div>
            </Card>
          </>
        )}
      </main>
    </div>
  )
}

