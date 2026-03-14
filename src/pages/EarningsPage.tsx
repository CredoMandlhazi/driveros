import React, { useState } from 'react'
import { GoFn } from '../types'
import { Card, GoldCard, ScreenHeader } from '../components/UI'

interface Props { go: GoFn }
const DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const EARN=[820,1040,760,1320,980,1560,640]
const MAX=Math.max(...EARN)

const EarningsPage: React.FC<Props> = ({ go }) => {
  const [view,setView]=useState('week')
  return (
    <div className="flex-1 bg-gray-100 dark:bg-black flex flex-col">
      <ScreenHeader title="Earnings Tracker" onBack={()=>go('home')}/>
      <div className="flex-1 overflow-y-auto p-4">
        <GoldCard className="p-5 mb-3">
          <p className="text-[11px] text-white/75 uppercase tracking-[0.5px] mb-1.5">This Week — Net Profit</p>
          <p className="text-[36px] font-bold text-white tracking-tight leading-none">R 4,120</p>
          <p className="text-[13px] text-white/70 mt-1">Revenue R7,120 · Costs R3,000</p>
        </GoldCard>
        <div className="flex bg-white dark:bg-gray-900 rounded-xl p-1 mb-3">
          {['week','month','year'].map(p=>(
            <button key={p} onClick={()=>setView(p)} className={`flex-1 py-[9px] rounded-[9px] text-[13px] font-semibold border-none cursor-pointer transition-all ${view===p?'bg-gold-gradient text-white':'bg-transparent text-gray-500 dark:text-gray-400'}`}>{p.charAt(0).toUpperCase()+p.slice(1)}</button>
          ))}
        </div>
        <Card className="mb-3">
          <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-4">Daily Earnings</p>
          <div className="flex items-end gap-1.5 h-[90px] mb-2">
            {DAYS.map((d,i)=>(
              <div key={d} className="chart-bar">
                <div className="chart-bar-fill" style={{height:`${(EARN[i]/MAX)*82}px`,background:i===5?'linear-gradient(135deg,#C9A96E,#A07840)':'#F5ECE0'}}/>
                <span className="text-[10px] text-gray-400 dark:text-gray-500 font-medium">{d}</span>
              </div>
            ))}
          </div>
        </Card>
        <div className="grid grid-cols-2 gap-[10px] mb-3">
          {[{l:'Total Trips',v:'47'},{l:'Avg per trip',v:'R151'},{l:'Best day',v:'Sat R1,560'},{l:'Total Expenses',v:'R3,000'}].map((s,i)=>(
            <Card key={i}><p className="text-[12px] text-gray-400 dark:text-gray-500 mb-1.5">{s.l}</p><p className="text-[20px] font-bold text-gray-900 dark:text-white">{s.v}</p></Card>
          ))}
        </div>
        <Card>
          <p className="text-[14px] font-semibold text-gray-900 dark:text-white mb-3.5">Cost Breakdown</p>
          {[{l:'Fuel',v:'R1,240',pct:41,c:'#B8914E'},{l:'Insurance',v:'R620',pct:21,c:'#C07840'},{l:'Platform commission',v:'R660',pct:22,c:'#8E8E93'},{l:'Maintenance',v:'R480',pct:16,c:'#C7C7CC'}].map((c,i)=>(
            <div key={i} className="mb-3">
              <div className="flex justify-between mb-1.5"><span className="text-[13px] text-gray-600 dark:text-gray-400">{c.l}</span><span className="text-[13px] font-bold text-gray-900 dark:text-white">{c.v}</span></div>
              <div className="h-[5px] bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{width:`${c.pct}%`,background:c.c}}/></div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  )
}
export default EarningsPage
