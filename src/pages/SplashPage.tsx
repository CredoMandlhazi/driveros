import React, { useEffect, useState } from 'react'
import { GoFn } from '../types'
import logo from '../assets/logo.png'

interface Props { go: GoFn }

const SplashPage: React.FC<Props> = ({ go }) => {
  const [op, setOp] = useState(0)
  useEffect(() => {
    const a = setTimeout(() => setOp(1), 80)
    const b = setTimeout(() => { setOp(0); setTimeout(() => go('welcome'), 500) }, 2800)
    return () => { clearTimeout(a); clearTimeout(b) }
  }, [go])
  return (
    <div className="splash-root" style={{ opacity: op }}>
      <img src={logo} alt="DriverOS" className="w-40 object-contain dark:invert" />
    </div>
  )
}
export default SplashPage
