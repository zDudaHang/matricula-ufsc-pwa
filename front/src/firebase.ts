import { initializeApp } from 'firebase/app'
import { onMessage } from 'firebase/messaging'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAP_Nr9rkSJ0g7hvQKbjQI9UH_Jy6kK_u0',
  authDomain: 'matricula-ufsc.firebaseapp.com',
  projectId: 'matricula-ufsc',
  storageBucket: 'matricula-ufsc.appspot.com',
  messagingSenderId: '544318734893',
  appId: '1:544318734893:web:5f826baad5a07047f32ea4',
}

// Initialize Firebase
export default initializeApp(firebaseConfig)

// export const fetchToken = (setTokenFound) => {
//   return getToken(messaging, {vapidKey: 'BHGPr3pJQSflJAJtTIVXbmcEXlPV_HP29TZQRcqrGCN10gKIa-ojIJmtvM9kQGcsNKsWIA6ezKFG8Bd6LTjaVc0'}).then((currentToken) => {
//     if (currentToken) {
//       console.log('current token for client: ', currentToken);
//       setTokenFound(true);
//       // Track the token -> client mapping, by sending to backend server
//       // show on the UI that permission is secured
//     } else {
//       console.log('No registration token available. Request permission to generate one.');
//       setTokenFound(false);
//       // shows on the UI that permission is required
//     }
//   }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // catch error while creating client token
//   });
// }
