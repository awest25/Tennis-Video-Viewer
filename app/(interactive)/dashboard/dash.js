"use client";

import React from 'react';
import styles from './Dashboard.module.css';
import DashboardTile from '../../components/DashboardTile';

const matchData = [
  { date: '04/07/2024', opponent: 'Texas', result: 'W (4-1)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3' },
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3' },
  ]},
  { date: '04/05/2024', opponent: 'Texas', result: 'W (4-1)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3' },
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3' },
  ]},
  { date: '04/02/2024', opponent: 'Texas', result: 'L (3-4)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3' },
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3' },
  ]},
  { date: '04/01/2024', opponent: 'Stanford', result: 'W (5-0)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Sarah Smith', score: '6 4', opponentScore: '6 2' },
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Sarah Smith', score: '6 4', opponentScore: '6 2' },
  ]},
  { date: '03/29/2024', opponent: 'Cal', result: 'L (2-3)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Jane Doe', score: '4 6', opponentScore: '6 2' },
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Jane Doe', score: '4 6', opponentScore: '6 2' },
  ]},
  { date: '03/27/2024', opponent: 'USC', result: 'W (3-2)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Mary Jane', score: '6 3', opponentScore: '4 6' },
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Mary Jane', score: '6 3', opponentScore: '4 6' },
  ]},
  { date: '03/25/2024', opponent: 'Oregon', result: 'W (4-1)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Emily Green', score: '6 2', opponentScore: '6 4' },
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Emily Green', score: '6 2', opponentScore: '6 4' },
  ]},
  { date: '03/23/2024', opponent: 'Washington', result: 'L (2-3)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Anna White', score: '3 6', opponentScore: '6 2' },
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Anna White', score: '3 6', opponentScore: '6 2' },
  ]},
];

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>BSA | Tennis Consulting</h1>
        <h2>Dashboard</h2>
      </header>
      <div className={styles.carousel}>
        {matchData.map((match, index) => (
          <div key={index} className={styles.card}>
            <div>{`${match.opponent} ${match.date} ${match.result}`}</div>
          </div>
        ))}
      </div>
      {matchData.map((match, index) => (
        <div key={index} className={styles.matchSection}>
          <div className={styles.matchHeader}>
            <h3>{`UCLA vs ${match.opponent} - ${match.result}`}</h3>
            <span className={styles.date}>{match.date}</span>
          </div>
          <div className={styles.matchDetails}>
            {match.matches.map((m, idx) => (
              <DashboardTile
                key={idx}
                matchName={`${match.opponent} ${match.date}`}
                clientTeam="UCLA"
                opponentTeam={match.opponent}
                matchDetails={m.type}
                player1Name={m.player1}
                player2Name={m.player2}
                player1FinalScores={m.score.split(" ").map((s) => ({ score: parseInt(s) }))}
                player2FinalScores={m.opponentScore.split(" ").map((s) => ({ score: parseInt(s) }))}
                player1TieScores={[]}
                player2TieScores={[]}
                isUnfinished={false}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
