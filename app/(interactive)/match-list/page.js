'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../services/initializeFirebase';
import { collection, getDocs, deleteDoc, setDoc, doc } from 'firebase/firestore';
import updateMatchDocument from '../../services/updateMatchDocument'; // Make sure the path is correct

export default function MatchList() {
  const [matchData, setMatchData] = useState([]);
  const [clientFirstName, setClientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [opponentFirstName, setOpponentFirstName] = useState("");
  const [opponentLastName, setOpponentLastName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "matches"));
      const matches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatchData(matches);
    };

    fetchData();
  }, []);

  const handleUpdateNames = async (id) => {
    const updates = {
      'clientPlayer.firstName': clientFirstName,
      'clientPlayer.lastName': clientLastName,
      'opponentPlayer.firstName': opponentFirstName,
      'opponentPlayer.lastName': opponentLastName,
    };
    await updateMatchDocument(id, updates);
    setMatchData(matchData.map(match => match.id === id ? {
      ...match,
      clientPlayer: { ...match.clientPlayer, firstName: clientFirstName, lastName: clientLastName },
      opponentPlayer: { ...match.opponentPlayer, firstName: opponentFirstName, lastName: opponentLastName }
    } : match));
  };

  return (
    <div>
      <h1>Match List</h1>
      {matchData.length > 0 ? (
        <ul>
          {matchData.map((match) => (
            <div key={match.id}>
              <li>
                <span>{match.name} <button onClick={() => handleDelete(match.id)}>Delete</button></span>
                <Link href={`/tag-match/${match.id}`}><button>Tag Match</button></Link>
                <br/>
                <input placeholder="Client First Name" value={clientFirstName} onChange={(e) => setClientFirstName(e.target.value)} />
                <input placeholder="Client Last Name" value={clientLastName} onChange={(e) => setClientLastName(e.target.value)} />
                <input placeholder="Opponent First Name" value={opponentFirstName} onChange={(e) => setOpponentFirstName(e.target.value)} />
                <input placeholder="Opponent Last Name" value={opponentLastName} onChange={(e) => setOpponentLastName(e.target.value)} />
                <button onClick={() => handleUpdateNames(match.id)}>Update Names</button>
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
