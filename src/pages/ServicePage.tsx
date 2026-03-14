import React, { useState } from 'react'
import { GoFn, ServiceKey } from '../types'
import { SERVICE_DATA } from '../data/serviceData'
import { Card, GoldCard, Badge, GoldBtn, ScreenHeader, SectionLabel } from '../components/UI'

interface Props { type: ServiceKey | null; go: GoFn }

const ServicePage: React.FC<Props> = ({ type, go }) => {
  const [expanded, setExpanded] = useState<number | null>(null)
  const d = type ? SERVICE_DATA[type] : null
  if (!d) return null

  return (
    <div className="flex-1 bg-gray-100 dark:bg-black flex flex-col">
      <ScreenHeader title={d.title} onBack={() => go('home')} />

      <div className="flex-1 overflow-y-auto p-4">
        {/* Hero */}
        <GoldCard className="mb-3 p-[18px]">
          <p className="text-[13px] text-white/80 mb-1">Member Benefit</p>
          <p className="text-base font-bold text-white tracking-tight">{d.desc}</p>
        </GoldCard>

        <SectionLabel>Partners</SectionLabel>

        {d.partners.map((p, i) => (
          <div key={i} className="partner-row">
            <div className="partner-icon">{d.icon}</div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[15px] font-semibold text-gray-900 dark:text-white">{p.name}</span>
                {p.badge && <Badge label={p.badge} />}
              </div>
              <p className="text-[13px] font-semibold text-gold">{p.sub}</p>
              <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">{p.detail}</p>
            </div>
            <GoldBtn label="Use" onClick={() => {}} small />
          </div>
        ))}

        <SectionLabel className="mt-5">FAQ</SectionLabel>

        {d.faqs.map((f, i) => (
          <Card key={i} className="mb-[10px]" onClick={() => setExpanded(expanded === i ? null : i)}>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-gray-900 dark:text-white flex-1 leading-snug">{f.q}</span>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                className="stroke-gray-400 dark:stroke-gray-500 flex-shrink-0 ml-2 transition-transform duration-200"
                style={{ transform: expanded === i ? 'rotate(180deg)' : 'none' }}
                strokeWidth={2.5} strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            {expanded === i && <p className="faq-answer">{f.a}</p>}
          </Card>
        ))}
      </div>
    </div>
  )
}

export default ServicePage
