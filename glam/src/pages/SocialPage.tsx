import { mockFriends } from '@/data/mockFriends'
import { mockEvents } from '@/data/mockEvents'
import { TopBar } from '@/components/layout/TopBar'
import { FriendRow } from '@/components/social/FriendRow'
import { EventCard } from '@/components/social/EventCard'
import { CreateEventForm } from '@/components/social/CreateEventForm'

export function SocialPage() {
  return (
    <div className="flex flex-1 flex-col">
      <TopBar title="Social" />
      <main className="flex flex-1 flex-col gap-6 px-4 pb-4 pt-2">
        <section className="space-y-3">
          <div className="px-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Circle</p>
            <h2 className="text-lg font-semibold text-neutral-50">Friends</h2>
          </div>
          <div className="space-y-2">
            {mockFriends.map((f) => (
              <FriendRow key={f.id} friend={f} />
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <div className="px-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-200/80">Happening</p>
            <h2 className="text-lg font-semibold text-neutral-50">Events feed</h2>
          </div>
          <div className="space-y-4">
            {mockEvents.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
        </section>

        <CreateEventForm friends={mockFriends} />
      </main>
    </div>
  )
}
