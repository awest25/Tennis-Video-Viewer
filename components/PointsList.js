// components/PointsList.js

import React from 'react';
import styles from '../styles/PointsList.module.css';

const PointsList = ({ pointsData, onPointSelect}) => {
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
