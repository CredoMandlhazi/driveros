import { ServiceData, ServiceKey } from '../types'

export const SERVICE_DATA: Record<ServiceKey, ServiceData> = {
  fuel: {
    title: 'Fuel Partners', icon: '⛽',
    desc: 'Earn cashback at partner stations every time you fill up.',
    partners: [
      { name: 'TotalEnergies',     sub: '8% cashback · All grades',       detail: 'Valid at 200+ stations nationwide', badge: 'Best'    },
      { name: 'BP Express',        sub: '6% cashback · Unleaded & Diesel', detail: 'Valid at 150+ BP stations',         badge: ''        },
      { name: 'Shell V-Power',     sub: '5% cashback + 3pts/litre',        detail: 'Combined with FuelSave rewards',    badge: ''        },
      { name: 'Engen Convenience', sub: '4% cashback',                     detail: 'Plus in-store shop discounts',      badge: ''        },
    ],
    faqs: [
      { q: 'How do I earn cashback?',    a: 'Present your DriverOS QR code at the pump or till before paying. Cashback posts to your wallet within 24h.' },
      { q: 'When does cashback expire?', a: "Cashback is valid for 90 days. You'll receive a reminder before it expires." },
    ],
  },
  service: {
    title: 'Vehicle Service', icon: '🔧',
    desc: 'Exclusive service and maintenance discounts for DriverOS members.',
    partners: [
      { name: 'Midas Auto',         sub: '15% off all services',          detail: 'Branches nationwide · Booking required', badge: 'Popular' },
      { name: 'Supa Quick',         sub: '20% off wheel alignment',       detail: 'Free brake inspection included',          badge: 'New'     },
      { name: 'AutoZone',           sub: '10% off parts + free fitting',  detail: 'Online orders eligible',                  badge: ''        },
      { name: 'Tiger Wheel & Tyre', sub: '18% off services',              detail: 'Free tyre rotation with service',         badge: ''        },
    ],
    faqs: [
      { q: 'How do I book a service?',            a: "Tap 'Use' on any partner to connect to their booking system. Show your DriverOS membership at the counter." },
      { q: 'Is the discount on labour or parts?', a: 'Both! The discount applies to the total invoice including parts and labour.' },
    ],
  },
  legal: {
    title: 'Legal Support', icon: '⚖️',
    desc: 'Access expert legal support 24/7 for traffic, contract and labour disputes.',
    partners: [
      { name: 'Legal & Tax',          sub: 'R99/month — 24/7 helpline',    detail: 'Traffic fines, impoundment, permits', badge: 'Active' },
      { name: 'LegalWise',            sub: 'R149/month — Full legal cover', detail: 'Criminal, civil & labour law',        badge: ''       },
      { name: 'CCMA Assistance',      sub: 'Free for members',              detail: 'Labour disputes & UIF support',       badge: 'Free'   },
      { name: 'Traffic Fine Defence', sub: 'R59/month',                     detail: 'Contest fines, demerit points',       badge: ''       },
    ],
    faqs: [
      { q: 'What if my car is impounded?',             a: 'Call the 24/7 Legal Helpline immediately. A paralegal will guide you through the release process.' },
      { q: 'Does legal cover include criminal matters?', a: 'The premium LegalWise plan includes criminal defence up to a set value.' },
    ],
  },
  cover: {
    title: 'Insurance & Cover', icon: '🛡️',
    desc: 'Group rates on funeral, income protection, disability and vehicle insurance.',
    partners: [
      { name: 'Prov Life Funeral',     sub: 'From R89/month · Up to R50k',   detail: 'Covers spouse, 4 children & parents', badge: 'Popular' },
      { name: 'Income Protector',      sub: 'R199/month — 3-month cover',    detail: 'If unable to drive due to illness',    badge: ''        },
      { name: 'Old Mutual Disability', sub: 'From R159/month',               detail: 'Permanent disability lump-sum',        badge: ''        },
      { name: 'Hollard Vehicle',       sub: 'Comprehensive from R899/month', detail: 'Uber/Bolt e-hailing endorsement',      badge: ''        },
    ],
    faqs: [
      { q: 'Can I claim if my car is stolen during a trip?', a: 'Yes — the Hollard plan includes e-hailing endorsement which standard personal policies exclude.' },
      { q: 'How quickly are funeral claims paid?',            a: 'Prov Life guarantees a 48-hour payout once all documents are submitted.' },
    ],
  },
  tyres: {
    title: 'Tyre Discounts', icon: '🔘',
    desc: 'Exclusive discounts on tyres, balancing, rotation and puncture repairs.',
    partners: [
      { name: 'Supa Quick',         sub: '20% off all tyre brands',     detail: 'Free fitting & balancing included', badge: 'Best' },
      { name: 'Tiger Wheel & Tyre', sub: '15% off premium brands',      detail: 'Michelin, Bridgestone, Pirelli',    badge: ''     },
      { name: 'Tyres & More',       sub: 'Buy 3 get 1 free',            detail: 'Standard range only',               badge: 'Deal' },
      { name: 'Hi-Q',               sub: 'Free rotation with purchase', detail: 'All tyre sizes',                    badge: ''     },
    ],
    faqs: [
      { q: 'How often should I rotate my tyres?', a: 'Every 10,000–12,000 km. Members get free rotation reminders via Compliance Vault.' },
      { q: 'What brands are covered?',            a: 'All major brands stocked at each partner. Premium brands may have separate discount tiers.' },
    ],
  },
  parking: {
    title: 'Parking', icon: '🅿️',
    desc: 'Discounted parking at airports, malls and CBD zones nationwide.',
    partners: [
      { name: 'Parkhurst CBD',       sub: 'R5/hour (was R12)',          detail: '24-hour access · Underground',          badge: 'Nearby' },
      { name: 'OR Tambo Airport',    sub: '20% off all bays',           detail: 'Long stay & short stay applicable',     badge: ''       },
      { name: 'Sandton City P1',     sub: 'First 2h free for members',  detail: 'Validation at any retailer',            badge: ''       },
      { name: 'NPC Parking Network', sub: 'Flat R8/hour city-wide',     detail: '180+ bays in JHB CBD',                  badge: ''       },
    ],
    faqs: [
      { q: 'How do I access the discounted rate?', a: 'Show your DriverOS QR code at the boom gate or pay station. Discount is applied automatically.' },
      { q: 'Does the discount work at airports?',  a: 'Yes — OR Tambo, Cape Town International and King Shaka all have DriverOS partner rates.' },
    ],
  },
}
