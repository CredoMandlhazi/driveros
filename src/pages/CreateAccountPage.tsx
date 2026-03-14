import React, { useState } from 'react'
import { GoFn } from '../types'
import logo from '../assets/logo.png'
import { GoldBtn, TextBtn, FInput, FSelect, Card, OtpInput, AuthProgress, FieldLabel } from '../components/UI'

interface Props { go: GoFn }
const PROVS = ['Gauteng','Western Cape','KwaZulu-Natal','Eastern Cape','Limpopo','Mpumalanga','North West','Free State','Northern Cape']

const CreateAccountPage: React.FC<Props> = ({ go }) => {
  const [step,setStep]=useState(1)
  const [form,setForm]=useState({first:'',last:'',phone:'',province:'',type:'',pass:'',confirm:''})
  const [otp,setOtp]=useState(Array(6).fill(''))
  const [loading,setLoading]=useState(false)
  const up=(k:keyof typeof form)=>(e:React.ChangeEvent<HTMLInputElement|HTMLSelectElement>)=>setForm(p=>({...p,[k]:e.target.value}))
  const next=()=>{
    if(step===2){setLoading(true);setTimeout(()=>{setLoading(false);setStep(3)},900);return}
    if(step===3){setLoading(true);setTimeout(()=>{setLoading(false);go('home')},1000);return}
    setStep(s=>s+1)
  }
  return (
    <div className="auth-root">
      <div className="auth-header border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={step===1?()=>go('welcome'):()=>setStep(s=>s-1)} className="btn-back">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={2.5} strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="flex-1 flex justify-center"><img src={logo} alt="DriverOS" className="h-6 object-contain dark:invert"/></div>
          <div className="w-[38px]"/>
        </div>
        <AuthProgress step={step} total={3}/>
      </div>
      <div className="auth-body">
        {step===1&&<>
          <h1 className="text-[26px] font-bold text-gray-900 dark:text-white tracking-tight mb-6">Create Account</h1>
          <div className="flex gap-3"><div className="flex-1 mb-[18px]"><FieldLabel>First Name</FieldLabel><FInput value={form.first} onChange={up('first')}/></div><div className="flex-1 mb-[18px]"><FieldLabel>Last Name</FieldLabel><FInput value={form.last} onChange={up('last')}/></div></div>
          <div className="mb-[18px]"><FieldLabel>Mobile Number</FieldLabel><FInput type="tel" placeholder="071 234 5678" value={form.phone} onChange={up('phone')}/></div>
          <div className="mb-[18px]"><FieldLabel>Province</FieldLabel><FSelect value={form.province} onChange={up('province') as React.ChangeEventHandler<HTMLSelectElement>}><option value="">Select Province</option>{PROVS.map(p=><option key={p} value={p}>{p}</option>)}</FSelect></div>
          <div className="mb-6"><FieldLabel>Driver Type</FieldLabel><div className="flex gap-2">{['Owner','Fleet','Association'].map(t=><button key={t} onClick={()=>setForm(p=>({...p,type:t}))} className={`flex-1 py-3 rounded-xl border text-[12px] font-semibold cursor-pointer transition-colors ${form.type===t?'border-gold bg-amber-50 text-gold':'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400'}`}>{t}</button>)}</div></div>
          <p className="text-[11px] text-gray-400 dark:text-gray-500 leading-relaxed mb-6">By continuing, you agree to DriverOS&apos;s <span className="text-gold">Privacy Policy</span> and <span className="text-gold">Terms of Service (POPIA)</span>.</p>
        </>}
        {step===2&&<>
          <h1 className="text-[26px] font-bold text-gray-900 dark:text-white tracking-tight mb-6">Set Password</h1>
          <div className="mb-[18px]"><FieldLabel>New Password</FieldLabel><FInput type="password" placeholder="At least 8 characters" value={form.pass} onChange={up('pass')}/></div>
          <div className="mb-[18px]"><FieldLabel>Confirm Password</FieldLabel><FInput type="password" placeholder="Repeat password" value={form.confirm} onChange={up('confirm')}/></div>
          <Card className="mb-6">
            {([['8+ characters',form.pass.length>=8],['Uppercase letter',/[A-Z]/.test(form.pass)],['One number',/\d/.test(form.pass)]] as [string,boolean][]).map(([r,ok],i)=>(
              <div key={i} className={`flex items-center gap-[10px] py-2 ${i<2?'border-b border-gray-100 dark:border-gray-800':''}`}>
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" className={ok?'stroke-gold':'stroke-gray-300 dark:stroke-gray-600'} strokeWidth={2.5} strokeLinecap="round">{ok?<polyline points="20 6 9 17 4 12"/>:<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>}</svg>
                <span className={`text-[13px] ${ok?'text-gray-700 dark:text-gray-300':'text-gray-400 dark:text-gray-500'}`}>{r}</span>
              </div>
            ))}
          </Card>
        </>}
        {step===3&&<>
          <h1 className="text-[26px] font-bold text-gray-900 dark:text-white tracking-tight mb-2">Verify Number</h1>
          <p className="text-[14px] text-gray-400 dark:text-gray-500 mb-7 leading-relaxed">6-digit code sent to <strong className="text-gray-900 dark:text-white">{form.phone||'your number'}</strong></p>
          <OtpInput otp={otp} setOtp={setOtp} prefix="ca"/>
          <div className="text-center mb-5"><TextBtn label="Resend code" onClick={()=>{}}/></div>
        </>}
        <GoldBtn label={step===3?(loading?'Verifying…':'Verify & Finish'):step===2?(loading?'Creating…':'Create Account'):'Next'} onClick={next} loading={loading}/>
      </div>
    </div>
  )
}
export default CreateAccountPage
