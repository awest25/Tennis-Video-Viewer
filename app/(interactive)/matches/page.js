"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { db } from '../../services/initializeFirebase.js';
import styles from '../../styles/MatchesDashboard.module.css';
import RosterList from '@/app/components/RosterList.js';
import TileList from '@/app/components/TileList.js';

// Please see the Figma design:
// https://www.figma.com/file/YWXYlBgXTF60y8AfMC2LJI/bsa?type=design&node-id=605%3A405&mode=design&t=DMZnDipr5BWWn86v-1

const MatchesDashboard = () => {
  // Selecting Player from Roster
  const [matchData, setMatchData] = useState([]);
  const [activePlayer, setActivePlayer] = useState(null);

  const handleActivePlayerChange = (player) => {
    setActivePlayer(player);
  };

  useEffect(() => {
    const fetchData = async () => {
      const MatchQuerySnapshot = await getDocs(collection(db, "matches"));
      const matches = MatchQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMatchData(matches);
    };
    fetchData();
  }, []);

  //Get Player's matches
  const playerMatches = matchData
    .filter(
      (match) =>
        activePlayer &&
        match.points[0].player1Name &&
        match.points[0].player1Name ===
          activePlayer.firstName + " " + activePlayer.lastName
    )
    .map((match) => match);

  return (
    <div className={styles.container}>
      <h1>Matches</h1>
      <div className={styles.searchSection}>
        <input
          type="text"
          placeholder="Search matches..."
          className={styles.searchBox}
        />
        <button className={styles.searchButton}>Search</button>
      </div>
      <div className={styles.eventsContainer}>
        {/* Dynamic event tile content goes here */}
      </div>
      <div className={styles.mainContent}>
        <div className={styles.matchesContainer}>
          {/* Dynamic match content goes here */}
          <TileList/>
        </div>
        <div className={styles.rosterContainer}>
          {/* Roster list goes here */}
          <RosterList onActivePlayerChange={handleActivePlayerChange} />
        </div>
      </div>
    </div>
  );
};

export default MatchesDashboard;
