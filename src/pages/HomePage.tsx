import React, { useState } from 'react'
import { GoFn, NominatimPlace, Transaction } from '../types'
import LiveMap from '../components/LiveMap'
import SearchBar from '../components/SearchBar'
import { Card, GoldCard, GoldBtn, OutlineBtn, Badge, Divider, GearIcon } from '../components/UI'
import { AddFundsModal, WithdrawModal } from '../components/WalletModals'
import { cn } from '../utils/cn'

interface Props { go: GoFn }

const CATS = [
  { k: 'fuel',    l: 'Fuel',    ic: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M3 22V8l9-6 9 6v14"/><rect x="9" y="13" width="6" height="9"/></svg> },
  { k: 'service', l: 'Service', ic: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg> },
  { k: 'legal',   l: 'Legal',   ic: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { k: 'cover',   l: 'Cover',   ic: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> },
  { k: 'tyres',   l: 'Tyres',   ic: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/><line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/></svg> },
  { k: 'parking', l: 'Parking', ic: <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg> },
]

const NAV = [
  { k: 'map',    l: 'Home',     ic: (a: boolean) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" strokeLinecap="round" className={a ? 'stroke-gray-900 dark:stroke-white' : 'stroke-gray-400'} strokeWidth={a ? 2.5 : 2}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg> },
  { k: 'wallet', l: 'Wallet',   ic: (a: boolean) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" strokeLinecap="round" className={a ? 'stroke-gray-900 dark:stroke-white' : 'stroke-gray-400'} strokeWidth={a ? 2.5 : 2}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg> },
  { k: 'safety', l: 'Safety',   ic: (a: boolean) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" strokeLinecap="round" className={a ? 'stroke-brand-red' : 'stroke-gray-400'} strokeWidth={a ? 2.5 : 2}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { k: 'bene',   l: 'Benefits', ic: (a: boolean) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" strokeLinecap="round" className={a ? 'stroke-gray-900 dark:stroke-white' : 'stroke-gray-400'} strokeWidth={a ? 2.5 : 2}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
  { k: 'menu',   l: 'Menu',     ic: (a: boolean) => <svg width={22} height={22} viewBox="0 0 24 24" fill="none" strokeLinecap="round" className={a ? 'stroke-gray-900 dark:stroke-white' : 'stroke-gray-400'} strokeWidth={a ? 2.5 : 2}><line x1="3" y1="8" x2="21" y2="8"/><line x1="3" y1="16" x2="21" y2="16"/></svg> },
]

const INIT_TXS: Transaction[] = [
  { id: 1, l: 'Fuel cashback · Total',     a:  48,  t: 'Today',   type: 'credit' },
  { id: 2, l: 'Membership fee',            a: -199, t: '1 Mar',   type: 'debit'  },
  { id: 3, l: 'Service discount · Midas',  a:  120, t: '28 Feb',  type: 'credit' },
  { id: 4, l: 'Tyre discount · Supa Quick',a:  85,  t: '25 Feb',  type: 'credit' },
  { id: 5, l: 'Legal plan deduction',      a:  -99, t: '1 Feb',   type: 'debit'  },
]

const HomePage: React.FC<Props> = ({ go }) => {
  const [tab,          setTab]          = useState('map')
  const [sos,          setSos]          = useState(false)
  const [sosStep,      setSosStep]      = useState(0)
  const [searchResult, setSearchResult] = useState<NominatimPlace | null>(null)
  const [walletBal,    setWalletBal]    = useState(1248)
  const [txs,          setTxs]          = useState<Transaction[]>(INIT_TXS)
  const [showAdd,      setShowAdd]      = useState(false)
  const [showWith,     setShowWith]     = useState(false)

  const triggerSOS = () => setSosStep(1)
  const confirmSOS = () => { setSosStep(2); setSos(true); setTimeout(() => setSosStep(3), 9000) }
  const cancelSOS  = () => { setSosStep(0); setSos(false) }
  const resolveSOS = () => { setSosStep(0); setSos(false) }

  const menuItems = [
    { l: 'Profile & Documents', k: 'profile' }, { l: 'Compliance Vault', k: 'compliance' },
    { l: 'Earnings Tracker', k: 'earnings' },   { l: 'My Association', k: 'association' },
    { l: 'Notifications', k: 'notifications' }, { l: 'Help & Support', k: 'help' },
    { l: 'Settings', k: 'settings' },
  ]

  const sheetContent = () => {
    if (tab === 'map') return (
      <div>
        <SearchBar onResult={setSearchResult} />
        <div className="bg-gold-gradient rounded-[11px] px-4 py-3 text-center my-3 cursor-pointer">
          <span className="text-[14px] text-white">Nearest partner driver in <strong>8 min</strong></span>
        </div>
        <div className="flex justify-between mb-1">
          {CATS.map(c => (
            <button key={c.k} onClick={() => go(`svc_${c.k}` as any)}
              className="flex flex-col items-center gap-[5px] bg-transparent border-none px-0.5 py-1 cursor-pointer">
              <div className="w-[50px] h-[50px] rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">{c.ic}</div>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{c.l}</span>
            </button>
          ))}
        </div>
        <Divider />
        <div className="pt-2">
          {[{ n: 'TotalEnergies Rosebank', a: '12 Oxford Rd', d: '0.4 km' }, { n: 'Midas Auto Illovo', a: '45 Jan Smuts', d: '1.1 km' }].map((p, i) => (
            <div key={i} className={`flex items-center py-[11px] cursor-pointer ${i === 0 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" className="stroke-gray-400 flex-shrink-0 mr-3" strokeWidth={2} strokeLinecap="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
              </svg>
              <div className="flex-1">
                <p className="text-[14px] font-medium text-gray-900 dark:text-white">{p.n}</p>
                <p className="text-[12px] text-gray-400 dark:text-gray-500">{p.a}</p>
              </div>
              <span className="text-[13px] text-gray-400 dark:text-gray-500">{p.d}</span>
            </div>
          ))}
        </div>
      </div>
    )

    if (tab === 'wallet') return (
      <div>
        <GoldCard className="p-5 mb-[14px]">
          <p className="text-[11px] text-white/70 uppercase tracking-[0.5px] mb-1">Wallet Balance</p>
          <p className="text-[34px] font-bold text-white tracking-tight leading-none">
            R {walletBal.toLocaleString('en-ZA', { minimumFractionDigits: 2 })}
          </p>
          <p className="text-[12px] text-white/65 mt-1">Cashback R248 · Credit R1,000</p>
        </GoldCard>
        <div className="flex gap-[10px] mb-[14px]">
          <GoldBtn label="Add Funds" onClick={() => setShowAdd(true)} className="flex-1 !py-3 !text-[13px] !rounded-[10px]" />
          <OutlineBtn label="Withdraw" onClick={() => setShowWith(true)} className="flex-1 !py-3 !text-[13px] !rounded-[10px]" />
        </div>
        <p className="section-label">Transactions</p>
        {txs.map((tx, i) => (
          <div key={tx.id} className={`flex items-center py-3 ${i < txs.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}>
            <div className={`w-[34px] h-[34px] rounded-[10px] mr-3 flex-shrink-0 flex items-center justify-center ${tx.type === 'credit' ? 'bg-green-50' : 'bg-red-50'}`}>
              <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
                className={tx.type === 'credit' ? 'stroke-green-700' : 'stroke-brand-red'} strokeWidth={2.5} strokeLinecap="round">
                {tx.type === 'credit'
                  ? <><line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" /></>
                  : <><line x1="12" y1="5" x2="12" y2="19" /><polyline points="5 12 12 19 19 12" /></>}
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-medium text-gray-900 dark:text-white">{tx.l}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{tx.t}</p>
            </div>
            <span className={`text-[15px] font-bold ${tx.a > 0 ? 'text-green-700' : 'text-brand-red'}`}>
              {tx.a > 0 ? '+' : ''}R{Math.abs(tx.a)}
            </span>
          </div>
        ))}
      </div>
    )

    if (tab === 'safety') return (
      <div>
        <button onClick={triggerSOS}
          className="w-full py-[18px] bg-brand-red border-none rounded-[13px] text-white text-[17px] font-bold flex items-center justify-center gap-3 shadow-sos mb-3 cursor-pointer">
          <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          Emergency SOS
        </button>
        <div className="grid grid-cols-2 gap-[10px] mb-3">
          {[
            { l: 'Share Location',     ic: <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg> },
            { l: 'Emergency Contacts', ic: <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.36 19.36 0 0 1 1.64 3a2 2 0 0 1 1.82-2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
            { l: 'Report Incident',    ic: <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg> },
            { l: 'Safety Alerts',      ic: <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
          ].map((a, i) => (
            <button key={i} className="p-[14px] bg-white dark:bg-gray-900 rounded-xl border-none flex flex-col items-start gap-2 shadow-card dark:shadow-card-dark text-gray-500 dark:text-gray-400 cursor-pointer">
              {a.ic}<span className="text-[12px] font-semibold text-gray-900 dark:text-white">{a.l}</span>
            </button>
          ))}
        </div>
        {[{ t: 'Robbery reported', s: 'N1 near Midrand · 2h ago', hot: true }, { t: 'Road block active', s: 'William Nicol · 4h ago', hot: false }].map((a, i) => (
          <div key={i} className="flex items-center gap-3 py-[11px] border-t border-gray-100 dark:border-gray-800">
            <div className={`w-2 h-2 rounded-full flex-shrink-0 ${a.hot ? 'bg-brand-red' : 'bg-orange-400'}`} />
            <div>
              <p className="text-[13px] font-semibold text-gray-900 dark:text-white">{a.t}</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-0.5">{a.s}</p>
            </div>
          </div>
        ))}
      </div>
    )

    if (tab === 'bene') return (
      <div>
        {[
          { l: 'Fuel Cashback',     s: 'Up to 8% at partner stations',    badge: 'Active' },
          { l: 'Legal Cover',       s: '24/7 legal assistance',           badge: 'Active' },
          { l: 'Funeral Cover',     s: 'From R89/month · Prov Life',      badge: null },
          { l: 'Income Protection', s: 'If unable to drive — R199/month', badge: null },
          { l: 'Tyre Discount',     s: '15–20% off at Supa Quick',        badge: 'New' },
        ].map((b, i) => (
          <div key={i} className="flex items-center py-[13px] border-b border-gray-100 dark:border-gray-800 cursor-pointer">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-[14px] font-semibold text-gray-900 dark:text-white">{b.l}</span>
                {b.badge && <Badge label={b.badge} />}
              </div>
              <p className="text-[12px] text-gray-400 dark:text-gray-500 mt-0.5">{b.s}</p>
            </div>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth={2.5} strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </div>
        ))}
      </div>
    )

    if (tab === 'menu') return (
      <div>
        <div className="flex items-center gap-[14px] pb-[14px] border-b border-gray-100 dark:border-gray-800 mb-1.5">
          <div className="w-[50px] h-[50px] rounded-full bg-gold-gradient flex items-center justify-center font-bold text-white text-[18px]">TN</div>
          <div>
            <p className="text-base font-bold text-gray-900 dark:text-white">Thabo Nkosi</p>
            <p className="text-[12px] text-gray-400 dark:text-gray-500">Owner-driver · #10842</p>
          </div>
        </div>
        {menuItems.map((m, i, arr) => (
          <button key={i} onClick={() => go(m.k as any)}
            className={cn('w-full flex items-center justify-between py-[13px] bg-transparent border-none cursor-pointer', i < arr.length - 1 && 'border-b border-gray-100 dark:border-gray-800', 'border-b-0')}
            style={{ borderBottomWidth: i < arr.length - 1 ? 1 : 0, borderBottomStyle: 'solid', borderBottomColor: 'rgb(243 244 246)' }}>
            <span className="text-[15px] text-gray-900 dark:text-white">{m.l}</span>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" className="stroke-gray-300 dark:stroke-gray-600" strokeWidth={2.5} strokeLinecap="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
        <button onClick={() => go('welcome')}
          className="w-full mt-4 py-[14px] bg-gray-100 dark:bg-gray-800 border border-brand-red rounded-[13px] text-[14px] font-semibold text-brand-red cursor-pointer">
          Sign Out
        </button>
      </div>
    )

    return null
  }

  return (
    <div className="home-root">
      {/* Live Map */}
      <div className="map-container">
        <LiveMap sosActive={sos} sosCoords={[-26.1941, 28.0573]} searchResult={searchResult} />
      </div>

      {/* Gear button */}
      <button onClick={() => go('settings')} className="gear-btn">
        <GearIcon />
      </button>

      {/* SOS Confirm */}
      {sosStep === 1 && (
        <div className="sos-confirm-overlay">
          <div className="sos-confirm-card">
            <div className="w-14 h-14 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <svg width={26} height={26} viewBox="0 0 24 24" fill="none" className="stroke-brand-red" strokeWidth={2} strokeLinecap="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h2 className="text-[20px] font-bold text-gray-900 dark:text-white mb-2">Confirm Emergency</h2>
            <p className="text-[14px] text-gray-400 dark:text-gray-500 leading-relaxed mb-6">
              This will share your live GPS location and alert your emergency contacts.
            </p>
            <button onClick={confirmSOS}
              className="w-full py-[15px] bg-brand-red border-none rounded-[13px] text-white text-base font-bold mb-[10px] cursor-pointer">
              Confirm Emergency
            </button>
            <OutlineBtn label="Cancel" onClick={cancelSOS} />
          </div>
        </div>
      )}

      {/* SOS Active */}
      {sosStep === 2 && (
        <div className="sos-active-banner">
          <div className="sos-active-inner">
            <div className="sos-pulse" />
            <div className="flex-1">
              <p className="text-[13px] font-bold text-white">SOS ACTIVE · Tracking live</p>
              <p className="text-[11px] text-white/75 mt-0.5">Support dispatched · ETA 4 min</p>
            </div>
            <button onClick={cancelSOS} className="bg-white/20 border-none rounded-lg px-[10px] py-1 text-white text-[12px] font-semibold cursor-pointer">Cancel</button>
          </div>
        </div>
      )}

      {/* SOS Resolved */}
      {sosStep === 3 && (
        <div className="sos-active-banner">
          <div className="sos-resolved-inner">
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div className="flex-1">
              <p className="text-[13px] font-bold text-white">Support arrived</p>
              <p className="text-[11px] text-white/70">Tap resolve when safe</p>
            </div>
            <button onClick={resolveSOS} className="bg-white/15 border-none rounded-lg px-[10px] py-1 text-white text-[12px] cursor-pointer">Resolve</button>
          </div>
        </div>
      )}

      {/* Bottom sheet + nav */}
      <div className="bottom-sheet-wrapper">
        <div className="bottom-sheet" key={tab}>
          <div className="px-5 pt-3 flex-shrink-0">
            <div className="sheet-handle" />
          </div>
          <div className="sheet-body">{sheetContent()}</div>
        </div>

        <nav className="bottom-nav">
          {NAV.map(({ k, l, ic }) => {
            const active = tab === k
            return (
              <button key={k} onClick={() => setTab(k)} className="nav-btn">
                {ic(active)}
                <span className={cn('nav-label', active ? 'nav-label-active' : '',
                  active && k === 'safety' ? 'text-brand-red' :
                  active ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-500')}>
                  {l}
                </span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Wallet modals */}
      {showAdd && (
        <AddFundsModal
          onClose={() => setShowAdd(false)}
          onSuccess={(amt) => {
            setWalletBal(b => b + amt)
            setTxs(p => [{ id: Date.now(), l: 'Funds added via PayFast', a: amt, t: 'Just now', type: 'credit' }, ...p])
          }}
        />
      )}
      {showWith && (
        <WithdrawModal
          balance={walletBal}
          onClose={() => setShowWith(false)}
          onSuccess={(amt) => {
            setWalletBal(b => b - amt)
            setTxs(p => [{ id: Date.now(), l: 'Withdrawal via EFT', a: -amt, t: 'Just now', type: 'debit' }, ...p])
          }}
        />
      )}
    </div>
  )
}

export default HomePage
