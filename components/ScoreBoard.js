import React from 'react';
import styles from '../styles/Home.module.css';

const ScoreBoard = ({ pointsData }) => {
  console.log(pointsData);
  return (
    <div className={styles.scoreboard}>
      <table>
        <thead>
          <tr>
            <th>point</th>
            {/* Add other headers if needed */}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{pointsData ? pointsData[2] : null}</td>
            {/* Add other cells if needed */}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ScoreBoard;