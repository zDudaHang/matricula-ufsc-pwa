import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import { fetchWithAuthorization } from '../fetch'
import firebase from '../firebase'
// import firebase from '../firebase'

export function verifyNotificationPermission() {
  if (!window.Notification) {
    alert('The browser does not support notifications')
  } else {
    const permission = Notification.permission
    if (permission === 'default') {
      Notification.requestPermission().then((status) => {
        if (status === 'denied') {
          alert(
            'You have denied permission for notifications. Please go to your browser or mobile settings and enable notifications'
          )
          return
        }
      })
    } else if (permission === 'denied') {
      alert(
        'You have denied permission for notifications. Please go to your browser or mobile settings and enable notifications'
      )
    } else {
      subscribeUser()
    }
  }
}

const PUBLIC_KEY = 'BKeDin_xnLD8OmBUskj2lOxYfTDVTDvVOvQCQg3nwJvlaRKzadOOq0LcvG1hW8hPDxLSqdluei-Fl17AGN-cRGk'

export function subscribeUser() {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.ready.then((reg) => {
      reg.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(PUBLIC_KEY),
        })
        .then(
          async () => {
            const messaging = getMessaging(firebase)
            const onMessageListener = () =>
              new Promise((resolve) => {
                onMessage(messaging, (payload) => {
                  console.log(payload)
                  resolve(payload)
                })
              })

            const token = await getToken(messaging)
            console.log('Your token is:', token)
            const body = {
              token,
            }
            fetchWithAuthorization('subscribe', {
              method: 'POST',
              body: JSON.stringify(body),
              headers: {
                'Content-Type': 'application/json',
              },
            }).then((response) => console.log(response))
          },
          (error) => console.log(error)
        )
    })
  }
}

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
