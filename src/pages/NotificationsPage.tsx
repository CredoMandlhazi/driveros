import React, { useState } from 'react'
import { GoFn, Notification } from '../types'
import { ScreenHeader } from '../components/UI'

interface Props { go: GoFn }
const INIT: Notification[] = [
  {id:1,read:false,icon:'⚠️',t:'PrDP expiring in 14 days',b:'Tap to view renewal options',time:'Just now',bgLight:'#FFF4E5'},
  {id:2,read:false,icon:'⛽',t:'Fuel cashback credited',b:'R48 added to your wallet from TotalEnergies',time:'2h ago',bgLight:'#E8F5E9'},
  {id:3,read:true,icon:'📢',t:'Association meeting reminder',b:'This Saturday 10:00 at Sandton Civic Centre',time:'5h ago',bgLight:null},
  {id:4,read:true,icon:'💳',t:'Membership renewed',b:'Your March subscription was processed successfully',time:'Yesterday',bgLight:null},
  {id:5,read:true,icon:'⚖️',t:'Legal plan activated',b:'Your Legal & Tax plan is now active',time:'2 days ago',bgLight:null},
]
const NotificationsPage: React.FC<Props> = ({ go }) => {
  const [notifs,setNotifs]=useState(INIT)
  return (
    <div className="flex-1 bg-gray-100 dark:bg-black flex flex-col">
      <ScreenHeader title="Notifications" onBack={()=>go('home')}
        right={<button onClick={()=>setNotifs(n=>n.map(x=>({...x,read:true})))} className="border-none bg-transparent text-gold text-[13px] font-semibold cursor-pointer">Mark all read</button>}/>
      <div className="flex-1 overflow-y-auto p-4">
        {notifs.map(n=>(
          <div key={n.id} onClick={()=>setNotifs(p=>p.map(x=>x.id===n.id?{...x,read:true}:x))}
            className="notif-row"
            style={{background:n.read?undefined:(n.bgLight||undefined)}}>
            <div className="w-[42px] h-[42px] rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-[20px] flex-shrink-0">{n.icon}</div>
            <div className="flex-1">
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[14px] leading-snug text-gray-900 dark:text-white ${n.read?'font-medium':'font-bold'}`}>{n.t}</span>
                {!n.read&&<div className="notif-dot"/>}
              </div>
              <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">{n.b}</p>
              <p className="text-[11px] text-gray-300 dark:text-gray-600 mt-1">{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
export default NotificationsPage
