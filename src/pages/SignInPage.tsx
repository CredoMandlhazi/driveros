import React, { useState } from 'react'
import { GoFn } from '../types'
import logo from '../assets/logo.png'
import { GoldBtn, OutlineBtn, TextBtn, FInput, FieldLabel } from '../components/UI'

interface Props { go: GoFn }

const SignInPage: React.FC<Props> = ({ go }) => {
  const [phone,setPhone]=useState('')
  const [pass,setPass]=useState('')
  const [showPw,setShowPw]=useState(false)
  const [loading,setLoading]=useState(false)
  const submit=()=>{ if(!phone||!pass)return; setLoading(true); setTimeout(()=>{ setLoading(false); go('home') },1200) }
  return (
    <div className="auth-root">
      <div className="auth-header pb-0 pt-6">
        <div className="flex items-center justify-between mb-7">
          <button onClick={()=>go('welcome')} className="btn-back">
            <svg width={18} height={18} viewBox="0 0 24 24" fill="none" className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={2.5} strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>
          </button>
          <img src={logo} alt="DriverOS" className="h-8 object-contain dark:invert" />
          <div className="w-[38px]"/>
        </div>
        <h1 className="text-[28px] font-bold text-gray-900 dark:text-white tracking-tight mb-1">Welcome back</h1>
        <p className="text-[15px] text-gray-400 dark:text-gray-500 mb-7">Sign in to your DriverOS account</p>
      </div>
      <div className="auth-body pt-0">
        <div className="mb-[18px]"><FieldLabel>Mobile Number</FieldLabel><FInput type="tel" placeholder="071 234 5678" value={phone} onChange={e=>setPhone(e.target.value)}/></div>
        <div className="mb-2">
          <FieldLabel>Password</FieldLabel>
          <div className="relative">
            <FInput type={showPw?'text':'password'} placeholder="Enter password" value={pass} onChange={e=>setPass(e.target.value)} className="pr-12"/>
            <button onClick={()=>setShowPw(v=>!v)} className="absolute right-3 top-1/2 -translate-y-1/2 border-none bg-transparent leading-none cursor-pointer">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" className="stroke-gray-400" strokeWidth={2} strokeLinecap="round">
                {showPw?<><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><line x1="1" y1="1" x2="23" y2="23"/></>:<><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}
              </svg>
            </button>
          </div>
        </div>
        <div className="text-right mb-6"><TextBtn label="Forgot password?" onClick={()=>go('forgot')}/></div>
        <GoldBtn label="Sign In" onClick={submit} loading={loading}/>
        <div className="h-3"/><OutlineBtn label="Sign in with OTP" onClick={submit}/>
        <p className="text-center mt-6 text-[14px] text-gray-400 dark:text-gray-500">No account? <TextBtn label="Create one" onClick={()=>go('create')}/></p>
      </div>
    </div>
  )
}
export default SignInPage
