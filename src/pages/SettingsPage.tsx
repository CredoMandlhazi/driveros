import React, { useState, ReactNode } from 'react'
import { useTheme } from '../context/ThemeContext'
import { GoFn } from '../types'
import { Card, GoldCard, Toggle, ScreenHeader } from '../components/UI'

interface Props { go: GoFn }

const SettingsPage: React.FC<Props> = ({ go }) => {
  const { isDark, setIsDark } = useTheme()
  const [notif,     setNotif]     = useState(true)
  const [comply,    setComply]    = useState(true)
  const [cash,      setCash]      = useState(true)
  const [locn,      setLocn]      = useState(true)
  const [biometric, setBiometric] = useState(false)
  const [dataSave,  setDataSave]  = useState(false)

  const Chev = () => (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
      className="stroke-gray-300 dark:stroke-gray-600" strokeWidth={2.5} strokeLinecap="round">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )

  const SRow: React.FC<{ label: string; sub?: string; right: ReactNode; last?: boolean }> = ({ label, sub, right, last }) => (
    <div className={`settings-${last ? 'row-last' : 'row'}`}>
      <div className="flex-1 pr-3">
        <p className="text-[15px] text-gray-900 dark:text-white">{label}</p>
        {sub && <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">{sub}</p>}
      </div>
      {right}
    </div>
  )

  const Sect: React.FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
    <div className="mb-5">
      <p className="section-label">{title}</p>
      <Card>{children}</Card>
    </div>
  )

  return (
    <div className="flex-1 bg-gray-100 dark:bg-black flex flex-col">
      <ScreenHeader title="Settings" onBack={() => go('home')} />

      <div className="flex-1 overflow-y-auto p-4">
        <Sect title="Appearance">
          <SRow label="Dark Mode" sub={isDark ? 'Dark theme active' : 'Light theme active'}
            right={<Toggle on={isDark} toggle={() => setIsDark(v => !v)} />} last />
        </Sect>

        <Sect title="Notifications">
          <SRow label="Push Notifications"   right={<Toggle on={notif}  toggle={() => setNotif(v  => !v)} />} />
          <SRow label="Compliance Reminders" sub="Document expiry alerts" right={<Toggle on={comply} toggle={() => setComply(v => !v)} />} />
          <SRow label="Cashback Alerts"      sub="When cashback is earned" right={<Toggle on={cash}   toggle={() => setCash(v   => !v)} />} last />
        </Sect>

        <Sect title="Privacy & Security">
          <SRow label="Location Services" sub="Used for live SOS tracking" right={<Toggle on={locn}      toggle={() => setLocn(v      => !v)} />} />
          <SRow label="Biometric Login"   sub="Face ID / Fingerprint"      right={<Toggle on={biometric} toggle={() => setBiometric(v => !v)} />} />
          <SRow label="Data Saver"        sub="Reduce background data use" right={<Toggle on={dataSave}  toggle={() => setDataSave(v  => !v)} />} last />
        </Sect>

        <Sect title="Account">
          <SRow label="Change Password"       right={<Chev />} />
          <SRow label="Change Mobile Number"  sub="071 234 5678"           right={<Chev />} />
          <SRow label="Linked Bank Account"   sub="FNB **** 4321"          right={<Chev />} />
          <SRow label="Membership Plan"       sub="Standard · R199/month"  right={<Chev />} />
          <SRow label="Download My Data"      sub="POPIA data request"     right={<Chev />} last />
        </Sect>

        <Sect title="Membership">
          <GoldCard className="p-[14px] mb-0 rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-white/80">Current Plan</p>
                <p className="text-[17px] font-bold text-white mt-0.5">Standard Member</p>
                <p className="text-[12px] text-white/70 mt-0.5">Renews 1 Apr 2025 · R199/month</p>
              </div>
              <button className="bg-white/20 border-none rounded-[10px] px-[14px] py-2 text-[12px] font-semibold text-white cursor-pointer">
                Upgrade
              </button>
            </div>
          </GoldCard>
          <div className="pt-[13px] border-t border-gray-100 dark:border-gray-800">
            <button className="border-none bg-transparent text-brand-red text-[15px] font-medium p-0 cursor-pointer">
              Cancel Membership
            </button>
          </div>
        </Sect>

        <Sect title="About">
          <SRow label="App Version"      right={<span className="text-[13px] text-gray-400 dark:text-gray-500">2.1.0</span>} />
          <SRow label="Privacy Policy"   right={<Chev />} />
          <SRow label="Terms of Service" right={<Chev />} />
          <SRow label="Rate DriverOS"    right={<Chev />} last />
        </Sect>

        <button onClick={() => go('welcome')} className="btn-danger mb-2">Sign Out</button>
        <div className="h-2" />
      </div>
    </div>
  )
}

export default SettingsPage
