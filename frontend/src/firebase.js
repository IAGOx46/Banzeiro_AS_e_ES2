// frontend/src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyA_s9aU_u4y9-QdKAJaTve8md9FZxc5CS8",
  authDomain: "banzeiro-5f94c.firebaseapp.com",
  projectId: "banzeiro-5f94c",
  storageBucket: "banzeiro-5f94c.firebasestorage.app",
  messagingSenderId: "485805652054",
  appId: "1:485805652054:web:fe648f81b3bdf94ceca3f7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app); // <- aqui exportamos messaging

export default app;
