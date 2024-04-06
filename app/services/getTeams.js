import { storage, db } from '../services/initializeFirebase.js'; // Ensure storage is exported from initializeFirebase.js
import { ref, listAll, getDownloadURL } from "firebase/storage"; // Import storage functions
import { collection, getDocs } from 'firebase/firestore';

const teamsRef = ref(storage, 'logos');

const getLogos = async() => {
  try {
    const querySnapshot = await getDocs(collection(db, 'teams'));
    const teams = querySnapshot.docs.map((doc) => doc.data());
    return teams;
  } catch (error) {
    console.error('Error retrieving files:', error);
    throw error;
  }
};

export default getLogos;