import { collection, getDocs } from 'firebase/firestore';
import db from '../services/initializeFirebase.js'; // Ensure this imports the Firebase instance

async function fetchMatchesData() {
  const matchesCollection = collection(db, 'matches');
  const querySnapshot = await getDocs(matchesCollection);
  const matchesData = [];

  querySnapshot.forEach((doc) => {
    const matchData = doc.data();
    // Push each matchData object to the matchesData array
    matchesData.push(matchData);
  });

  return matchesData; // Return the array containing all matchData objects
}

export { fetchMatchesData };


// console output works

// import { collection, getDocs } from 'firebase/firestore';
// import db from '../services/initializeFirebase.js'; // Ensure this imports the Firebase instance

// // Function to fetch matches data
// async function fetchMatchesData() {
//   const matchesCollection = collection(db, 'matches');
//   const querySnapshot = await getDocs(matchesCollection);

//   // Process the retrieved data
//   querySnapshot.forEach((doc) => {
//     // Access individual documents using doc.data()
//     const matchData = doc.data();
//     // Process or display matchData as needed
//     console.log(matchData);
//   });
// }

// export { fetchMatchesData };




// import { collection, getDocs } from 'firebase/firestore';
// import db from '../services/initializeFirebase.js'; // Ensure this imports the Firebase instance

// // Function to fetch matches data
// async function fetchMatchesData() {
//   const matchesCollection = collection(db, 'matches');
//   const querySnapshot = await getDocs(matchesCollection);

//   // Process the retrieved data
//   querySnapshot.forEach((doc) => {
//     // Access individual documents using doc.data()
//     const matchData = doc.data();
//     // Process or display matchData as needed
//     console.log(matchData);
//   });
// }

// export { fetchMatchesData };

