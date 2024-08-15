"use client";

import React from 'react';
import styles from './Dashboard.module.css';
import DashboardTile from '../../components/DashboardTile';

const matchData = [
  { date: '04/07/2024', opponent: 'Texas (W)', result: 'W (4-1)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '5 3', isTagged: true},
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3', isTagged: true}
  ]},
  { date: '04/05/2024', opponent: 'Texas (W)', result: 'W (4-1)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3', isTagged: false},
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3', isTagged: true}
  ]},
  { date: '04/02/2024', opponent: 'Texas (W)', result: 'L (3-4)', matches: [
    { type: 'Singles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3', isTagged: true},
    { type: 'Doubles', player1: 'Kimmi Hance', player2: 'Malaika Rapolu', score: '6 6', opponentScore: '4 3', isTagged: false}
  ]}
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
            <h3>{`UCLA (W) vs ${match.opponent} - ${match.result}`}</h3>
            <span className={styles.date}>{match.date}</span>
          </div>
          
          <div className={styles.matchTypeHeader}><h4>Singles</h4></div>
          <div className={styles.matchDetails}>
            {match.matches.filter(m => m.type === 'Singles').map((m, idx) => (
              <DashboardTile
                key={idx}
                matchName={`${match.opponent} ${match.date}`}
                clientTeam="UCLA (W)"
                opponentTeam={match.opponent}
                matchDetails={m.type}
                player1Name={m.player1}
                player2Name={m.player2}
                player1FinalScores={m.score.split(" ").map((s) => ({ score: parseInt(s) }))}
                player2FinalScores={m.opponentScore.split(" ").map((s) => ({ score: parseInt(s) }))}
                player1TieScores={[]}
                player2TieScores={[]}
                isUnfinished={false}
                isTagged={m.isTagged}
              />
            ))}
          </div>

          {/* Group and display Doubles matches */}
          <div className={styles.matchTypeHeader}><h4>Doubles</h4></div>
          <div className={styles.matchDetails}>
            {match.matches.filter(m => m.type === 'Doubles').map((m, idx) => (
              <DashboardTile
                key={idx}
                matchName={`${match.opponent} ${match.date}`}
                clientTeam="UCLA (W)"
                opponentTeam={match.opponent}
                matchDetails={m.type}
                player1Name={m.player1}
                player2Name={m.player2}
                player1FinalScores={m.score.split(" ").map((s) => ({ score: parseInt(s) }))}
                player2FinalScores={m.opponentScore.split(" ").map((s) => ({ score: parseInt(s) }))}
                player1TieScores={[]}
                player2TieScores={[]}
                isUnfinished={false}
                isTagged={m.isTagged}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
