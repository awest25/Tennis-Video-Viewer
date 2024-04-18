import React, { useState, useEffect } from 'react';
import styles from '../styles/Scoreboard.module.css';
import extractSetScores from '../services/extractSetScores';

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

  // console.log(playData)

  return (
    <div className={styles.scoreboard}>
      <table>
        <thead>
          <tr>
            <th>Live Score {isUnfinished && "(UF)"}</th>
            {player1FinalScores.map((item, index) => {
              if (!isNaN(item.score) && playData && index + 1 < playData.setNum) {
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
            {/* FINISHED SETS using data from parent! */}
            {/* Check if tie break, if so add exponent */}
            {player1FinalScores.map((score, index) =>
              (playData && (!isNaN(score.score) && index + 1 < playData.setNum)) ? (
                <td key={index} style={{ position: "relative" }}>
                  {player1TieScores[index] ? (
                    <div key={index}>
                      {score.score}
                      <sup
                        style={{
                          position: "absolute",
                          fontSize: "0.6em",
                          top: "0.3em",
                          right: "0.9em",
                          letterSpacing: "1px",
                        }}
                      >
                        {player1TieScores[index]}
                      </sup>
                    </div>
                  ) : (
                    <span key={index}>{score.score}</span>
                  )}
                </td>
              ) : null
            )}
            {/* Current Set */}
            <td>{player1GameScore}</td>
            <td>{pointScore ? player1PointScore : player1TiebreakScore}</td>
          </tr>
          <tr>
            <td className={player2Name === serverName ? styles.highlight : ''}>
              {player2Name === serverName && <span className={styles.arrow}>&rarr;</span>}
              {player2Name}
            </td>
            {/* FINISHED SETS using data from parent! */}
            {player2FinalScores.map((score, index) =>
              (playData && (!isNaN(score.score) && index + 1 < playData.setNum)) ? (
                <td key={index} style={{ position: "relative" }}>
                  {player2TieScores[index] ? (
                    <div key={index}>
                      {score.score}
                      <sup
                        style={{
                          position: "absolute",
                          fontSize: "0.6em",
                          top: "0.3em",
                          right: "0.9em",
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
              ) : null
            )}
            {/* Current Set */}
            <td>{player2GameScore}</td>
            <td>{pointScore ? player2PointScore : player2TiebreakScore}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
