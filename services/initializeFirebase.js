// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA_7lXGGRh4eVuOcNhK1Jhp47ouFDu9u8E",
  authDomain: "ucla-tennis-matches.firebaseapp.com",
  projectId: "ucla-tennis-matches",
  storageBucket: "ucla-tennis-matches.appspot.com",
  messagingSenderId: "552976318070",
  appId: "1:552976318070:web:aa3dbe77adabbce1612957"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firestore service
const db = getFirestore(app);

export default db;