import React from 'react';
import styles from '../styles/Home.module.css';

const ScoreBoard = ({ pointsData }) => {
  // Check if pointsData is null or undefined and provide a default value
  var row1, row2, set1, set2, p1, p2, s, r;
  if(pointsData==null){
    row1 = 0
    row2 = 0
    set1 = 0
    set2=0
  }
  else{
    let points = Object.values(pointsData)[1].split('-')
    row1 = points[0]
    row2=points[1]
    points = Object.values(pointsData)[0].split('-')
    set1 = points[0]
    set2 = points[1]
    s= Object.values(pointsData)[2]
    r= Object.values(pointsData)[3]
    if (s>r){
      p1 = s
      p2 = r
    }
    else{
      p1 = r
      p2=s
    }
  }
  
  return (
    <div className={styles.scoreboard}>
      <table>
        <thead>
          <tr>
            <th>Players</th>
            <th>Set</th>
            <th>Point</th>
          </tr>
        </thead>
        <tbody>
                <tr>
                  <td>{p1}</td>
                  <td>{set1}</td>
                  <td>{row1}</td>
                </tr>
                <tr>
                  <td>{p2}</td>
                  <td>{set2}</td>
                  <td>{row2}</td>
                </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;
