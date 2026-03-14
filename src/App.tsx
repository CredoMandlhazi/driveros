import React, { useState, useCallback } from 'react'
import { ThemeProvider } from './context/ThemeContext'
import { Screen, ServiceKey } from './types'

import SplashPage         from './pages/SplashPage'
import WelcomePage        from './pages/WelcomePage'
import SignInPage         from './pages/SignInPage'
import CreateAccountPage  from './pages/CreateAccountPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage           from './pages/HomePage'
import ServicePage        from './pages/ServicePage'
import ProfilePage        from './pages/ProfilePage'
import CompliancePage     from './pages/CompliancePage'
import EarningsPage       from './pages/EarningsPage'
import AssociationPage    from './pages/AssociationPage'
import NotificationsPage  from './pages/NotificationsPage'
import HelpPage           from './pages/HelpPage'
import SettingsPage       from './pages/SettingsPage'

const App: React.FC = () => {
  const [screen,  setScreen]  = useState<Screen>('splash')
  const [svcType, setSvcType] = useState<ServiceKey | null>(null)

  const go = useCallback((s: Screen | `svc_${string}`) => {
    if (s.startsWith('svc_')) {
      setSvcType(s.replace('svc_', '') as ServiceKey)
      setScreen('service')
      return
    }
    setScreen(s as Screen)
  }, [])

  const render = () => {
    switch (screen) {
      case 'splash':        return <SplashPage         go={go} />
      case 'welcome':       return <WelcomePage        go={go} />
      case 'signin':        return <SignInPage         go={go} />
      case 'create':        return <CreateAccountPage  go={go} />
      case 'forgot':        return <ForgotPasswordPage go={go} />
      case 'home':          return <HomePage           go={go} />
      case 'service':       return <ServicePage        type={svcType} go={go} />
      case 'profile':       return <ProfilePage        go={go} />
      case 'compliance':    return <CompliancePage     go={go} />
      case 'earnings':      return <EarningsPage       go={go} />
      case 'association':   return <AssociationPage    go={go} />
      case 'notifications': return <NotificationsPage  go={go} />
      case 'help':          return <HelpPage           go={go} />
      case 'settings':      return <SettingsPage       go={go} />
      default:              return <HomePage           go={go} />
    }
  }

  return (
    <ThemeProvider>
      <div className="app-root">{render()}</div>
    </ThemeProvider>
  )
}

export default App
