import React, { useState } from 'react'
import { Modal, GoldBtn, OutlineBtn, TextBtn, FInput, FSelect } from './UI'

/* ── Add Funds ─────────────────────────────────────────────── */
interface AddFundsProps { onClose: () => void; onSuccess: (amt: number) => void }

export const AddFundsModal: React.FC<AddFundsProps> = ({ onClose, onSuccess }) => {
  const [step,   setStep]   = useState(1)
  const [amount, setAmount] = useState('')
  const [card,   setCard]   = useState({ num: '', exp: '', cvv: '', name: '' })
  const [loading, setLoading] = useState(false)
  const presets = ['100', '200', '500', '1000']
  const upCard = (k: keyof typeof card) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCard(p => ({ ...p, [k]: e.target.value }))

  const pay = () => {
    if (!card.num || !card.exp || !card.cvv || !card.name) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(3) }, 2000)
  }

  return (
    <Modal onClose={onClose}>
      <div className="px-6 pt-5">
        <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-1">Add Funds</h2>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-5">Secure payment via PayFast</p>
      </div>

      {step === 1 && (
        <div className="px-6 pb-6">
          <p className="text-[13px] font-semibold text-gray-600 dark:text-gray-400 mb-[10px]">Select Amount</p>
          <div className="grid grid-cols-2 gap-[10px] mb-4">
            {presets.map(p => (
              <button key={p} onClick={() => setAmount(p)}
                className={`wallet-preset-btn ${amount === p ? 'wallet-preset-active' : 'wallet-preset-inactive'}`}>
                R {p}
              </button>
            ))}
          </div>
          <p className="text-[13px] font-semibold text-gray-600 dark:text-gray-400 mb-2">Or enter custom amount</p>
          <div className="relative mb-5">
            <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-base font-semibold text-gray-900 dark:text-white">R</span>
            <FInput type="number" placeholder="0.00" value={amount}
              onChange={e => setAmount(e.target.value)} className="pl-7" />
          </div>
          <GoldBtn label={`Continue — R${amount || '0'}`} onClick={() => amount && setStep(2)} />
        </div>
      )}

      {step === 2 && (
        <div className="px-6 pb-6">
          {/* PayFast badge */}
          <div className="payfast-badge">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-800 flex items-center justify-center flex-shrink-0">
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round">
                <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
              </svg>
            </div>
            <div>
              <p className="text-[13px] font-bold text-gray-900 dark:text-white">Secure Payment — PayFast</p>
              <p className="text-[11px] text-gray-400 dark:text-gray-500">256-bit SSL · PCI DSS compliant</p>
            </div>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth={2.5} strokeLinecap="round" className="ml-auto">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><polyline points="9 12 11 14 15 10" />
            </svg>
          </div>
          <p className="text-[22px] font-bold text-gold text-center mb-5">R {parseFloat(amount).toFixed(2)}</p>

          <p className="text-[12px] font-semibold text-gray-500 mb-[6px]">CARD NUMBER</p>
          <FInput placeholder="0000 0000 0000 0000" value={card.num} onChange={upCard('num')} maxLength={19} className="mb-[14px]" />
          <div className="flex gap-3 mb-[14px]">
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-gray-500 mb-[6px]">EXPIRY</p>
              <FInput placeholder="MM / YY" value={card.exp} onChange={upCard('exp')} maxLength={7} />
            </div>
            <div className="flex-1">
              <p className="text-[12px] font-semibold text-gray-500 mb-[6px]">CVV</p>
              <FInput placeholder="•••" type="password" value={card.cvv} onChange={upCard('cvv')} maxLength={4} />
            </div>
          </div>
          <p className="text-[12px] font-semibold text-gray-500 mb-[6px]">CARDHOLDER NAME</p>
          <FInput placeholder="Name on card" value={card.name} onChange={upCard('name')} className="mb-5" />
          <GoldBtn label={loading ? 'Processing payment…' : `Pay R${parseFloat(amount).toFixed(2)}`} onClick={pay} loading={loading} />
          <div className="text-center mt-3"><TextBtn label="← Change amount" onClick={() => setStep(1)} /></div>
        </div>
      )}

      {step === 3 && (
        <div className="px-6 pt-6 text-center">
          <div className="success-icon-wrap">
            <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth={2.5} strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
          <p className="text-[15px] font-bold text-gold mb-1">R {parseFloat(amount).toFixed(2)} added</p>
          <p className="text-[14px] text-gray-400 dark:text-gray-500 leading-relaxed mb-7">
            Your DriverOS wallet has been topped up. Funds are available immediately.
          </p>
          <GoldBtn label="Done" onClick={() => { onSuccess(parseFloat(amount)); onClose() }} />
          <div className="h-2" />
        </div>
      )}
    </Modal>
  )
}

