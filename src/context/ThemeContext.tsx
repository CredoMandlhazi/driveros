import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface ThemeContextValue {
  isDark: boolean
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  setIsDark: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false)

  // Sync Tailwind dark class on <html>
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }, [isDark])

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
