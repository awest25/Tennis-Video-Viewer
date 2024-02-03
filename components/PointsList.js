// components/PointsList.js

import React from 'react';
import styles from '../styles/PointsList.module.css';

const PointsList = ({ pointsData, onPointSelect, onPointClick}) => {
    return (
        <ul className={styles.pointsList}>
            {pointsData.map((point, index) => (
                <li className={styles.pointsListItem} key={index} onClick={() => {onPointSelect(point.Position); onPointClick(point);}} >
                    {point.Name}
                </li>
            ))}
        </ul>
    );
}

export default PointsList;