/* ── Withdraw ──────────────────────────────────────────────── */
interface WithdrawProps { balance: number; onClose: () => void; onSuccess: (amt: number) => void }

export const WithdrawModal: React.FC<WithdrawProps> = ({ balance, onClose, onSuccess }) => {
  const [step,   setStep]   = useState(1)
  const [amount, setAmount] = useState('')
  const [bank,   setBank]   = useState({ name: '', acc: '', branch: '' })
  const [loading, setLoading] = useState(false)
  const banks = ['ABSA','FNB','Standard Bank','Nedbank','Capitec','TymeBank','Discovery Bank','African Bank']
  const upBank = (k: keyof typeof bank) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setBank(p => ({ ...p, [k]: e.target.value }))

  const submit = () => {
    if (!bank.name || !bank.acc || !bank.branch) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setStep(3) }, 1800)
  }

  return (
    <Modal onClose={onClose}>
      <div className="px-6 pt-5">
        <h2 className="text-[18px] font-bold text-gray-900 dark:text-white mb-1">Withdraw Funds</h2>
        <p className="text-[13px] text-gray-400 dark:text-gray-500 mb-4">
          Available: <strong className="text-gold">R {balance.toFixed(2)}</strong>
        </p>
      </div>

      {step === 1 && (
        <div className="px-6 pb-6">
          <p className="text-[13px] font-semibold text-gray-600 dark:text-gray-400 mb-2">Withdrawal Amount</p>
          <div className="relative mb-2">
            <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-base font-semibold text-gray-900 dark:text-white">R</span>
            <FInput type="number" placeholder="0.00" value={amount}
              onChange={e => setAmount(e.target.value)} className="pl-7" />
          </div>
          {amount && parseFloat(amount) > balance && (
            <p className="text-[12px] text-brand-red mb-3">Amount exceeds available balance</p>
          )}
          <div className="h-3" />
          <GoldBtn label="Continue" onClick={() => amount && parseFloat(amount) <= balance && setStep(2)} />
        </div>
      )}

      {step === 2 && (
        <div className="px-6 pb-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-white mb-4">Bank Details</h3>
          <p className="text-[12px] font-semibold text-gray-500 mb-[6px]">BANK</p>
          <FSelect value={bank.name} onChange={upBank('name') as React.ChangeEventHandler<HTMLSelectElement>} className="mb-[14px]">
            <option value="">Select bank</option>
            {banks.map(b => <option key={b} value={b}>{b}</option>)}
          </FSelect>
          <p className="text-[12px] font-semibold text-gray-500 mb-[6px]">ACCOUNT NUMBER</p>
          <FInput placeholder="Enter account number" value={bank.acc}
            onChange={upBank('acc') as React.ChangeEventHandler<HTMLInputElement>} type="number" className="mb-[14px]" />
          <p className="text-[12px] font-semibold text-gray-500 mb-[6px]">BRANCH CODE</p>
          <FInput placeholder="e.g. 250655" value={bank.branch}
            onChange={upBank('branch') as React.ChangeEventHandler<HTMLInputElement>} type="number" className="mb-5" />
          <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 mb-5 border border-gray-200 dark:border-gray-700">
            <p className="text-[12px] text-gray-400 dark:text-gray-500 leading-relaxed">
              Funds will be transferred via EFT within 1–2 business days. A R5 processing fee applies.
            </p>
          </div>
          <GoldBtn label={loading ? 'Processing…' : `Withdraw R${parseFloat(amount).toFixed(2)}`} onClick={submit} loading={loading} />
          <div className="text-center mt-3"><TextBtn label="← Change amount" onClick={() => setStep(1)} /></div>
        </div>
      )}

      {step === 3 && (
        <div className="px-6 pt-6 text-center">
          <div className="success-icon-wrap">
            <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth={2.5} strokeLinecap="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[22px] font-bold text-gray-900 dark:text-white mb-2">Withdrawal Requested</h2>
          <p className="text-[15px] font-bold text-gold mb-1">R {parseFloat(amount).toFixed(2)}</p>
          <p className="text-[14px] text-gray-400 dark:text-gray-500 leading-relaxed mb-7">
            Your withdrawal has been submitted and will arrive in your {bank.name} account within 1–2 business days.
          </p>
          <GoldBtn label="Done" onClick={() => { onSuccess(parseFloat(amount)); onClose() }} />
          <div className="h-2" />
        </div>
      )}
    </Modal>
  )
}
