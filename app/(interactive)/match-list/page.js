'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../services/initializeFirebase.js';
import { collection, getDocs, deleteDoc, setDoc, doc } from 'firebase/firestore';

export default function MatchList() {
  const [matchData, setMatchData] = useState([]);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const MatchQuerySnapshot = await getDocs(collection(db, "matches"));
      const matches = MatchQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatchData(matches)
      
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "matches", id));
    setMatchData(matchData.filter(match => match.id !== id));
  };
  const handleRename = async (id) => {
    const docRef = doc(db, "matches", id);
    setDoc(docRef, {name:newName}, { merge: true })
      .then(() => {
        console.log("Document successfully updated!");
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
    setMatchData(matchData.map(match => match.id === id ? {...match, name:newName} : match));
  };

  return (
    <div>
      <h1>Match List</h1>
      {matchData.length > 0 ? (
        <ul>
          {matchData.map((match) => (
            <div key={match.id}>
              <li>
                <span>{match.name}<button onClick={() => handleDelete(match.id)}>Delete</button></span>
                <Link href={`/tag-match/${match.id}`}><button>Tag Match</button></Link>
                <br/>
                <input onChange={(e) => setNewName(e.target.value)}/>
                <button onClick={() => handleRename(match.id)}>Rename</button>
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
