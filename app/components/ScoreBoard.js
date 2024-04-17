import React, { useState, useEffect } from 'react';
import styles from '../styles/Scoreboard.module.css';

const ScoreBoard = ({ playData, 
  player1Name, player2Name, 
    player1FinalScores, player2FinalScores,
    player1TieScores, player2TieScores,
    isUnfinished }) => {
  const {
    player1GameScore = 0,
    player2GameScore = 0,
    player1PointScore = 0,
    player2PointScore = 0,
    player1TiebreakScore = 0,
    player2TiebreakScore = 0,
    serverName = '',
    pointScore = true,
  } = playData || {};
  console.log(player1TieScores)
  return (
    <div className={styles.scoreboard}>
      <div className={styles.liveScoreHeader}>Live Score {isUnfinished && "(UF)"}</div>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            {/* {finishedSets.map((set, index) => (
              <th key={`set-${index}`}>Set {index + 1} ({set[0]}-{set[1]})</th>
            ))} */}
            {player1FinalScores.map((item, index) => {
              if (!isNaN(item.score)) {
                return <th key={index}>Set {index + 1}</th>;
              }
            })}
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
            {/* {finishedSets.map((set, index) => (
              <td key={`player1-set-score-${index}`}>{set[0]}</td>
            ))} */}
            {/* Check if tie break, if so add exponent */}
            {player1FinalScores.map((score, index) =>
              isNaN(score.score) ? null : (
                <td key={index} style={{ position: "relative" }}>
                  {player1TieScores[index] ? (
                    <span key={index}>
                      {score.score}
                      <sup
                        style={{
                          position: "absolute",
                          fontSize: "0.6em",
                          top: "-0.3em",
                          left: "0.9em",
                          letterSpacing: "1px",
                        }}
                      >
                        {player1TieScores[index]}
                      </sup>
                    </span>
                  ) : (
                    <span key={index}>{score.score}</span>
                  )}
                </td>
              )
            )}
            <td>{player1GameScore}</td>
            <td>{pointScore ? player1PointScore : player1TiebreakScore}</td>
          </tr>
          <tr>
            <td className={player2Name === serverName ? styles.highlight : ''}>
              {player2Name === serverName && <span className={styles.arrow}>&rarr;</span>}
              {player2Name}
            </td>
            {/* {finishedSets.map((set, index) => (
              <td key={`player2-set-score-${index}`}>{set[1]}</td>
            ))} */}
            {player2FinalScores.map((score, index) =>
              isNaN(score.score) ? null : (
                <td key={index} style={{ position: "relative" }}>
                  {player2TieScores[index] ? (
                    <div key={index}>
                      {score.score}
                      <sup
                        style={{
                          position: "absolute",
                          fontSize: "0.6em",
                          top: "-0.3em",
                          left: "0.9em",
                          letterSpacing: "1px",
                        }}
                      >
                        {player2TieScores[index]}
                      </sup>
                    </div>
                  ) : (
                    <span key={index}>{score.score}</span>
                  )}
                </td>
              )
            )}
            <td>{player2GameScore}</td>
            <td>{pointScore ? player2PointScore : player2TiebreakScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
