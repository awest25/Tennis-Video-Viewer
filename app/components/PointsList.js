// components/PointsList.js

import React from 'react';
import styles from '../styles/PointsList.module.css';

const PointsList = ({ pointsData, onPointSelect }) => {
  // Switched for Point Title Calculated in Notebook
  // const calculateTotalSets = (setScore) => {
  //     const scores = setScore.split('-').map(Number);
  //     return scores.reduce((a, b) => a + b, 0) + 1;
  // }

  return (
    <ul className={styles.pointsList}>
      {pointsData.map((point, index) => (
        <li className={styles.pointsListItem} key={index} onClick={() => {onPointSelect(point.Position)}} >
          {point.Name}
        </li>
                
      ))}
    </ul>
  );
}

export default PointsList;
