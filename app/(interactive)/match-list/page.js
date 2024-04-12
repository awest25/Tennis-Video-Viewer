import React, { useEffect, useState } from 'react';
import { db } from '../services/initializeFirebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/router';

function MatchList() {
  const [matchData, setMatchData] = useState([]);
  const router = useRouter();

  const navigateToTagMatch = (matchId) => {
    router.push({
      pathname: '/tag-match',
      query: { matchId: matchId },
    });
  };  

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "matches"));
      const matches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatchData(matches);
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "matches", id));
    setMatchData(matchData.filter(match => match.id !== id));
  };

  return (
    <div>
      <button onClick={() => history.back()}>Home</button> {/* Home Button */}
      <h1>Match List</h1>
      {matchData.length > 0 ? (
        <ul>
          {matchData.map((match) => (
            <li key={match.id}>
              {match.name}
              <button onClick={() => handleDelete(match.id)}>Delete</button>
              <button onClick={() => navigateToTagMatch(match.id)}>Tag Match</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default MatchList;
