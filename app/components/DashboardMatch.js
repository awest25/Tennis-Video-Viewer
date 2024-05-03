import React from "react";
import MatchTiles from "./MatchTiles";
import extractSetScores from '@/app/services/extractSetScores';
import styles from '../styles/DashboardMatch.module.css'; // Import the CSS module

const DashboardMatch = ({ matchInfo }) => { 
    const singlesMatches = matchInfo[0];
    const doublesMatches = matchInfo[1]; // Assuming you'll use this later

    return (
        <div className={styles.parentContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>UCLA vs. Texas - W(4-2)</h1>
                <h1 className={styles.date}>04/07/2024</h1>
            </div>
            <h2 className={styles.title}>Singles</h2>
            <div className={styles.matchesContainer}>
                {singlesMatches && singlesMatches.map((match, index) => {
                const matchSetScores = match ? extractSetScores(match.points) : {};
                return (
                    <div key={index} className={styles.matchItem}>
                    <MatchTiles 
                        matchName={match.name}
                        clientTeam={match.clientTeam}
                        opponentTeam={match.opponentTeam}
                        matchDetails={match.matchDetails}
                        {...matchSetScores}  // Spread the extracted scores into the component as props
                        tagged={{status: true}}
                        displaySections={{ score: true, info: false, matchup: false }}
                    />
                    </div>
                );
                })}
            </div>

            <h2 className={styles.title}>Doubles</h2>
            <div className={styles.matchesContainer}>
                {doublesMatches && doublesMatches.map((match, index) => {
                const matchSetScores = match ? extractSetScores(match.points) : {};
                return (
                    <div key={index} className={styles.matchItem}>
                    <MatchTiles 
                        matchName={match.name}
                        clientTeam={match.clientTeam}
                        opponentTeam={match.opponentTeam}
                        matchDetails={match.matchDetails}
                        {...matchSetScores}  // Spread the extracted scores into the component as props
                        displaySections={{ score: true, info: false, matchup: false }}
                    />
                    </div>
                );
                })}
            </div>
        </div>
    );
};

export default DashboardMatch;
