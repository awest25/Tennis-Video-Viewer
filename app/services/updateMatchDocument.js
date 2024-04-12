import { db } from '../services/initializeFirebase';
import { updateDoc, doc } from 'firebase/firestore';

/**
 * Updates fields in a match document with given updates.
 * @param {string} matchDocumentId - The ID of the document to update.
 * @param {Object} updates - An object containing the fields to update and their new values.
 */
export default async function updateMatchDocument(matchDocumentId, updates) {
    const matchDocRef = doc(db, "matches", matchDocumentId);
    try {
        await updateDoc(matchDocRef, updates);
        console.log("Match document successfully updated!");
    } catch (error) {
        console.error("Error updating match document: ", error);
    }
};
