import React, { useState, useEffect } from "react";
import styles from "../styles/MatchTiles.module.css";

const MatchTiles = ({
    matchName,
    finalScore,
    clientLogo,
    opposingLogo,
    matchDetails,
}) => {
    //Tile heights
    const [height, setHeight] = useState(0);
    const [isUnfinished, setIsUnfinished] = useState(false);
    //Keep container heights proportional to width
    useEffect(() => {
        const updateHeight = () => {
            const container = document.querySelector("." + styles.matchInfoContainer);
            const width = container.offsetWidth;
            const newHeight = width * 0.35;
            setHeight(newHeight);
        };

        // Call the updateHeight function when the component mounts
        updateHeight();

        // Add event listener for window resize to update height
        window.addEventListener("resize", updateHeight);

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener("resize", updateHeight);
        };
    }, []); // Empty dependency array ensures the effect runs only once

    // Page rerender
    useEffect(() => {
        return () => {
            setIsUnfinished(false);
        };
    }, [finalScore]);

    //Extract Final Scores from Each Set
    const firstSetObject = finalScore.filter((score) => score.setNum === 1).pop();
    const secondSetObject = finalScore.filter((score) => score.setNum === 2).pop();
    const thirdSetObject = finalScore.filter((score) => score.setNum === 3).pop();
    const setObjects = [firstSetObject, secondSetObject, thirdSetObject];
    // Extract Scores and type of Each Set
    const firstSetScore =
        firstSetObject.tiebreakScore !== null &&
            firstSetObject.tiebreakScore !== "" &&
            firstSetObject.tiebreakScore !== undefined
            ? { score: firstSetObject.gameScore, type: "tiebreakScore" }
            : { score: firstSetObject.gameScore, type: "gameScore" };
    const secondSetScore =
        secondSetObject.tiebreakScore !== null &&
            secondSetObject.tiebreakScore !== "" &&
            secondSetObject.tiebreakScore !== undefined
            ? { score: secondSetObject.gameScore, type: "tiebreakScore" }
            : { score: secondSetObject.gameScore, type: "gameScore" };
    //Check if a third set was played, then extract score.
    const thirdSetScore = thirdSetObject
        ? thirdSetObject.tiebreakScore !== null &&
            thirdSetObject.tiebreakScore !== "" &&
            thirdSetObject.tiebreakScore !== undefined
            ? { score: thirdSetObject.tiebreakScore, type: "tiebreakScore" }
            : { score: thirdSetObject.gameScore, type: "gameScore" }
        : { score: "", type: "" };
    const setScores = [firstSetScore, secondSetScore, thirdSetScore];

    //Extract Player Names and Assign Scores for Each Player
    const playerOneName = firstSetObject.player1Name;
    const playerTwoName = firstSetObject.player2Name;
    const playerOneFinalScores = [
        {
            score: parseInt(firstSetScore.score[0]),
            playerName: firstSetObject.player1Name,
        },
        {
            score: parseInt(secondSetScore.score[0]),
            playerName: firstSetObject.player1Name,
        },
        {
            score: parseInt(thirdSetScore.score[0]),
            playerName: firstSetObject.player1Name,
        },
    ];
    const playerTwoFinalScores = [
        {
            score: parseInt(firstSetScore.score[2]),
            playerName: firstSetObject.player2Name,
        },
        {
            score: parseInt(secondSetScore.score[2]),
            playerName: firstSetObject.player2Name,
        },
        {
            score: parseInt(thirdSetScore.score[2]),
            playerName: firstSetObject.player2Name,
        },
    ];
    //Tiebreaker scores array
    const playerOneTieScores = Array(3);
    const playerTwoTieScores = Array(3);

    // Check if sets are tiebreaks
    // Non tiebreak score winners are given winning point
    const processSet = (
        setScores,
        setObjects,
        playerOneFinalScores,
        playerTwoFinalScores,
        playerOneTieScores,
        playerTwoTieScores,
        index
    ) => {
        if (setScores[index].type !== "tiebreakScore") {
            //Check if unfinished match
            if (playerOneFinalScores[index].score < 5 &&
                playerTwoFinalScores[index].score < 5 && !isUnfinished) {
                setIsUnfinished(true);
            }
            //Increment winners score by 1
            if (
                playerOneFinalScores[index].score > playerTwoFinalScores[index].score
            ) {
                playerOneFinalScores[index].score++;
            } else {
                playerTwoFinalScores[index].score++;
            }
        } else if (setScores[index].type == "tiebreakScore") {
            //Compare tiebreak scores and increment winner
            playerOneTieScores[index] = parseInt(setObjects[index].tiebreakScore[0]);
            playerTwoTieScores[index] = parseInt(setObjects[index].tiebreakScore[2]);
            //check if unfinished match
            if (playerOneFinalScores[index].score < 5 &&
                playerTwoFinalScores[index].score < 5 && !isUnfinished) {
                setIsUnfinished(true);
            }
            if (playerOneTieScores[index] > playerTwoTieScores[index]) {
                playerOneFinalScores[index].score++;
                // Tiebreak more than 7 points
                if (playerTwoTieScores[index] >= 6) {
                    playerOneTieScores[index]++;
                }
            } else {
                if (playerOneTieScores[index] >= 6) {
                    playerTwoTieScores[index]++;
                }
                playerTwoFinalScores[index].score++;
            }
        } else {
            return;
        }
    };

    // Process each set score.
    setScores.forEach((_, index) => {
        processSet(
            setScores,
            setObjects,
            playerOneFinalScores,
            playerTwoFinalScores,
            playerOneTieScores,
            playerTwoTieScores,
            index
        );
    });

    //Calculate winner of match
    const calculateWinner = (playerOne, playerTwo) => {
        const playerOneTotal = playerOne.reduce((total, current) => {
            if (!isNaN(current.score)) {
                return total + current.score;
            } else {
                return total;
            }
        }, 0);
        const playerTwoTotal = playerTwo.reduce((total, current) => {
            if (!isNaN(current.score)) {
                return total + current.score;
            } else {
                return total;
            }
        }, 0);
        return playerOneTotal > playerTwoTotal;
    };

    // Retrieve team information
    const isWomensTeam = (match) => {
        return match.includes("(W)");
    };

    //Retrieve Match Date
    const extractDateFromString = (inputString) => {
        const regex = /\b(\d{1,2}\/\d{1,2}\/\d{2,4})\b/g;
        const matches = inputString.match(regex);
        if (matches) {
            // Assuming there might be multiple date patterns in the string, return an array of matches
            const firstMatch = matches[0]; // Assuming you want to pick the first matched date
            const dateParts = firstMatch.split("/");
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

    return (
        <div className={styles.matchTilesContainer}>
            <div
                className={styles.matchInfoContainer}
                style={{ height: `${height}px` }}
            >
                <div className={styles.containerTitle}>Final Score</div>
                {/* Player Information  */}
                <div className={styles.playerInfo}>
                    <div className={styles.playerSchoolImg}>
                        <img src={clientLogo}></img>
                    </div>
                    <div
                        className={styles.playerInfoName}
                        style={
                            isUnfinished ? { opacity: "40%" }
                                : !calculateWinner(playerOneFinalScores, playerTwoFinalScores)
                                    ? { opacity: "40%" }
                                    : { opacity: "100%" }
                        }
                    >
                        {playerOneName} {isUnfinished && "(UF)"}
                    </div>
                    <div
                        className={styles.playerInfoScore}
                        style={
                            isUnfinished ? { opacity: "40%" }
                                : !calculateWinner(playerOneFinalScores, playerTwoFinalScores)
                                    ? { opacity: "40%" }
                                    : { opacity: "100%" }
                        }

                    >
                        {/* Check if tie break, if so add exponent */}
                        {playerOneFinalScores.map((score, index) =>
                            isNaN(score.score) ? null : (
                                <div key={index} style={{ position: "relative" }}>
                                    {playerOneTieScores[index] ? (
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
                                                {playerOneTieScores[index]}
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
                        <img src={opposingLogo}></img>
                    </div>
                    <div
                        className={styles.playerInfoName}
                        style={
                            calculateWinner(playerOneFinalScores, playerTwoFinalScores)
                                ? { opacity: "40%" }
                                : { opacity: "100%" }
                        }
                    >
                        {playerTwoName}
                    </div>
                    <div
                        className={styles.playerInfoScore}
                        style={
                            calculateWinner(playerOneFinalScores, playerTwoFinalScores)
                                ? { opacity: "40%" }
                                : { opacity: "100%" }
                        }
                    >
                        {playerTwoFinalScores.map((score, index) =>
                            isNaN(score.score) ? null : (
                                <div key={index} style={{ position: "relative" }}>
                                    {playerTwoTieScores[index] ? (
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
                                                {playerTwoTieScores[index]}
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
            <div
                className={styles.matchInfoContainer}
                style={{ height: `${height}px` }}
            >
                <div className={styles.containerTitle}>Match Information</div>
                <div className={styles.containerInfo}>{matchDetails}</div>
                <div className={styles.containerInfo}>
                    {extractDateFromString(matchName)}
                </div>
            </div>
            {/* School Info */}
            <div
                className={styles.matchInfoContainer}
                style={{ height: `${height}px` }}
            >
                <div className={styles.containerTitle}>Matchup</div>
                <div className={styles.containerInfo}>
                    UCLA {isWomensTeam(matchName) && "(Womens)"}
                </div>
                <div className={styles.containerInfo}>
                    {finalScore[0].opponentTeam} {isWomensTeam(matchName) && "(Womens)"}
                </div>
            </div>
        </div>
    );
};

export default MatchTiles;
