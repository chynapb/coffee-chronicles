import AsyncStorage from '@react-native-async-storage/async-storage'
import { initializeApp } from 'firebase/app'
import { initializeAuth, getReactNativePersistence } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: 'coffee-chronicles.firebaseapp.com',
  projectId: 'coffee-chronicles',
  storageBucket: 'coffee-chronicles.appspot.com',
  messagingSenderId: '558278334670',
  appId: '1:558278334670:web:57e676e6499486ca9c189f',
}

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig)
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
})
export const FIREBASE_DB = getFirestore(FIREBASE_APP)
