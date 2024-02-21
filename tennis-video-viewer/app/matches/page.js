'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

import { db } from '../services/initializeFirebase.js';
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
  const [curCategory, setCategory] = useState('All')  
  const categories = ['All', 'Men', 'Women']
  
  return (
    <div>
      <h1>2024 Season Matches</h1>
      <p>Filters: </p>
      {categories.map((category, idx) => (
        <button className={`${category.includes(curCategory) ? 'font-weight: bold;' : ''}`} key={idx} onClick={() => setCategory(category)}>
          {category}
        </button>
      ))}
      {matchData.length > 0 ? (
        <ul>
          {matchData.map((match) => (
            <li key={match.id}>
              <Link href={'/matches/' + match.videoId}> {match.name} </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default AllMatchList;