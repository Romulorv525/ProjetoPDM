import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";// For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyAlBgc0exquJBcRDz3BOT1L3m5cnUv0xBY",
    authDomain: "projeto-progdispmoveis.firebaseapp.com",
    projectId: "projeto-progdispmoveis",
    storageBucket: "projeto-progdispmoveis.firebasestorage.app",
    messagingSenderId: "814425908289",
    appId: "1:814425908289:web:70ffb78389aa18697492c0",
    measurementId: "G-F64W78NWRY"
  };

  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };