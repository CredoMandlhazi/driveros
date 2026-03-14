import React, { useState } from 'react'
import { GoFn } from '../types'
import { Card, GoldBtn, ScreenHeader, SectionLabel } from '../components/UI'

interface Props { go: GoFn }
const FAQS=[{q:'How do I earn fuel cashback?',a:'Present your DriverOS QR code before paying at any partner station. Cashback appears in your wallet within 24 hours.'},{q:'What if my car is impounded?',a:"Go to Safety → Emergency SOS → Report Incident, or call our 24/7 legal helpline. We'll guide you through the release process."},{q:'How do I cancel my membership?',a:'Go to Settings → Membership → Cancel Membership. Benefits remain active until end of billing period.'},{q:'Can I change my region?',a:'Yes. Go to My Association and tap Change Region. A coordinator will approve within 2 business days.'},{q:'How do I upload a document?',a:'Go to Profile → Documents and tap Upload next to the relevant document. PDF, JPG and PNG up to 5MB.'}]
const CHANNELS=[{icon:'💬',label:'Live Chat',sub:'Avg response: 3 min',action:'Start Chat'},{icon:'📞',label:'Call Support',sub:'Mon–Fri 07:00–20:00',action:'Call Now'},{icon:'📧',label:'Email',sub:'support@driveros.co.za',action:'Email'},{icon:'🌐',label:'WhatsApp',sub:'0800 DRIVER',action:'Open Chat'}]

const HelpPage: React.FC<Props> = ({ go }) => {
  const [exp,setExp]=useState<number|null>(null)
  return (
    <div className="flex-1 bg-gray-100 dark:bg-black flex flex-col">
      <ScreenHeader title="Help & Support" onBack={()=>go('home')}/>
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-[10px] mb-4">
          {CHANNELS.map((c,i)=><Card key={i} className="text-center"><p className="text-[26px] mb-2">{c.icon}</p><p className="text-[14px] font-semibold text-gray-900 dark:text-white">{c.label}</p><p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5 mb-[10px]">{c.sub}</p><GoldBtn label={c.action} onClick={()=>{}} small/></Card>)}
        </div>
        <SectionLabel>Frequently Asked Questions</SectionLabel>
        {FAQS.map((f,i)=>(
          <Card key={i} className="mb-[10px]" onClick={()=>setExp(exp===i?null:i)}>
            <div className="flex items-center justify-between">
              <span className="text-[14px] font-semibold text-gray-900 dark:text-white flex-1 leading-snug pr-2">{f.q}</span>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none" className="stroke-gray-400 dark:stroke-gray-500 flex-shrink-0 transition-transform duration-200" style={{transform:exp===i?'rotate(180deg)':'none'}} strokeWidth={2.5} strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
            {exp===i&&<p className="faq-answer">{f.a}</p>}
          </Card>
        ))}
      </div>
    </div>
  )
}
export default HelpPage
