// Import the necessary Firebase libraries
import { collection, addDoc } from "firebase/firestore";
import '../services/initializeFirebase.js'; // Initialize Firebase on the client side
import db from '../services/initializeFirebase.js';

// Define the uploadMatch function
async function uploadMatch(matchName, videoUrl, pointsJson) {
  if (!matchName && !videoUrl && !pointsJson) {
    console.error("All fields are empty.");
    return; // Exit the function if all fields are empty
  }

  if (!matchName) {
    console.error("Match name is empty.");
    return; // Exit the function if matchName is empty
  }

  if (!videoUrl) {
    console.error("Video URL is empty.");
    return; // Exit the function if videoUrl is empty
  }

  if (!pointsJson) {
    console.error("Points JSON is empty.");
    return; // Exit the function if pointsJson is empty
  }

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
