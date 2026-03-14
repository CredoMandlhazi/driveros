import React, { ReactNode, InputHTMLAttributes, SelectHTMLAttributes } from 'react'
import { cn } from '../utils/cn'

/* ── GoldBtn ───────────────────────────────────────────────── */
interface GoldBtnProps {
  label: string
  onClick?: () => void
  loading?: boolean
  className?: string
  small?: boolean
}
export const GoldBtn: React.FC<GoldBtnProps> = ({ label, onClick, loading, className, small }) => (
  <button
    onClick={onClick}
    className={cn(
      small ? 'btn-gold-small' : 'btn-gold',
      loading && 'btn-gold-loading',
      className
    )}
  >
    {loading ? 'Please wait…' : label}
  </button>
)

/* ── OutlineBtn ────────────────────────────────────────────── */
interface OutlineBtnProps { label: string; onClick?: () => void; className?: string }
export const OutlineBtn: React.FC<OutlineBtnProps> = ({ label, onClick, className }) => (
  <button onClick={onClick} className={cn('btn-outline', className)}>{label}</button>
)

/* ── TextBtn ───────────────────────────────────────────────── */
interface TextBtnProps { label: string; onClick?: () => void; className?: string }
export const TextBtn: React.FC<TextBtnProps> = ({ label, onClick, className }) => (
  <button onClick={onClick} className={cn('btn-text', className)}>{label}</button>
)

/* ── BackBtn ───────────────────────────────────────────────── */
export const BackBtn: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <button onClick={onBack} className="btn-back">
    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
      className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={2.5} strokeLinecap="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  </button>
)

/* ── FInput ────────────────────────────────────────────────── */
export const FInput: React.FC<InputHTMLAttributes<HTMLInputElement> & { className?: string }> = ({ className, ...rest }) => (
  <input {...rest} className={cn('f-input', className)} />
)

/* ── FSelect ───────────────────────────────────────────────── */
export const FSelect: React.FC<SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }> = ({ children, className, ...rest }) => (
  <div className="relative">
    <select {...rest} className={cn('f-select', className)}>{children}</select>
    <svg width={16} height={16} viewBox="0 0 24 24" fill="none"
      className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none stroke-gray-400" strokeWidth={2.5} strokeLinecap="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  </div>
)

/* ── Badge ─────────────────────────────────────────────────── */
export const Badge: React.FC<{ label: string }> = ({ label }) => (
  <span className="badge">{label}</span>
)

/* ── Card ──────────────────────────────────────────────────── */
interface CardProps { children: ReactNode; className?: string; onClick?: () => void }
export const Card: React.FC<CardProps> = ({ children, className, onClick }) => (
  <div onClick={onClick} className={cn('card', onClick && 'cursor-pointer', className)}>
    {children}
  </div>
)

/* ── GoldCard ──────────────────────────────────────────────── */
export const GoldCard: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={cn('card-gold', className)}>{children}</div>
)

/* ── Divider ───────────────────────────────────────────────── */
export const Divider: React.FC = () => <div className="divider" />

/* ── Toggle ────────────────────────────────────────────────── */
export const Toggle: React.FC<{ on: boolean; toggle: () => void }> = ({ on, toggle }) => (
  <div onClick={toggle} className={cn('toggle-track', on ? 'toggle-track-on' : 'toggle-track-off')}>
    <div className={cn('toggle-thumb', on ? 'toggle-thumb-on' : 'toggle-thumb-off')} />
  </div>
)

/* ── Modal ─────────────────────────────────────────────────── */
export const Modal: React.FC<{ children: ReactNode; onClose: () => void }> = ({ children, onClose }) => (
  <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
    <div className="modal-sheet">
      <div className="modal-handle" />
      {children}
    </div>
  </div>
)

/* ── ScreenHeader ──────────────────────────────────────────── */
interface ScreenHeaderProps { title: string; onBack?: () => void; right?: ReactNode }
export const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBack, right }) => (
  <div className="screen-header">
    {onBack && <BackBtn onBack={onBack} />}
    <div className={cn('screen-title', !onBack && 'text-center')}>{title}</div>
    {right || <div className="w-[38px]" />}
  </div>
)

/* ── OtpInput ──────────────────────────────────────────────── */
export const OtpInput: React.FC<{ otp: string[]; setOtp: (v: string[]) => void; prefix: string }> = ({ otp, setOtp, prefix }) => (
  <div className="flex gap-[9px] justify-center mb-6">
    {otp.map((v, i) => (
      <input
        key={i}
        id={`${prefix}-${i}`}
        maxLength={1}
        value={v}
        onChange={(e) => {
          const n = [...otp]; n[i] = e.target.value.slice(-1); setOtp(n)
          if (e.target.value && i < 5) (document.getElementById(`${prefix}-${i + 1}`) as HTMLInputElement)?.focus()
        }}
        className={cn('otp-input', v && 'otp-input-filled')}
      />
    ))}
  </div>
)

/* ── GearIcon ──────────────────────────────────────────────── */
export const GearIcon: React.FC = () => (
  <svg width={20} height={20} viewBox="0 0 24 24" fill="none"
    className="stroke-gray-500 dark:stroke-gray-400" strokeWidth={1.8} strokeLinecap="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

/* ── SectionLabel ──────────────────────────────────────────── */
export const SectionLabel: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="section-label">{children}</div>
)

/* ── FieldLabel ────────────────────────────────────────────── */
export const FieldLabel: React.FC<{ children: ReactNode }> = ({ children }) => (
  <div className="field-label">{children}</div>
)

/* ── AuthProgress ──────────────────────────────────────────── */
export const AuthProgress: React.FC<{ step: number; total: number }> = ({ step, total }) => (
  <div>
    <div className="auth-progress-bar">
      <div className="auth-progress-fill" style={{ width: `${(step / total) * 100}%` }} />
    </div>
    <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">Step {step} of {total}</p>
  </div>
)
