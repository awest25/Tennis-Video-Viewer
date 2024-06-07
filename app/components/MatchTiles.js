import React, { useEffect, useState } from "react";
import styles from "../styles/MatchTiles.module.css";
import getTeams from '@/app/services/getTeams.js';

//Calculate winner of match
const calculateWinner = (player1, player2) => {
  const player1Total = player1.reduce((total, current) => {
    if (!isNaN(current.score)) {
      return total + current.score;
    } else {
      return total;
    }
  }, 0);
  const player2Total = player2.reduce((total, current) => {
    if (!isNaN(current.score)) {
      return total + current.score;
    } else {
      return total;
    }
  }, 0);
  return player1Total > player2Total;
};

//Retrieve Match Date
const extractDateFromString = (inputString) => {
  const regexSlash = /\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b/g;
  const regexDash = /\b(\d{1,2}-\d{1,2}-?\d{0,4})\b/g;
  const regex = new RegExp(`${regexSlash.source}|${regexDash.source}`, "g");
  const matches = inputString.match(regex);
  if (matches) {
    // Assuming there might be multiple date patterns in the string, return an array of matches
    const firstMatch = matches[0]; // Assuming you want to pick the first matched date
    const dateParts = firstMatch.includes('/') ? firstMatch.split('/') : firstMatch.split('-');
    const month = parseInt(dateParts[0]);
    const day = parseInt(dateParts[1]);
    const year = parseInt(dateParts[2]);

    // Create a new Date object with the extracted components
    const dateObject = new Date(year + 2000, month - 1, day);
    const formattedDate = dateObject.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    return formattedDate;
  } else {
    return null;
  }
};

const MatchTiles = ({
  matchName,
  clientTeam,
  opponentTeam,
  matchDetails,
  player1Name, player2Name, 
  player1FinalScores, player2FinalScores,
  player1TieScores, player2TieScores,
  isUnfinished,
  tagged = {status: false},
  displaySections = { score: true, info: true, matchup: true } // default all true

}) => {
  const [clientLogo, setClientLogo] = useState('');
  const [opponentLogo, setOpponentLogo] = useState('');

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const allTeams = await getTeams();
        const clientLogoURL = allTeams.find((team) => team.name === clientTeam).logoUrl;
        const opponentLogoURL = allTeams.find((team) => team.name === opponentTeam).logoUrl;
        setClientLogo(clientLogoURL);
        setOpponentLogo(opponentLogoURL);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLogos();
  });

  return (
    <div className={styles.matchTilesContainer}>
      <div className={styles.matchInfoContainer}>
        <div className={styles.matchTopLine}>
          <div className={styles.containerTitle}>Final Score</div>
          {tagged.status && <div className={styles.containerTagged}>Tagged</div>}
        </div>
        {/* Player Information  */}
        <div className={styles.playerInfo}>
          <div className={styles.playerSchoolImg}>
            <img src={clientLogo}></img>
          </div>
          <div
            className={styles.playerInfoName}
            style={
              isUnfinished ? { opacity: "40%" }
                : !calculateWinner(player1FinalScores, player2FinalScores)
                  ? { opacity: "40%" }
                  : { opacity: "100%" }
            }
          >
            {player1Name} {isUnfinished && "(UF)"}
          </div>
          <div
            className={styles.playerInfoScore}
            style={
              isUnfinished ? { opacity: "40%" }
                : !calculateWinner(player1FinalScores, player2FinalScores)
                  ? { opacity: "40%" }
                  : { opacity: "100%" }
            }
          >
            {/* Check if tie break, if so add exponent */}
            {player1FinalScores.map((score, index) =>
              isNaN(score.score) ? null : (
                <div key={index} style={{ position: "relative" }}>
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
                </div>
              )
            )}
          </div>
        </div>
        <div className={styles.playerInfo}>
          <div className={styles.playerSchoolImg}>
            <img src={opponentLogo}></img>
          </div>
          <div
            className={styles.playerInfoName}
            style={
              calculateWinner(player1FinalScores, player2FinalScores)
                ? { opacity: "40%" }
                : { opacity: "100%" }
            }
          >
            {player2Name}
          </div>
          <div
            className={styles.playerInfoScore}
            style={
              calculateWinner(player1FinalScores, player2FinalScores)
                ? { opacity: "40%" }
                : { opacity: "100%" }
            }
          >
            {player2FinalScores.map((score, index) =>
              isNaN(score.score) ? null : (
                <div key={index} style={{ position: "relative" }}>
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
                </div>
              )
            )}
          </div>
        </div>
      </div>
      {/* Match Location */}
      {displaySections.info && (
        <div className={styles.matchInfoContainer}>
          <div className={styles.containerTitle}>Match Information</div>
          <div className={styles.containerInfo}>{matchDetails}</div>
          <div className={styles.containerInfo}>
            {extractDateFromString(matchName)}
          </div>
        </div>
      )}
      {/* School Info */}
      {displaySections.matchup && (
        <div className={styles.matchInfoContainer}>
          <div className={styles.containerTitle}>Matchup</div>
          <div className={styles.containerInfo}>
            {clientTeam}
          </div>
          <div className={styles.containerInfo}>
            {opponentTeam}
          </div>
        </div>
      )}
    </div>
  );
};

export default MatchTiles;

