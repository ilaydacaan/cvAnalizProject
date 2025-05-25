import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBaGdIEWxoV1x9IkeyR_PvvS_nMdpCg4Fo",
  authDomain: "cvanaliz-b4b73.firebaseapp.com",
  projectId: "cvanaliz-b4b73",
  storageBucket: "cvanaliz-b4b73.firebasestorage.app",
  messagingSenderId: "666965919907",
  appId: "1:666965919907:web:e53e438f669a2e4bcd5716",
  measurementId: "G-SBBXHX9S1R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); 
