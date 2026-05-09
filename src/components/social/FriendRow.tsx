import type { Friend } from '@/types'

function statusDot(status: Friend['status']) {
  switch (status) {
    case 'online':
      return 'bg-emerald-400 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]'
    case 'away':
      return 'bg-amber-300 shadow-[0_0_0_3px_rgba(251,191,36,0.25)]'
    default:
      return 'bg-neutral-600 shadow-[0_0_0_3px_rgba(82,82,91,0.35)]'
  }
}

export function FriendRow({ friend }: { friend: Friend }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2.5">
      <div className="relative">
        <img src={friend.avatarUrl} alt="" className="h-11 w-11 rounded-full object-cover ring-1 ring-white/10" />
        <span
          className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-neutral-950 ${statusDot(friend.status)}`}
          title={friend.status}
        />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-neutral-50">{friend.name}</p>
        <p className="truncate text-xs text-neutral-500">{friend.handle}</p>
      </div>
      <span className="text-[10px] font-semibold uppercase tracking-wide text-neutral-600">{friend.status}</span>
    </div>
  )
}
