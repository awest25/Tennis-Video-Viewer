import { useState } from "react";

const extractSingleSetScore = (setObject) => {
  // no third set
  if (!setObject) return { score: "", type: "" };
  const setType = (setObject.tiebreakScore !== null && setObject.tiebreakScore !== "" && setObject.tiebreakScore !== undefined) ? "tiebreakScore" : "gameScore";
  return {
    // score: setType === "gameScore" ? setObject.gameScore : setObject.tiebreakScore,
    score: setObject.gameScore,
    type: setType
  };
};

// score: '5-6', score[0] is 5 and score[2] is 6
const extractPlayerFinalScores = (setScores, playerName, i) => {
  return setScores.map(setScore => ({
    score: parseInt(setScore.score[i]),
    playerName: playerName
  }));
};

const extractSetScores = (finalScore) => {
  const [isUnfinished, setIsUnfinished] = useState(false);

  //Extract Final Scores from Each Set
  const firstSetObject = finalScore.filter((score) => score.setNum === 1).pop();
  const secondSetObject = finalScore.filter((score) => score.setNum === 2).pop();
  const thirdSetObject = finalScore.filter((score) => score.setNum === 3).pop();
  const setObjects = [firstSetObject, secondSetObject, thirdSetObject];
  // // Extract Scores and type of Each Set
  const setScores = [extractSingleSetScore(firstSetObject), extractSingleSetScore(secondSetObject), extractSingleSetScore(thirdSetObject)];
  console.log(setScores)
  // Extract Player Names and Assign Scores for Each Player
  // player1 is client, player2 is opponent
  const playerOneName = firstSetObject.player1Name;
  const playerTwoName = firstSetObject.player2Name;
  const playerOneFinalScores = extractPlayerFinalScores(setScores, playerOneName, 0);
  const playerTwoFinalScores = extractPlayerFinalScores(setScores, playerTwoName, 2);

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
    if (setScores[index].type == "gameScore") {
      //Check if unfinished match
      if (playerOneFinalScores[index].score < 5 && playerTwoFinalScores[index].score < 5 && !isUnfinished) {
        setIsUnfinished(true);
      }
      //Increment winners score by 1
      if (playerOneFinalScores[index].score > playerTwoFinalScores[index].score) {
        playerOneFinalScores[index].score++;
      } else {
        playerTwoFinalScores[index].score++;
      }
    } else if (setScores[index].type == "tiebreakScore") {
      //Compare tiebreak scores and increment winner
      playerOneTieScores[index] = parseInt(setObjects[index].tiebreakScore[0]);
      playerTwoTieScores[index] = parseInt(setObjects[index].tiebreakScore[2]);
      //check if unfinished match
      if (playerOneFinalScores[index].score < 5 && playerTwoFinalScores[index].score < 5 && !isUnfinished) {
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

  return { playerOneName, playerTwoName, 
    playerOneFinalScores, playerTwoFinalScores,
    playerOneTieScores, playerTwoTieScores,
    isUnfinished }
}

export default extractSetScores