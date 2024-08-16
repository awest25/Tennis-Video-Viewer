"use client";

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useMatchData } from '../../components/MatchDataProvider';
import styles from './Dashboard.module.css';
import DashboardTile from '../../components/DashboardTile';
import getTeams from '@/app/services/getTeams.js';

// Import sample data to test data fetching
import matchData from './sampleData';

const extractDateFromName = (name) => {
  const dateRegex = /(\d{1,2})\/(\d{1,2})\/(\d{2})/;
  const matchResult = name.match(dateRegex);

  if (!matchResult) return null;

  const [month, day, year] = matchResult.slice(1).map(Number);
  const fullYear = year < 50 ? 2000 + year : 1900 + year;

  return new Date(fullYear, month - 1, day);
};

const formatDateForCarousel = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = String(date.getFullYear()).slice(-2);
  return `${month}/${day}/${year}`;
};

const formatDateToMMDDYYYY = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const formatMatches = (matches) =>
  matches
    .filter((match) => match.clientPlayer && match.opponentPlayer)
    .map((match) => {
      const date = extractDateFromName(match.date);
      const formattedDate = date ? formatDateToMMDDYYYY(date) : null;

      return {
        ...match,
        date: date,
        formattedDate: formattedDate,
      };
    })
    .sort((a, b) => (b.date && a.date ? b.date - a.date : 1));


const Dashboard = () => {
  // const { matches, error } = useMatchData(); // Using the custom hook to access match data
  const matches = matchData; // using hardcoded JSON objects
  const router = useRouter();
  const formattedMatches = formatMatches(matchData);
  const [logos, setLogos] = useState({}); // Store logos for each opponent team
  
  const matchesByDate = formattedMatches.reduce((acc, match) => {
    const matchDate = match.formattedDate;
    if (matchDate && !acc[matchDate]) {
      acc[matchDate] = [];
    }
    if (matchDate) {
      acc[matchDate].push(match);
    }
    return acc;
  }, {});

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const allTeams = await getTeams();
        const logosMap = {};
        formattedMatches.forEach(match => {
          const opponentTeam = match.opponentTeam;
          const opponentLogoURL = allTeams.find((team) => team.name === opponentTeam)?.logoUrl;
          if (opponentLogoURL) {
            logosMap[opponentTeam] = opponentLogoURL;
          }
        });
        setLogos(logosMap); // Set the state with the map of team logos
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLogos();
  }, [formattedMatches]);

  const handleTileClick = (videoId) => {
    router.push(`/matches/${videoId}`);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>BSA | Tennis Consulting</h1>
        <h2>Dashboard</h2>
      </header>
      
      <div className={styles.carousel}>
        {Object.keys(matchesByDate).map((date, index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardContent}>
              <img src={logos[matchesByDate[date][0].opponentTeam]} alt="Team Logo" className={styles.logo} />
              <span className={styles.matchDate}>{formatDateForCarousel(new Date(date))}</span>
            </div>
          </div>
        ))}
      </div>


      {Object.keys(matchesByDate).map((date, index) => {
        const singlesMatches = matchesByDate[date].filter(match => match.singlesDoubles === 'Singles');
        const doublesMatches = matchesByDate[date].filter(match => match.singlesDoubles === 'Doubles');

        return (
          <div key={index} className={styles.matchSection}>
            <div className={styles.matchContainer}>
              <div className={styles.matchHeader}>
                <h3>{`${matchesByDate[date][0].clientTeam} vs ${matchesByDate[date][0].opponentTeam}`}</h3>
                <span className={styles.date}>{date}</span>
              </div>

              {/* Singles Matches */}
              {singlesMatches.length > 0 && (
                <>
                  <div className={styles.matchTypeHeader}><h4>Singles</h4></div>
                  <div className={styles.matchTileContainer}>
                    {singlesMatches.map((match, idx) => (
                      <div
                      key={idx}
                      className={styles.tileWrapper}
                      onClick={() => handleTileClick(match.videoID)}>
                        <DashboardTile
                          key={idx}
                          matchName={`${match.opponent} ${match.date}`}
                          clientTeam={match.clientTeam}
                          opponentTeam={match.opponentTeam}
                          player1Name={match.clientPlayer}
                          player2Name={match.opponentPlayer}
                          player1FinalScores={Object.values(match.matchScore).map(set => ({
                            score: set ? set.clientGames : null
                          }))}
                          player2FinalScores={Object.values(match.matchScore).map(set => ({
                            score: set ? set.opponentGames : null
                          }))}
                          player1TieScores={Object.values(match.matchScore).map(set =>
                            set ? set.clientTiebreak : null
                          )}
                          player2TieScores={Object.values(match.matchScore).map(set =>
                            set ? set.opponentTiebreak : null
                          )}
                          isUnfinished={false}
                          isTagged={match.isTagged}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* Doubles Matches */}
              {doublesMatches.length > 0 && (
                <>
                  <div className={styles.matchTypeHeader}><h4>Doubles</h4></div>
                  <div className={styles.matchTileContainer}>
                    {doublesMatches.map((match, idx) => (
                      <div
                      key={idx}
                      className={styles.tileWrapper}
                      onClick={() => handleTileClick(match.id)}>
                        <DashboardTile
                          key={idx}
                          matchName={`${match.opponent} ${match.date}`}
                          clientTeam={match.clientTeam}
                          opponentTeam={match.opponentTeam}
                          player1Name={match.clientPlayer}
                          player2Name={match.opponentPlayer}
                          player1FinalScores={Object.values(match.matchScore).map(set => ({
                            score: set ? set.clientGames : null
                          }))}
                          player2FinalScores={Object.values(match.matchScore).map(set => ({
                            score: set ? set.opponentGames : null
                          }))}
                          player1TieScores={Object.values(match.matchScore).map(set =>
                            set ? set.clientTiebreak : null
                          )}
                          player2TieScores={Object.values(match.matchScore).map(set =>
                            set ? set.opponentTiebreak : null
                          )}
                          isUnfinished={false}
                          isTagged={match.isTagged}
                        />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Dashboard;