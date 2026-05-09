import type { SocialEvent } from '@/types'

export const mockEvents: SocialEvent[] = [
  {
    id: 'e1',
    title: 'Golden Hour Rooftop',
    theme: 'Sunset metallics',
    when: 'Sat · 7:30 PM',
    host: 'Mira Cho',
    attendees: 18,
    coverUrl: 'https://picsum.photos/seed/ev1/640/360',
  },
  {
    id: 'e2',
    title: 'Midnight Muse Lab',
    theme: 'Graphic liner swap',
    when: 'Thu · 8:00 PM',
    host: 'You',
    attendees: 9,
    coverUrl: 'https://picsum.photos/seed/ev2/640/360',
  },
  {
    id: 'e3',
    title: 'Skin First Sunday',
    theme: 'Glow rituals & masks',
    when: 'Sun · 10:00 AM',
    host: 'Jordan Ellis',
    attendees: 24,
    coverUrl: 'https://picsum.photos/seed/ev3/640/360',
  },
]
