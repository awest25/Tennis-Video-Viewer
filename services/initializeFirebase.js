// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBOvEiiwKE_Q_aTWdyOpTIDmYmbPHA9KOg",
  authDomain: "match-viewing-dashboard.firebaseapp.com",
  projectId: "match-viewing-dashboard",
  storageBucket: "match-viewing-dashboard.appspot.com",
  messagingSenderId: "276222404565",
  appId: "1:276222404565:web:d295bf29156c4bb4a73f5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firestore service
const db = getFirestore(app);

export default db;