// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB862bOgkjOQ7tqkkt-ZpaHuXpeOe2-3Oc",
  authDomain: "hr-system-eb667.firebaseapp.com",
  projectId: "hr-system-eb667",
  storageBucket: "hr-system-eb667.appspot.com",
  messagingSenderId: "79860180426",
  appId: "1:79860180426:web:02fd7bf3a5fd3d1e669b33",
  measurementId: "G-8VHVLFD142"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };