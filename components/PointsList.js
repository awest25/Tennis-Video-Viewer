// components/PointsList.js

import React from 'react';

const PointsList = ({ points, onPointSelect }) => {
    return (
        <ul>
            {points.map((point, index) => (
                <li key={index} onClick={() => onPointSelect(point.timestamp)}>
                    {point.description}
                </li>
            ))}
        </ul>
    );
}

export default PointsList;
