// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js')

firebase.initializeApp({
  apiKey: 'AIzaSyAP_Nr9rkSJ0g7hvQKbjQI9UH_Jy6kK_u0',
  authDomain: 'matricula-ufsc.firebaseapp.com',
  projectId: 'matricula-ufsc',
  storageBucket: 'matricula-ufsc.appspot.com',
  messagingSenderId: '544318734893',
  appId: '1:544318734893:web:5f826baad5a07047f32ea4',
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
