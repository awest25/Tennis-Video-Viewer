import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { db } from '../services/initializeFirebase.js'; // Ensure storage is exported from initializeFirebase.js

async function saveTaggingData(videoId, timeJson) {
    if (!videoId || !timeJson) {
      console.error("All fields are required.");
      return; // Exit the function if any field is empty
    }
  
    try {
      // Save data in tag-match.js to Firestore
      const querySnapshot = await getDocs(query(collection(db, "tag-match"), where("videoId", "==", videoId)));
      if (!querySnapshot.empty) {
        alert("Doc with same videoID exists! Someone worked on this: try loading it in!")
        return;
      }
      const docRef = await addDoc(collection(db, "tag-match"), {
        videoId: videoId,
        points: timeJson,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
}

  
export { saveTaggingData };