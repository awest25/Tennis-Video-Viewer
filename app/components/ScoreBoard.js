import React, { useState, useEffect } from 'react';
import styles from '../styles/Scoreboard.module.css';

const ScoreBoard = ({ playData }) => {
  const {
    player1Name = 'Player 1',
    player2Name = 'Player 2',
    player1GameScore = 0,
    player2GameScore = 0,
    player1PointScore = 0,
    player2PointScore = 0,
    player1TiebreakScore = 0,
    player2TiebreakScore = 0,
    serverName = '',
    pointScore = true,
  } = playData || {};

  // State to track finished sets
  const [finishedSets, setFinishedSets] = useState([[6,4]]); // Example initial value

  // Effect to update finished sets based on game score
  useEffect(() => {
    console.log('Current Scores:', player1GameScore, player2GameScore);
    console.log('Current finishedSets:', finishedSets);
    // Define the conditions for winning a set
    const isSetWon = (score1, score2) => (
      (score1 >= 6 && score2 < score1 && score2 >= 4) || // Win by two games at least, ensuring the opponent has at least 4 to account for a potential win by 2 condition
      (score1 === 7 && (score2 === 5 || score2 === 6)) // Win by tie-break or if the opponent has 5 or 6
    );

    // Check if the current game score indicates a won set
    if (isSetWon(player1GameScore, player2GameScore) || isSetWon(player2GameScore, player1GameScore)) {
      // Check to avoid adding the same score multiple times
      const lastSet = finishedSets[finishedSets.length - 1];
      if (!lastSet || player1GameScore !== lastSet[0] || player2GameScore !== lastSet[1]) {
        // Update the finishedSets state with the current game score as a new set
        setFinishedSets(prevSets => [...prevSets, [player1GameScore, player2GameScore]]);
      }
    }
    console.log('Updated finishedSets:', finishedSets);
  }, [player1GameScore, player2GameScore, finishedSets]);

  return (
    <div className={styles.scoreboard}>
      <div className={styles.liveScoreHeader}>Live Score</div>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            {finishedSets.map((set, index) => (
              <th key={`set-${index}`}>Set {index + 1} ({set[0]}-{set[1]})</th>
            ))}
            <th>Game</th>
            <th>{pointScore ? 'Point' : 'Tiebreak'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={player1Name === serverName ? styles.highlight : ''}>
              {player1Name === serverName && <span className={styles.arrow}>&rarr;</span>}
              {player1Name}
            </td>
            {finishedSets.map((set, index) => (
              <td key={`player1-set-score-${index}`}>{set[0]}</td>
            ))}
            <td>{player1GameScore}</td>
            <td>{pointScore ? player1PointScore : player1TiebreakScore}</td>
          </tr>
          <tr>
            <td className={player2Name === serverName ? styles.highlight : ''}>
              {player2Name === serverName && <span className={styles.arrow}>&rarr;</span>}
              {player2Name}
            </td>
            {finishedSets.map((set, index) => (
              <td key={`player2-set-score-${index}`}>{set[1]}</td>
            ))}
            <td>{player2GameScore}</td>
            <td>{pointScore ? player2PointScore : player2TiebreakScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
