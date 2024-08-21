import React from 'react';
import DashboardTile from './DashboardTile';
import styles from '../styles/Dashboard.module.css';

const DashTileContainer = ({ matches, matchType, onTileClick }) => {
    return (
      <>
        {matches.length > 0 && (
          <>
            <div className={styles.matchTypeHeader}>
              <h4>{matchType}</h4>
            </div>
            <div className={styles.matchTileContainer}>
              {matches.map((match, idx) => (
                <div
                  key={idx}
                  className={styles.tileWrapper}
                  onClick={() => onTileClick(match.videoID || match.id)}
                >
                  <DashboardTile
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
      </>
    );
  };

export default DashTileContainer;