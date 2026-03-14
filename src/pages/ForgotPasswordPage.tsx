import React, { useState } from 'react'
import { GoFn } from '../types'
import logo from '../assets/logo.png'
import { GoldBtn, TextBtn, FInput, OtpInput, AuthProgress, FieldLabel } from '../components/UI'

interface Props { go: GoFn }

const ForgotPasswordPage: React.FC<Props> = ({ go }) => {
  const [step,setStep]=useState(1)
  const [phone,setPhone]=useState('')
  const [otp,setOtp]=useState(Array(6).fill(''))
  const [pass,setPass]=useState('')
  return (
    <div className="auth-root">
      <div className="auth-header border-b border-gray-200 dark:border-gray-700 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={step===1?()=>go('signin'):()=>setStep(s=>s-1)} className="btn-back">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={2.5} strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <div className="flex-1 flex justify-center"><img src={logo} alt="DriverOS" className="h-6 object-contain dark:invert"/></div>
          <div className="w-[38px]"/>
        </div>
        <AuthProgress step={step} total={4}/>
      </div>
      <div className="auth-body">
        {step===1&&<><h1 className="text-[26px] font-bold text-gray-900 dark:text-white mb-2">Reset Password</h1><p className="text-[14px] text-gray-400 dark:text-gray-500 mb-7 leading-relaxed">Enter your mobile number and we&apos;ll send a verification code.</p><FieldLabel>Mobile Number</FieldLabel><FInput type="tel" placeholder="071 234 5678" value={phone} onChange={e=>setPhone(e.target.value)} className="mb-5"/><GoldBtn label="Send Code" onClick={()=>setStep(2)}/></>}
        {step===2&&<><h1 className="text-[26px] font-bold text-gray-900 dark:text-white mb-2">Enter Code</h1><p className="text-[14px] text-gray-400 dark:text-gray-500 mb-7">Sent to {phone||'your number'}</p><OtpInput otp={otp} setOtp={setOtp} prefix="fp"/><GoldBtn label="Verify" onClick={()=>setStep(3)}/><div className="text-center mt-3"><TextBtn label="Resend code" onClick={()=>{}}/></div></>}
        {step===3&&<><h1 className="text-[26px] font-bold text-gray-900 dark:text-white mb-2">New Password</h1><p className="text-[14px] text-gray-400 dark:text-gray-500 mb-6">Choose a strong new password.</p><FieldLabel>New Password</FieldLabel><FInput type="password" placeholder="Min. 8 characters" value={pass} onChange={e=>setPass(e.target.value)} className="mb-4"/><FieldLabel>Confirm Password</FieldLabel><FInput type="password" placeholder="Repeat password" className="mb-6"/><GoldBtn label="Reset Password" onClick={()=>setStep(4)}/></>}
        {step===4&&<div className="text-center pt-10"><div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-5"><svg width={28} height={28} viewBox="0 0 24 24" fill="none" className="stroke-gold" strokeWidth={2.5} strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></div><h1 className="text-[22px] font-bold text-gray-900 dark:text-white mb-2">Password Updated</h1><p className="text-[14px] text-gray-400 dark:text-gray-500 leading-relaxed mb-8">You can now sign in with your new password.</p><GoldBtn label="Back to Sign In" onClick={()=>go('signin')}/></div>}
      </div>
    </div>
  )
}
export default ForgotPasswordPage
