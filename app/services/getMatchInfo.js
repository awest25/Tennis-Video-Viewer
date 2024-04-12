import { db } from '../services/initializeFirebase';
import { doc, getDoc } from 'firebase/firestore';

async function fetchMatchInfo(documentId) {
  const docRef = doc(db, "matches", documentId); // Specify the collection and document ID
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    // Return the document data if it exists
    return { id: docSnap.id, ...docSnap.data() };
  } else {
    // Log an error or handle the case where the document does not exist
    console.error("No such document!");
    return null; // Return null or an appropriate value indicating the document was not found
  }
}

export default fetchMatchInfo;