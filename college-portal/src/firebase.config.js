// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
  apiKey: "AIzaSyArzJHx8QMAx4rJAgGgIxV0G44qPkDNmmI",
  authDomain: "scholar-up1.firebaseapp.com",
  projectId: "scholar-up1",
  storageBucket: "scholar-up1.appspot.com",
  messagingSenderId: "1012802440689",
  appId: "1:1012802440689:web:8de0e7e1bd569171cb4850"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
