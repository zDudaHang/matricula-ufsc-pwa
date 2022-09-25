import { createContext, useEffect, useState } from 'react'

export const OnlineStatusContext = createContext(true)

interface OnlineStatusProviderProps {
  children: React.ReactNode
}

export function OnlineStatusProvider(props: OnlineStatusProviderProps) {
  const [isOnline, setIsOnline] = useState<boolean>(true)

  useEffect(() => {
    window.addEventListener('offline', () => {
      console.log('[MATRICULA-UFSC-PWA] offline')
      setIsOnline(false)
    })
    window.addEventListener('online', () => {
      console.log('[MATRICULA-UFSC-PWA] online')
      setIsOnline(true)
    })

    // cleanup this component
    return () => {
      window.removeEventListener('offline', () => {
        console.log('[MATRICULA-UFSC-PWA] offline')
        setIsOnline(false)
      })
      window.removeEventListener('online', () => {
        console.log('[MATRICULA-UFSC-PWA] online')
        setIsOnline(true)
      })
    }
  }, [])

  return <OnlineStatusContext.Provider value={isOnline}>{props.children}</OnlineStatusContext.Provider>
}
