import React from 'react'
import { GoFn } from '../types'
import logo from '../assets/logo.png'
import { GoldBtn, OutlineBtn } from '../components/UI'

interface Props { go: GoFn }

const WelcomePage: React.FC<Props> = ({ go }) => (
  <div className="welcome-root">
    <div className="welcome-gradient" />
    {[20,40,60,80].map((o,i) => (
      <div key={i} className="absolute left-0 right-0 h-px"
        style={{ bottom: `${o}%`, background: `rgba(255,255,255,${0.025 + i*0.008})` }} />
    ))}
    <div className="absolute top-[14%] left-7 right-7 z-10">
      <img src={logo} alt="DriverOS" className="w-44 object-contain invert" />
      <p className="mt-7 text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.45)' }}>
        Your community finance &amp;<br />driver operations platform.
      </p>
    </div>
    <div className="welcome-cta z-10">
      <GoldBtn label="Sign In" onClick={() => go('signin')} />
      <div className="h-[10px]" />
      <OutlineBtn label="Create Account" onClick={() => go('create')}
        className="text-white border-white/20" />
    </div>
  </div>
)
export default WelcomePage
