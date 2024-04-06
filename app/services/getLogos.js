import { storage } from '../services/initializeFirebase.js'; // Ensure storage is exported from initializeFirebase.js
import { ref, listAll, getDownloadURL } from "firebase/storage"; // Import storage functions

const logosRef = ref(storage, 'logos');

const getLogos = async() => {
  try {
    const files = await listAll(logosRef);
    const logos = await Promise.all(files.items.map(async (item) => {
      const downloadURL = await getDownloadURL(item);
      const parsedName = item.name.split('.')[0];
      return { name: parsedName, downloadURL };
    }));
    return logos;
  } catch (error) {
    console.error('Error retrieving files:', error);
    throw error;
  }
};

export default getLogos;