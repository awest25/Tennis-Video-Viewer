import React, { useEffect } from "react";
import MatchTiles from "./MatchTiles";
import extractSetScores from '@/app/services/extractSetScores';
import styles from '../styles/DashboardMatch.module.css'; // Import the CSS module

const calculateMatchDate = (matchInfo) => {
    if (matchInfo && matchInfo.length > 0 && matchInfo[0].matchDate) {
        const date = matchInfo[0].matchDate;
        return date.slice(5, 7) + '/' + date.slice(8, 10) + '/' + date.slice(0, 4);
    }
    return "Date unavailable";
}

const matchTitle = (matchInfo) => {
    if (!matchInfo?.length) return "matchTitle Bug";
    const { clientTeam, opponentTeam } = matchInfo[0].teams;
    let clientWins = 0, opponentWins = 0;
    matchInfo.forEach(match => {
        let setClientWins = 0, setOpponentWins = 0;
        match.sets.forEach(({ clientGamesWon, opponentGamesWon, clientTiebreakPointsWon, opponentTiebreakPointsWon }) => {
            if (clientGamesWon > opponentGamesWon || (clientGamesWon === opponentGamesWon && clientTiebreakPointsWon > opponentTiebreakPointsWon)) {
                setClientWins++;
            } else {
                setOpponentWins++;
            }
        });
        if (setClientWins > setOpponentWins) clientWins++;
        else opponentWins++;
    });
    const result = clientWins > opponentWins ? 'W' : 'L';
    return `${clientTeam} vs. ${opponentTeam} - ${result} (${clientWins}-${opponentWins})`;
};

const DashboardMatch = ({ matchInfo }) => { 
    const singlesMatches = matchInfo.filter(match => match.singles === true);
    const doublesMatches = matchInfo.filter(match => match.singles === false);

    return (    
        <div className={styles.parentContainer}>
            <div className={styles.header}>
                <h1 className={styles.title}>{matchTitle(matchInfo)}</h1>
                <h1 className={styles.date}>{calculateMatchDate(matchInfo)}</h1>
            </div>
            {singlesMatches && singlesMatches.length > 0 && (
                <div>
                    <h2 className={styles.matchTypeTitle}>Singles</h2>
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
                                tagged={{status: match.published}}
                                displaySections={{ score: true, info: false, matchup: false }}
                            />
                            </div>
                        );
                        })}
                    </div>
                </div>
            )}
            {doublesMatches && doublesMatches.length > 0 && (
            <div>
                <h2 className={styles.matchTypeTitle}>Doubles</h2>
                <div className={styles.matchesContainer}>
                    {doublesMatches.map((match, index) => {
                        const matchSetScores = match ? extractSetScores(match.points) : {};
                        return (
                            <div key={index} className={styles.matchItem}>
                                <MatchTiles 
                                    matchName={match.name}
                                    clientTeam={match.clientTeam}
                                    opponentTeam={match.opponentTeam}
                                    matchDetails={match.matchDetails}
                                    {...matchSetScores}  // Spread the extracted scores into the component as props
                                    tagged={{status: match.published}}
                                    displaySections={{ score: true, info: false, matchup: false }}
                                />
                            </div>
                        );
                    })}
                </div>
            </div>
        )}
        </div>
    );
};

export default DashboardMatch;
