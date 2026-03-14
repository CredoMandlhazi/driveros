import React, { useState } from 'react'
import { GoFn } from '../types'
import { Card, GoldCard, GoldBtn, ScreenHeader } from '../components/UI'

interface Props { go: GoFn }
const FEED=[{type:'notice',t:'Meeting this Saturday',b:'Gauteng regional driver meeting · Sat 15 Mar · 10:00 · Sandton Civic Centre',time:'2h ago'},{type:'alert',t:'New fuel partner added',b:'TotalEnergies has increased cashback to 8% for March.',time:'5h ago'},{type:'vote',t:'Poll: Meeting time',b:'Morning (08:00–10:00) or Evening (17:00–19:00)?',time:'1d ago'},{type:'notice',t:'Impoundment support',b:'If your vehicle is impounded tap Safety → Legal Support. We respond within 2h.',time:'2d ago'}]
const MEMBERS=[{name:'Sipho Dlamini',role:'Regional Coordinator'},{name:'Nomsa Khumalo',role:'Secretary'},{name:'Bongani Ndlovu',role:'Driver Rep'},{name:'Priya Naidoo',role:'Member'}]
const EVENTS=[{t:'Gauteng Regional Meeting',d:'Sat 15 Mar 2025 · 10:00',l:'Sandton Civic Centre'},{t:'Compliance Drive',d:'Wed 19 Mar 2025 · 09:00',l:'Online — WhatsApp Group'},{t:'Fuel Partner Launch',d:'Fri 21 Mar 2025 · 14:00',l:'TotalEnergies HQ, Midrand'}]
const ICON:{[k:string]:string}={notice:'📢',alert:'⚡',vote:'🗳️'}

const AssociationPage: React.FC<Props> = ({ go }) => {
  const [tab,setTab]=useState('feed')
  return (
    <div className="flex-1 bg-gray-100 dark:bg-black flex flex-col">
      <ScreenHeader title="My Association" onBack={()=>go('home')}/>
      <div className="tab-bar px-4">
        {['feed','members','events'].map(t=>(
          <button key={t} onClick={()=>setTab(t)} className={`tab-btn ${tab===t?'tab-btn-active':'tab-btn-inactive'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {tab==='feed'&&FEED.map((f,i)=>(
          <Card key={i} className="mb-[10px] flex gap-3">
            <div className="w-[38px] h-[38px] rounded-[10px] bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[18px] flex-shrink-0">{ICON[f.type]}</div>
            <div className="flex-1"><p className="text-[14px] font-bold text-gray-900 dark:text-white mb-1">{f.t}</p><p className="text-[13px] text-gray-600 dark:text-gray-400 leading-snug">{f.b}</p><p className="text-[11px] text-gray-300 dark:text-gray-600 mt-1.5">{f.time}</p></div>
          </Card>
        ))}
        {tab==='members'&&<><GoldCard className="mb-3 p-[14px]"><p className="text-[12px] text-white/75">Gauteng Region</p><p className="text-[20px] font-bold text-white">214 Members</p></GoldCard>{MEMBERS.map((m,i)=><Card key={i} className="mb-[10px] flex items-center gap-[14px]"><div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-gray-500 dark:text-gray-400 text-[14px]">{m.name.split(' ').map(n=>n[0]).join('')}</div><div><p className="text-[14px] font-semibold text-gray-900 dark:text-white">{m.name}</p><p className="text-[12px] text-gray-400 dark:text-gray-500">{m.role}</p></div></Card>)}</>}
        {tab==='events'&&EVENTS.map((e,i)=><Card key={i} className="mb-[10px]"><p className="text-[15px] font-bold text-gray-900 dark:text-white mb-1">{e.t}</p><p className="text-[13px] font-medium text-gold">{e.d}</p><p className="text-[13px] text-gray-400 dark:text-gray-500 mt-0.5 mb-3">{e.l}</p><GoldBtn label="RSVP" onClick={()=>{}} small/></Card>)}
      </div>
    </div>
  )
}
export default AssociationPage
