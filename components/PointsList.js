// components/PointsList.js

import React from 'react';
import styles from '../styles/PointsList.module.css';

const PointsList = ({ pointsData, onPointSelect }) => {
    return (
        <ul class={styles.pointsList}>
            {pointsData.map((point, index) => (
                <li class={styles.pointsListItem} key={index} onClick={() => onPointSelect(point.Position)} style={{ cursor: 'pointer' }}>
                    {point.Name}
                </li>
            ))}
        </ul>
    );
}

export default PointsList;
