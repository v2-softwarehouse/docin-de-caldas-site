
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAcLPV3-W2YOorc_JT4AUwHtRRYzA8F0dU",
  authDomain: "docin-de-caldas.firebaseapp.com",
  databaseURL: "https://docin-de-caldas-default-rtdb.firebaseio.com",
  projectId: "docin-de-caldas",
  storageBucket: "docin-de-caldas.firebasestorage.app",
  messagingSenderId: "658690196453",
  appId: "1:658690196453:web:657a592e147ef06318650c",
  measurementId: "G-NFDL9MPF2Y"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
