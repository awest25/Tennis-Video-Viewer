'use client'

import React, { useEffect, useState } from 'react';
import { db } from '../../services/initializeFirebase.js';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

export default function MatchList() {
  const [matchData, setMatchData] = useState([]);
  const[ teamData, setTeamData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const MatchQuerySnapshot = await getDocs(collection(db, "matches"));
      const matches = MatchQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatchData(matches);


      const TeamQuerySnapshot = await getDocs(collection(db, "teams"));
      const teams = TeamQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeamData(teams);
      
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "matches", id));
    setMatchData(matchData.filter(match => match.id !== id));
  };

  return (
    <div>
      <h1>Match List</h1>
      {matchData.length > 0 ? (
        <ul>
          {matchData.map((match) => (
            <li key={match.id}>
              {match.name} <button onClick={() => handleDelete(match.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
