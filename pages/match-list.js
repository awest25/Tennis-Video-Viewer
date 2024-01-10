import React, { useEffect, useState } from 'react';
import { fetchMatchesData } from '../services/fetchMatch.js';

function MatchList() {
  const [matchData, setMatchData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchMatchesData();
      setMatchData(data);
    }

    fetchData();
  }, []);

  return (
    <div>
      <button onClick={() => history.back()}>Home</button> {/* Home Button */}
      <h1>Match List</h1>
      {matchData ? (
        <ul>
          {matchData.map((match, index) => (
            <li key={index}>{match.name}</li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MatchList;


//error

// import React, { useState, useEffect } from 'react';
// import { fetchMatchesData } from '../services/fetchMatch'; // Import your fetchMatchesData service

// const MatchList = () => {
//   const [matchData, setMatchData] = useState(null);

//   useEffect(() => {
//     // Fetch match data when the component mounts
//     const fetchData = async () => {
//       try {
//         const matchesData = await fetchMatchesData(); // Call your service function
//         setMatchData(matchesData);
//       } catch (error) {
//         console.error('Error fetching matches:', error);
//       }
//     };

//     fetchData(); // Invoke the fetch function
//   }, []);

//   return (
//     <div>
//       <h2>Matches List</h2>
//       <ul>
//         {matchData.map((match, index) => (
//           <li key={index}>
//             {match.name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MatchList;



// import React, { useState, useEffect } from 'react';
// import { fetchMatchesData } from '../services/fetchMatch'; // Import your fetchMatchesData service

// const MatchList = () => {
// //   const [matchData, setMatchData] = useState([]); // Initialize as an empty array
//   const [matchData, setMatchData] = useState(null);

//   useEffect(() => {
//     // Fetch match data when the component mounts
//     const fetchData = async () => {
//       try {
//         const matchesData = await fetchMatchesData(); // Call your service function
//         setMatchData(matchesData || []); // Ensure matchesData is not null or undefined
//       } catch (error) {
//         console.error('Error fetching matches:', error);
//       }
//     };

//     fetchData(); // Invoke the fetch function
//   }, []);

//   // Function to handle match deletion by name
//   const handleMatchDeletion = (name) => {
//     // Filter out the match with the specified name and update the matchData state
//     const updatedMatchData = matchData.filter((match) => match.name !== name);
//     setMatchData(updatedMatchData);
//   };

//   return (
//     <div>
//       <h2>Matches List</h2>
//       <ul>
//         {matchData.map((match, index) => (
//           <li key={index}>
//             <span>{match.name}</span>
//             <button onClick={() => handleMatchDeletion(match.name)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MatchList;



// correct object no loading

// import React, { useState, useEffect } from 'react';
// import { fetchMatchesData } from '../services/fetchMatch'; // Import your fetchMatchesData service

// const MatchList = () => {
//   const [matchData, setMatchData] = useState(null);

//   useEffect(() => {
//     // Fetch match data when the component mounts
//     const fetchData = async () => {
//       try {
//         const matchesData = await fetchMatchesData(); // Call your service function
//         setMatchData(matchesData || []); // Ensure matchesData is not null or undefined
//       } catch (error) {
//         console.error('Error fetching matches:', error);
//       }
//     };

//     fetchData(); // Invoke the fetch function
//   }, []);

//   // Function to handle match deletion by name
//   const handleMatchDeletion = (name) => {
//     if (!matchData) return; // Ensure matchData is defined before attempting deletion

//     // Filter out the match with the specified name and update the matchData state
//     const updatedMatchData = matchData.filter((match) => match.name !== name);
//     setMatchData(updatedMatchData);
//   };

//   return (
//     <div>
//       <h2>Matches List</h2>
//       <ul>
//         {matchData &&
//           matchData.map((match, index) => (
//             <li key={index}>
//               <span>{match.name}</span>
//               <button onClick={() => handleMatchDeletion(match.name)}>Delete</button>
//             </li>
//           ))}
//       </ul>
//     </div>
//   );
// };

// export default MatchList;






// correct output with console log, saying "loading..."

// import React, { useState, useEffect } from 'react';
// import { fetchMatchesData } from '../services/fetchMatch'; // Import your fetchMatchesData service

// const MatchList = () => {
//   const [matchData, setMatchData] = useState(null);

//   useEffect(() => {
//     // Fetch match data when the component mounts
//     const fetchData = async () => {
//       try {
//         const matchesData = await fetchMatchesData(); // Call your service function
//         setMatchData(matchesData);
//       } catch (error) {
//         console.error('Error fetching matches:', error);
//       }
//     };

//     fetchData(); // Invoke the fetch function
//   }, []);

//   return (
//     <div>
//       {!matchData ? (
//         <>
//           <h2>Matches List</h2>
//           <p>Loading...</p>
//         </>
//       ) : (
//         <>
//           {/* Render components using matchData */}
//           <h2>{matchData.name}</h2>
//           {/* Add other components or elements using matchData */}
//         </>
//       )}
//     </div>
//   );
// };

// export default MatchList;




// import React, { useState, useEffect } from 'react';
// import { fetchMatchesData } from '../services/fetchMatch'; // Import your fetchMatchesData service

// const MatchList = () => {
//   const [matchData, setMatchData] = useState([]);

//   useEffect(() => {
//     // Fetch matches data when the component mounts
//     const fetchData = async () => {
//       try {
//         const matchesData = await fetchMatchesData(); // Call your service function
//         setMatchData(matchesData);
//       } catch (error) {
//         console.error('Error fetching matches:', error);
//       }
//     };

//     fetchData(); // Invoke the fetch function
//   }, []);

//   return (
//     <div>
//       <h2>Matches List</h2>
//       <ul>
//         {matchData.map((match) => (
//           <li key={match.id}>
//             <span>{match.name}</span>
//             <span>{match.date}</span>
//             {/* Other match details */}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MatchList;




// // MatchList.js

// import React, { useState, useEffect } from 'react';
// import deleteMatch from '../services/deleteMatch'; // Import the deleteMatch service

// const MatchList = () => {
//   const [matches, setMatches] = useState([]); // State to hold matches data

//   // Function to fetch matches from Firestore or any data source
//   const fetchMatches = async () => {
//     // Fetch matches data from Firestore or any other source
//     // For example:
//     // const matchesData = await fetchMatchesFromFirestore();
//     // setMatches(matchesData);
//     // Ensure matches are stored in the 'matches' state
//     try {
//         console.log('Fetching matches...'); // Log message to indicate fetch is initiated
//         // Logic to fetch matches data (replace this with your actual data retrieval logic)
//         const fetchedMatches = await fetchMatchesFromSomeSource();
//         console.log('Fetched matches:', fetchedMatches); // Log the fetched data
//         setMatches(fetchedMatches); // Set fetched matches to state
//       } catch (error) {
//         console.error('Error fetching matches:', error); // Log any errors that occur
//       }
//   };

//   // Function to handle match deletion
//   const handleMatchDeletion = async (matchId) => {
//     try {
//       // Call deleteMatch service to delete the selected match
//       const deletionResult = await deleteMatch(matchId);

//       // If deletion was successful, update the matches list (refetch data)
//       if (deletionResult.success) {
//         fetchMatches();
//       } else {
//         // Handle deletion failure (show error message, etc.)
//         console.error(deletionResult.message);
//       }
//     } catch (error) {
//       // Handle errors if deleteMatch service encounters an exception
//       console.error('Error deleting match:', error);
//     }
//   };

//   useEffect(() => {
//     // Fetch matches data when the component mounts or whenever dependencies change
//     fetchMatches();
//   }, []); // Empty dependency array to fetch data only once when the component mounts

//   return (
//     <div>
//       <h2>Matches List</h2>
//       <ul>
//         {/* Map through matches and display each match */}
//         {matches.map((match) => (
//           <li key={match.id}>
//             {/* Display match details */}
//             <span>{match.name}</span>
//             <span>{match.date}</span>
//             {/* Add a button to delete each match */}
//             <button onClick={() => handleMatchDeletion(match.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default MatchList;


