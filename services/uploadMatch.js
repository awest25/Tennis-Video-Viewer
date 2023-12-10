// Import the necessary Firebase libraries
import { getFirestore, collection, addDoc } from "firebase/firestore";
import '../services/initializeFirebase.js'; // Initialize Firebase on the client side
import db from '../services/initializeFirebase.js';

// Define the uploadMatch function
async function uploadMatch(matchName, videoUrl, pointsJson) {
  try {
    const docRef = await addDoc(collection(db, "matches"), {
      name: matchName,
      url: videoUrl,
      points: pointsJson
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default uploadMatch;