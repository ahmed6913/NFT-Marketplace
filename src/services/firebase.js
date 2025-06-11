// src/services/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Use environment variables for Firebase config
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// For debugging: confirm your env vars load correctly
console.log("Firebase config:", firebaseConfig);

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

/**
 * Logs out the current user.
 * @returns {Promise<void>}
 */
export function logout() {
  return signOut(auth);
}

/**
 * Subscribes to Firebase authentication state changes.
 * @param {(user: import('firebase/auth').User|null) => void} callback 
 * @returns {() => void} Unsubscribe function
 */
export function subscribeAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
