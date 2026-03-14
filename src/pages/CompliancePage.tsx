import React, { useState } from 'react'
import { GoFn } from '../types'
import { Card, GoldCard, Divider, Toggle, ScreenHeader, SectionLabel } from '../components/UI'

interface Props { go: GoFn }
const ITEMS = [
  {label:"Driver's Licence",exp:'2026-08-14',pct:100,status:'good'},
  {label:'PrDP',exp:'2025-03-27',pct:5,status:'warn'},
  {label:'Operating Permit',exp:'2026-01-10',pct:82,status:'good'},
  {label:'Vehicle Licence Disc',exp:'2025-11-30',pct:50,status:'ok'},
  {label:'Insurance Certificate',exp:'—',pct:0,status:'missing'},
]
const SC:{[k:string]:string}={good:'#2E7D32',ok:'#B8914E',warn:'#FF9500',missing:'#D0021B'}
const SL:{[k:string]:string}={good:'Valid',ok:'Review',warn:'Renew soon',missing:'Missing'}

const CompliancePage: React.FC<Props> = ({ go }) => {
  const [emailOn,setEmailOn]=useState(true)
  const [pushOn,setPushOn]=useState(true)
  return (
    <div className="flex-1 bg-gray-100 dark:bg-black flex flex-col">
      <ScreenHeader title="Compliance Vault" onBack={()=>go('home')}/>
      <div className="flex-1 overflow-y-auto p-4">
        <GoldCard className="mb-4 p-[18px]">
          <p className="text-[13px] text-white/80 mb-1">Compliance Score</p>
          <p className="text-[32px] font-bold text-white tracking-tight leading-none">4 / 5</p>
          <p className="text-[13px] text-white/70 mt-1">1 document missing · 1 expiring soon</p>
        </GoldCard>
        {ITEMS.map((it,i)=>(
          <Card key={i} className="mb-[10px]">
            <div className="flex items-center justify-between mb-[10px]">
              <span className="text-[15px] font-semibold text-gray-900 dark:text-white">{it.label}</span>
              <span className="text-[12px] font-bold rounded-md px-[9px] py-[3px]" style={{color:SC[it.status],background:SC[it.status]+'18'}}>{SL[it.status]}</span>
            </div>
            <div className="compliance-bar-track"><div className="compliance-bar-fill" style={{width:`${it.pct}%`,background:SC[it.status]}}/></div>
            <div className="flex justify-between">
              <span className="text-[12px] text-gray-400 dark:text-gray-500">Expires: {it.exp}</span>
              {(it.status==='warn'||it.status==='missing')&&<button className="border-none bg-transparent text-gold text-[12px] font-semibold cursor-pointer">{it.status==='missing'?'Upload →':'Renew →'}</button>}
            </div>
          </Card>
        ))}
        <SectionLabel className="mt-4">Reminders</SectionLabel>
        <Card>
          <div className="flex items-center justify-between py-2"><span className="text-[15px] text-gray-900 dark:text-white">Email reminders</span><Toggle on={emailOn} toggle={()=>setEmailOn(v=>!v)}/></div>
          <Divider/>
          <div className="flex items-center justify-between py-2 mt-1"><span className="text-[15px] text-gray-900 dark:text-white">Push notifications</span><Toggle on={pushOn} toggle={()=>setPushOn(v=>!v)}/></div>
        </Card>
      </div>
    </div>
  )
}
export default CompliancePage
