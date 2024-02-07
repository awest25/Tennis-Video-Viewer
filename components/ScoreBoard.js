import React from 'react';
import styles from '../styles/Home.module.css';

const ScoreBoard = ({ pointsData, names}) => {
  // Check if pointsData is null or undefined and provide a default value
  var row1, row2, set1, set2, p1, p2, s, r, players, game1, game2, g;
  var team1, team2;
  players = names.split(' ')
  p1 = players[0]+' '+ players[1]
  p2 = players[3]+ ' '+ players[4]
  // default for now, game score not available
  if(pointsData==null){
    row1 = 0
    row2 = 0
    set1 = 0
    set2=0
    game1 = 0
    game2 =0
  }
  else{
    let name_var = Object.values(pointsData)[1].split(' ')
    let points = name_var[3].split('-')
    row1 = points[0]
    row2=points[1]
    points = Object.values(pointsData)[0].split('-')
    set1 = points[0]
    set2 = points[1]
    s= Object.values(pointsData)[2]
    r= Object.values(pointsData)[3]
    g = name_var[2].split('-')
    game1 = g[0]
    game2 = g[1].replace(',', '');
  }
  
  return (
    <div className={styles.scoreboard}>
      <table>
        <thead>
          <tr>
            <th>Players</th>
            <th>Set</th>
            <th>Game</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
                <tr>
                  <td className={p1 === s ? styles.highlight : ''}>
                  {p1 === s && <span className={styles.arrow}>&rarr;</span>}
                    {p1}</td>
                  <td>{set1}</td>
                  <td>{game1}</td>
                  <td>{row1}
                  </td>
                </tr>
                <tr>
                  <td className={p2 === s ? styles.highlight : ''}>
                  {p2 === s && <span className={styles.arrow}>&rarr;</span>}
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
