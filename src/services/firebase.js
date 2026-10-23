/**
 * Firebase Client Stub / Configuration for FixMate
 * 
 * To connect to real Firebase Firestore & Auth:
 * 1. Install: npm install firebase
 * 2. Fill in the credentials below or supply VITE_FIREBASE_* env variables.
 * 3. Toggle isFirebaseEnabled to true.
 */

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDemoKeyOnlyFixMate2026",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fixmate-kadapa.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fixmate-kadapa",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fixmate-kadapa.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef12345678"
};

export const isFirebaseEnabled = false; // Initial version functional without credentials as requested

export const logFirebaseStatus = () => {
  console.info("FixMate Demo Mode: Firebase integration is structured and ready. Running local in-memory & LocalStorage mode for instant evaluation.");
};
