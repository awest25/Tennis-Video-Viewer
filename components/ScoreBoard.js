import React from 'react';
import styles from '../styles/Home.module.css';

const ScoreBoard = ({ names, playData }) => {
  // Ensures playData is not null/undefined, to safely access its properties.
  const data = playData || {};

  const {
    player1Name = '',
    player2Name = '',
    player1SetScore = 0,
    player2SetScore = 0,
    player1GameScore = 0,
    player2GameScore = 0,
    player1PointScore = 0,
    player2PointScore = 0,
    player1TiebreakScore = 0,
    player2TiebreakScore = 0,
    serverName = '',
    pointScore = true,
  } = data;

  const players = names.split(' ');
  const defaultP1 = `${players[0]} ${players[1]}`;
  const defaultP2 = `${players[3]} ${players[4]}`;
  const p1 = player1Name || defaultP1;
  const p2 = player2Name || defaultP2;

  // Determines point label based on the current score mode (regular or tiebreaker).
  const PointLabel = pointScore ? "Point" : "Point (Tiebreaker)";
  const row1 = pointScore ? player1PointScore : player1TiebreakScore;
  const row2 = pointScore ? player2PointScore : player2TiebreakScore;

  return (
    <div className={styles.scoreboard}>
      <table>
        <thead>
          <tr>
            <th>Players</th>
            <th>Set</th>
            <th>Game</th>
            <th>{PointLabel}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={p1 === serverName ? styles.highlight : ''}>
              {p1 === serverName && <span className={styles.arrow}>&rarr;</span>}
              {p1}
            </td>
            <td>{player1SetScore}</td>
            <td>{player1GameScore}</td>
            <td>{row1}</td>
          </tr>
          <tr>
            <td className={p2 === serverName ? styles.highlight : ''}>
              {p2 === serverName && <span className={styles.arrow}>&rarr;</span>}
              {p2}
            </td>
            <td>{player2SetScore}</td>
            <td>{player2GameScore}</td>
            <td>{row2}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
