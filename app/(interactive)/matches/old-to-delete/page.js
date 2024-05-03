'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { db } from '../../../services/initializeFirebase.js';
import { collection, getDocs } from 'firebase/firestore';

const AllMatchList = () => {
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "matches"));
      const matches = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMatchData(matches);
    };

    fetchData();
  }, []);
  const [category, setCategory] = useState('All')  
  const categories = ['All', 'Tagged (M)', 'Tagged (W)', 'Untagged (M)', 'Untagged (W)']
  
  return (
    <div>
      <h1>2024 Season Matches</h1>
      <p>Filters: </p>
      {categories.map((newCategory, idx) => (
        <button className={`${newCategory === category ? 'font-weight: bold;' : ''}`} key={idx} onClick={() => setCategory(newCategory)}>
          {newCategory}
        </button>
      ))}
      {matchData.length > 0 ? (
        <ul>
          {matchData.map((match) => {
            // Filter matches based on the category
            if ((category === 'All') || 
              (category === 'Tagged (M)' && match.published && match.clientTeam.endsWith('(M)')) || 
              (category === 'Tagged (W)' && match.published && match.clientTeam.endsWith('(W)'))
            ) {
              return (
                <li key={match.id}>
                  <Link href={'/matches/' + match.videoId}> {match.name} </Link>
                </li>
              );
            } else if (
              (category === 'Untagged (M)' && !match.published && match.clientTeam.endsWith('(M)')) || 
              (category === 'Untagged (W)' && !match.published && match.clientTeam.endsWith('(W)'))) {
              return (
                <li key={match.id}>
                  <a href={'https://www.youtube.com/watch?v=' + match.videoId} target="_blank"> {match.name} </a>
                </li>
              );
            }
            
            else {
              return null; // If match does not belong to the category, don't render it
            }
          })}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default AllMatchList;