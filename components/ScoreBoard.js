import React from 'react';
import styles from '../styles/Home.module.css';

const ScoreBoard = ({names, playData}) => {
  // Check if pointsData is null or undefined and provide a default value
  var row1, row2, set1, set2, p1, p2, server, players, game1, game2, g;
  var Data;
  var PointLabel  ;
  Data = playData;
  // to handle load as all data is null on load
  if(Data === null){
    row1= 0
    row2= 0
    set1= 0
    set2= 0
    game1 = 0
    game2 = 0
    players = names.split(' ')
    p1 = players[0]+' '+ players[1]
    p2 = players[3]+ ' '+ players[4]
  }
  else{
    if(playData.tiebreakScore != ""){
      PointLabel = "Point (Tiebreaker)"
      row1 = Data.player1TiebreakScore
      row2 = Data.player2TiebreakScore
    }
    else{
      PointLabel = "Point"
      row1 = Data.player1PointScore
      row2 = Data.player2PointScore
    }
    p1 = Data.player1Name
    p2 = Data.player2Name
    set1 = Data.player1SetScore
    set2 = Data.player2SetScore
    game1 = Data.player1GameScore
    game2 = Data.player2GameScore
  }
  
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
                  <td className={p1 === server ? styles.highlight : ''}>
                  {p1 === server && <span className={styles.arrow}>&rarr;</span>}
                    {p1}</td>
                  <td>{set1}</td>
                  <td>{game1}</td>
                  <td>{row1}
                  </td>
                </tr>
                <tr>
                  <td className={p2 === server ? styles.highlight : ''}>
                  {p2 === server && <span className={styles.arrow}>&rarr;</span>}
                    {p2}</td>
                  <td>{set2}</td>
                  <td>{game2}</td>
                  <td>{row2}</td>
                </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
