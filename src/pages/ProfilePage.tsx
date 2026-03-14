import React, { useState } from 'react'
import { GoFn } from '../types'
import { Card, ScreenHeader, SectionLabel } from '../components/UI'

interface Props { go: GoFn }
const DOCS = [
  {label:'ID Document',status:'Verified',exp:'N/A',ok:true},
  {label:"Driver's Licence",status:'Valid',exp:'2026-08-14',ok:true},
  {label:'PrDP',status:'Expiring soon',exp:'2025-03-27',ok:false},
  {label:'Operating Permit',status:'Valid',exp:'2026-01-10',ok:true},
  {label:'Vehicle Licence Disc',status:'Valid',exp:'2025-11-30',ok:true},
  {label:'Insurance Certificate',status:'Upload needed',exp:'—',ok:false},
]

const ProfilePage: React.FC<Props> = ({ go }) => {
  const [editing,setEditing]=useState(false)
  const [name,setName]=useState('Thabo Nkosi')
  const [phone,setPhone]=useState('071 234 5678')
  const [email,setEmail]=useState('thabo@email.com')
  return (
    <div className="flex-1 bg-gray-100 dark:bg-black flex flex-col">
      <ScreenHeader title="Profile & Documents" onBack={()=>go('home')}
        right={<button onClick={()=>setEditing(v=>!v)} className="border-none bg-transparent text-gold text-[14px] font-semibold cursor-pointer">{editing?'Done':'Edit'}</button>}/>
      <div className="flex-1 overflow-y-auto p-4">
        <Card className="flex items-center gap-4 mb-4">
          <div className="w-[60px] h-[60px] rounded-full bg-gold-gradient flex items-center justify-center text-[22px] font-bold text-white">TN</div>
          <div>
            <p className="text-[17px] font-bold text-gray-900 dark:text-white">{name}</p>
            <p className="text-[13px] text-gray-400 dark:text-gray-500 mt-0.5">Owner-driver · Gauteng · #10842</p>
            <span className="badge mt-1 inline-block">Active Member</span>
          </div>
        </Card>
        <SectionLabel>Personal Info</SectionLabel>
        <Card className="mb-4">
          {([['Full Name',name,setName],['Mobile',phone,setPhone],['Email',email,setEmail]] as [string,string,React.Dispatch<React.SetStateAction<string>>][]).map(([l,v,sv],i,arr)=>(
            <div key={i} className={`py-[13px] ${i<arr.length-1?'border-b border-gray-100 dark:border-gray-800':''}`}>
              <p className="text-[12px] text-gray-400 dark:text-gray-500 mb-1">{l}</p>
              {editing?<input value={v} onChange={e=>sv(e.target.value)} className="w-full border-none bg-transparent text-[15px] text-gray-900 dark:text-white border-b border-gold pb-0.5 outline-none"/>:<p className="text-[15px] text-gray-900 dark:text-white">{v}</p>}
            </div>
          ))}
        </Card>
        <SectionLabel>Documents</SectionLabel>
        {DOCS.map((d,i)=>(
          <div key={i} className="doc-row">
            <div className={`doc-icon ${d.ok?'bg-green-50':'bg-red-50'}`}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" className={d.ok?'stroke-green-700':'stroke-brand-red'} strokeWidth={2} strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-semibold text-gray-900 dark:text-white">{d.label}</p>
              <p className={`text-[12px] mt-0.5 ${d.ok?'text-gray-400 dark:text-gray-500':'text-brand-red'}`}>{d.status} · {d.exp}</p>
            </div>
            <button className="border border-gray-200 dark:border-gray-700 bg-transparent rounded-lg px-3 py-1.5 text-[12px] text-gray-500 dark:text-gray-400 cursor-pointer">{d.status==='Upload needed'?'Upload':'View'}</button>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProfilePage
