import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAcLPV3-W2YOorc_JT4AUwHtRRYzA8F0dU",
  authDomain: "docin-de-caldas.firebaseapp.com",
  databaseURL: "https://docin-de-caldas-default-rtdb.firebaseio.com",
  projectId: "docin-de-caldas",
  storageBucket: "docin-de-caldas.firebasestorage.app",
  messagingSenderId: "658690196453",
  appId: "1:658690196453:web:657a592e147ef06318650c",
  measurementId: "G-NFDL9MPF2Y"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

export function logout() {
  return signOut(auth);
}