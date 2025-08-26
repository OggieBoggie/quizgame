import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCS08QrbJOawjyD2ns8JwdPacg08LK95FE",
  authDomain: "quizapp-7965b.firebaseapp.com",
  projectId: "quizapp-7965b",
  storageBucket: "quizapp-7965b.firebasestorage.app",
  messagingSenderId: "79900295683",
  appId: "1:79900295683:web:885f80a81ce997cedac436",
  measurementId: "G-4E8RVB9D8B"
}

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const firestore = getFirestore();
export default app;
