import { useContext } from 'react'
import { NotificationStatusContext } from './NotificationStatusProvider'

export const useNotificationStatus = () => {
  return useContext(NotificationStatusContext)
}
