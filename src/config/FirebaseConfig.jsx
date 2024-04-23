import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa6r4TcnmVG7pqRmM36ojYbDDrVdFWU4M",
  authDomain: "text-summarization-23e0c.firebaseapp.com",
  projectId: "text-summarization-23e0c",
  storageBucket: "text-summarization-23e0c.appspot.com",
  messagingSenderId: "936900022953",
  appId: "1:936900022953:web:e0ec1342640301fe4ecfb8",
  measurementId: "G-ZDEJVCP1B2"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);

