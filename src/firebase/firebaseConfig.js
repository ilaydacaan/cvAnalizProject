// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaGdIEWxoV1x9IkeyR_PvvS_nMdpCg4Fo",
  authDomain: "cvanaliz-b4b73.firebaseapp.com",
  projectId: "cvanaliz-b4b73",
  storageBucket: "cvanaliz-b4b73.firebasestorage.app",
  messagingSenderId: "666965919907",
  appId: "1:666965919907:web:e53e438f669a2e4bcd5716",
  measurementId: "G-SBBXHX9S1R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);