export type Screen =
  | 'splash' | 'welcome' | 'signin' | 'create' | 'forgot' | 'home'
  | 'service' | 'profile' | 'compliance' | 'earnings'
  | 'association' | 'notifications' | 'help' | 'settings'

export type GoFn = (screen: Screen | `svc_${string}`) => void

export interface Transaction {
  id: number
  l: string
  a: number
  t: string
  type: 'credit' | 'debit'
}

export interface Notification {
  id: number
  read: boolean
  icon: string
  t: string
  b: string
  time: string
  bgLight: string | null
}

export interface NominatimPlace {
  place_id: number
  display_name: string
  lat: string
  lon: string
  type: string
  class: string
}

export type ServiceKey = 'fuel' | 'service' | 'legal' | 'cover' | 'tyres' | 'parking'

export interface ServicePartner {
  name: string
  sub: string
  detail: string
  badge: string
}

export interface ServiceFaq {
  q: string
  a: string
}

export interface ServiceData {
  title: string
  icon: string
  desc: string
  partners: ServicePartner[]
  faqs: ServiceFaq[]
}
