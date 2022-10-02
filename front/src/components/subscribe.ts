import { getToken } from 'firebase/messaging'
import { fetchWithAuthorization } from '../fetch'
import { messaging, PUBLIC_VAPID_KEY } from '../firebase'

export function requestPermission() {
  if (!window.Notification) {
    alert('The browser does not support notifications')
  } else {
    const permission = Notification.permission
    if (permission === 'default') {
      console.log(`[MATRICULA-UFSC-PWA] Permissao default`)
      Notification.requestPermission().then((status) => {
        if (status === 'denied') {
          alert(
            'You have denied permission for notifications. Please go to your browser or mobile settings and enable notifications'
          )
          return
        } else if (status === 'granted') {
          console.log(`[MATRICULA-UFSC-PWA] Permissao garantida`)
          subscribeUser()
        }
      })
    } else if (permission === 'denied') {
      alert(
        'You have denied permission for notifications. Please go to your browser or mobile settings and enable notifications'
      )
    } else {
      console.log(`[MATRICULA-UFSC-PWA] Permissao garantida`)
      subscribeUser()
    }
  }
}

export function subscribeUser() {
  console.log(`[MATRICULA-UFSC-PWA] Subscribing user...`)
  navigator.serviceWorker.ready.then((reg) => {
    getToken(messaging, {
      vapidKey: PUBLIC_VAPID_KEY,
    }).then((token) => {
      console.log(`[MATRICULA-UFSC-PWA] Enviando token(${token}) para o servidor`)
      fetchWithAuthorization('subscribe', {
        method: 'POST',
        body: JSON.stringify({ token }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(console.log)
        .catch(console.log)
    })
  })
}
