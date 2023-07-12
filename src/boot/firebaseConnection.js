import { boot } from "quasar/wrappers"
import initialize from '../services/firebase'

const {firebaseApp, auth, db} = initialize({
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
})

export default boot(() => {
  // Validation that our service structure is working
  console.log('Firebase App Instantiation:', firebaseApp)
});

export { firebaseApp, auth, db }
