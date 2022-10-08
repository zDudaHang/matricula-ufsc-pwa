import { Alert } from 'bold-ui'
import { onMessage } from 'firebase/messaging'
import { useState } from 'react'
import { messaging } from '../firebase'

export function PushNotificationsAlert() {
  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  onMessage(messaging, (payload) => {
    console.log('[firebase.ts] Received foreground message ', payload)
    setShowAlert(true)

    const notificationTitle = payload.notification.title
    const body = payload.notification.body

    setMessage(`${notificationTitle} : ${body}`)
  })

  return (
    showAlert && (
      <Alert type='info' onCloseClick={() => setShowAlert(false)}>
        {message}
      </Alert>
    )
  )
}
