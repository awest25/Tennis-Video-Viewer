import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { db, storage } from '../services/initializeFirebase.js'; // Ensure storage is exported from initializeFirebase.js

// Define the uploadMatch function
async function uploadMatch(matchName, videoId, pointsJson, pdfFile) {
  if (!matchName || !videoId || !pointsJson) {
    console.error("All fields are required.");
    return; // Exit the function if any field is empty
  }

  try {
    let pdfUrl = null;
    if (pdfFile) {
      // First, upload the PDF to Firebase Storage
      const pdfRef = ref(storage, `match-pdfs/${pdfFile.name}`);
      const snapshot = await uploadBytes(pdfRef, pdfFile);
      pdfUrl = await getDownloadURL(snapshot.ref);
    }

    // Then, save the match data along with the PDF URL to Firestore
    const docRef = await addDoc(collection(db, "matches"), {
      name: matchName,
      videoId: videoId,
      points: pointsJson,
      pdfUrl: pdfUrl
    });
    console.log("Document written with ID: ", docRef.id);
    
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

export default uploadMatch;
