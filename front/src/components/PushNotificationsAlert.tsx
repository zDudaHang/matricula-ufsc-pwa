import { Alert } from 'bold-ui'
import { onMessage } from 'firebase/messaging'
import { useState } from 'react'
import { messaging } from '../notifications/firebase'

export function PushNotificationsAlert() {
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  onMessage(messaging, (payload) => {
    console.log('[PushNotificationsAlert] Received foreground message ', payload)
    const notificationTitle = payload.notification.title

    setMessage(`${notificationTitle}`)
    setShowAlert(true)
  })

  return (
    showAlert && (
      <Alert type='info' onCloseClick={() => setShowAlert(false)}>
        {message}
      </Alert>
    )
  )
}
