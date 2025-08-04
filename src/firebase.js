// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfOcvjxaj5GrLGYeH_tDdLuLflNtE5l8g",
  authDomain: "portfolio-website-34cf3.firebaseapp.com",
  projectId: "portfolio-website-34cf3",
  storageBucket: "portfolio-website-34cf3.appspot.com",
  messagingSenderId: "515279753525",
  appId: "1:515279753525:web:1fc3d5cf624deabeb5bc7c",
  measurementId: "G-QCC4LYM2W2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };