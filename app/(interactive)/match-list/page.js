'use client'

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../services/initializeFirebase.js';
import { collection, getDoc, getDocs, deleteDoc, setDoc, doc } from 'firebase/firestore';

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
  const handleDownload = async (id) => {
    try {
      const matchDoc = await getDoc(doc(db, "matches", id));
      if (matchDoc.exists()) {
        const matchData = matchDoc.data();
        const points = matchData.points;
        if (points) {
          const jsonString = JSON.stringify(points, null, 2);
          const blob = new Blob([jsonString], { type: 'application/json' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${matchDoc.id}_points.json`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } else {
          console.error("No points field found in document!");
        }
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error("Error fetching document: ", error);
    }
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
                <span><button onClick={() => handleDownload(match.id)}>Download JSON</button></span>
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
