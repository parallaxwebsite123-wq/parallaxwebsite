// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCzpxoPOj75U_dGzzAejOppRGbrShceh4s",
  authDomain: "parallax-perfumery.firebaseapp.com",
  projectId: "parallax-perfumery",
  storageBucket: "parallax-perfumery.firebasestorage.app",
  messagingSenderId: "324839835149",
  appId: "1:324839835149:web:22075cfdee31d85441f744",
  measurementId: "G-VBX6R7NQT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, analytics, auth, db, storage };
