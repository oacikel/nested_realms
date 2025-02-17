// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { connectDatabaseEmulator, getDatabase, ref } from 'firebase/database'
import { getAnalytics, isSupported } from 'firebase/analytics'
import { connectAuthEmulator, getAuth } from 'firebase/auth'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDH4Qx6zoiWZlwwVEPxpCCRDdgAAQcb_44',
  authDomain: 'nested-realms.firebaseapp.com',
  projectId: 'nested-realms',
  storageBucket: 'nested-realms.firebasestorage.app',
  messagingSenderId: '1018412166235',
  appId: '1:1018412166235:web:20e5e84af8e8017b9a237e',
  measurementId: 'G-1RWME7GFEF',
  databaseURL: 'https://nested-realms-default-rtdb.firebaseio.com/',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app)

let analytics
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app)
  }
})
const db = getDatabase(app)

// Use Emulator in local development
if (process.env.NODE_ENV === 'development') {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, '127.0.0.1', 9000)
  connectAuthEmulator(auth, 'http://127.0.0.1:9099')
}

export { db, app, auth, analytics, ref }
