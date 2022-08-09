// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyAUXWaThwUp3Cis5nt__ETHadnrJr6lhhY",
  authDomain: "scholar-up.firebaseapp.com",
  projectId: "scholar-up",
  storageBucket: "scholar-up.appspot.com",
  messagingSenderId: "651848952192",
  appId: "1:651848952192:web:f1a6a7365bea5ef84ab965",
  measurementId: "G-0JFG3SHDCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
