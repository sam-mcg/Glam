export type ProductCategory = 'lip' | 'eye' | 'face' | 'cheek' | 'brow' | 'tool'

export type LookFilterKey = 'myProducts' | 'trending' | 'customAi'

export interface Product {
  id: string
  name: string
  brand: string
  category: ProductCategory
  imageUrl: string
}

export interface Look {
  id: string
  title: string
  subtitle: string
  imageUrl: string
  filter: LookFilterKey
  usesMyProducts: boolean
}

export type LookStepDensity = 'sheer' | 'light' | 'medium' | 'full'
export type LookStepOpacity = 'low' | 'medium' | 'high'

export interface GeneratedLookStep {
  product: string
  tool: string
  technique: string
  density: LookStepDensity
  opacity: LookStepOpacity
  directions: string
}

export interface GeneratedLook {
  look_name: string
  vibe: string
  steps: GeneratedLookStep[]
}

export interface SavedLook {
  id: string
  title: string
  mood: string
  imageUrl: string
}

export interface Friend {
  id: string
  name: string
  handle: string
  avatarUrl: string
  status: 'online' | 'away' | 'offline'
}

export interface SocialEvent {
  id: string
  title: string
  theme: string
  when: string
  host: string
  attendees: number
  coverUrl: string
}

export interface UserProfile {
  displayName: string
  handle: string
  avatarUrl: string
  bio: string
  memberSince: string
  plan: 'Glam Free' | 'Glam Pro'
}
