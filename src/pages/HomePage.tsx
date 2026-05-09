import { Link } from 'react-router-dom'
import { mockSavedLooks } from '@/data/mockSavedLooks'
import { QuickActions } from '@/components/home/QuickActions'
import { SavedLooksRail } from '@/components/home/SavedLooksRail'
import { FeedSection } from '@/components/home/FeedSection'
import { ProfileAvatarLink, TopBar } from '@/components/layout/TopBar'
import { mockUser } from '@/data/mockUser'

export function HomePage() {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar
        rightSlot={<ProfileAvatarLink src={mockUser.avatarUrl} alt={mockUser.displayName} />}
      />
      <main className="flex flex-1 flex-col gap-6 px-4 pb-4 pt-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-200/75">Glam</p>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-neutral-50">
              Evening, {mockUser.displayName.split(' ')[0]}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">Your looks, vault, and circle — distilled.</p>
          </div>
          <Link
            to="/inventory"
            className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-amber-100/90 ring-1 ring-amber-400/15"
          >
            Vault
          </Link>
        </div>
        <QuickActions />
        <SavedLooksRail looks={mockSavedLooks} />
        <FeedSection />
      </main>
    </div>
  )
}
