import { createContext, useState } from 'react'
import { NotificationContextModel } from './model'

export const NotificationStatusContext = createContext<NotificationContextModel>(null)

interface NotificationStatusProviderProps {
  children: React.ReactNode
}

export function NotificationStatusProvider(props: NotificationStatusProviderProps) {
  const [isNotificationAllowed, setIsNotificationAllowed] = useState<boolean>(Notification.permission === 'granted')

  return (
    <NotificationStatusContext.Provider
      value={{
        isNotificationAllowed,
        setIsNotificationAllowed,
      }}
    >
      {props.children}
    </NotificationStatusContext.Provider>
  )
}
