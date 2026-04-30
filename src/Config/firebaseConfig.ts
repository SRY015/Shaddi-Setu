import { initializeApp } from "firebase/app";
import {
  initializeFirestore,
  connectFirestoreEmulator,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Firebase Config from .env
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// App Check reCAPTCHA Site Key
const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

// Local emulator check
// const USE_EMULATOR = !import.meta.env.PROD;
const USE_EMULATOR = false;
// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);

// Firestore
export const db = initializeFirestore(firebaseApp, {
  ignoreUndefinedProperties: true,
});

// Auth
export const auth = getAuth(firebaseApp);

// Storage
export const storage = getStorage(firebaseApp);

// App Check
export const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(RECAPTCHA_SITE_KEY),
  isTokenAutoRefreshEnabled: true,
});

// Connect Emulators (only for local development)
if (USE_EMULATOR) {
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectStorageEmulator(storage, "localhost", 9199);

  console.log("Connected to Firebase Emulators");
}

export const COLLECTIONS = {
  users: "graminVivah/default/users",
  portfolios: "graminVivah/default/portfolios",
};
