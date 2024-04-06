import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // Import storage functions
import { db, storage } from '../services/initializeFirebase.js'; // Ensure storage is exported from initializeFirebase.js

async function uploadMatch(matchName, videoId, pointsJson, pdfFile, clientTeam, opponentTeam) {
  if (!matchName || !videoId || !pointsJson || !clientTeam || !opponentTeam) {
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
      pdfUrl: pdfUrl,
      clientTeam,
      opponentTeam
    });
    console.log("Match Document written with ID: ", docRef.id);
    
  } catch (e) {
    console.error("Error adding Match Document: ", e);
  }
}

async function uploadTeam(teamName, logoFile) {
  if (!teamName || !logoFile) {
    console.error("All fields are required.");
    return; // Exit the function if any field is empty
  }

  try {
    let logoUrl = null;
    if (logoFile) {
      // First, upload the PNG/JPG to Firebase Storage
      const logoRef = ref(storage, `logos/${logoFile.name}`);
      const snapshot = await uploadBytes(logoRef, logoFile);
      logoUrl = await getDownloadURL(snapshot.ref);
    }

    // Then, save the match data along with the PDF URL to Firestore
    const docRef = await addDoc(collection(db, "teams"), {
      name: teamName,
      logoUrl: logoUrl,
    });
    console.log("Team Document written with ID: ", docRef.id);
    
  } catch (e) {
    console.error("Error adding Team Document: ", e);
  }
}

export default {uploadMatch, uploadTeam};
