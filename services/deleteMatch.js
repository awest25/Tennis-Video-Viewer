
// deleteMatch.js (Service)

// 1. Import necessary Firebase functions for Firestore
import { deleteDoc, doc } from "firebase/firestore";
import db from '../services/initializeFirebase.js'; // Assuming Firebase db instance is imported

// 2. Define a function to delete a match document by ID
async function deleteMatchById(matchId) {
  try {
    // Create a reference to the specific match document in Firestore
    const matchDocRef = doc(db, "matches", matchId);

    // Delete the match document from Firestore
    await deleteDoc(matchDocRef);

    // Return success message or indication
    return { success: true, message: "Match deleted successfully" };
  } catch (error) {
    // Return error message if deletion fails
    return { success: false, message: "Error deleting match", error };
  }
}

// 3. Export the deleteMatchById function
export default deleteMatchById;