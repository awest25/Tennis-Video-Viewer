import React, { useState } from 'react';
import styles from '../styles/PointsList.module.css';


const PointsList = ({ pointsData, onPointSelect }) => {
    const [expanded, setExpanded] = useState(false); // State to track whether rows are expanded

    const parsePointData = (pointName) => {
        const regex = /Set (\d+): (\d+-\d+), (\d+-\d+) (.*?) Serving/;
        const match = pointName.match(regex);

        if (match) {
            const [, set, gameScore, pointScore, serverName] = match;
            return { set, gameScore, pointScore, serverName };
        }

        return { set: '', gameScore: '', pointScore: '', serverName: '' };
    };

    const visiblePointsData = expanded ? pointsData : pointsData.slice(0, 5); // Display only 5 elements initially or all if expanded

    return (
        <table className={styles.pointsList}>
            <thead>
                <tr>
                    <th>Server</th>
                    <th>Set</th>
                    <th>Game</th>
                    <th>Point</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {visiblePointsData.map((point, index) => {
                    const pointText = point.Name || '';
                    const { set, gameScore, pointScore, serverName } = parsePointData(pointText);

                    return (
                        <tr className={styles.pointsListItem} key={index}>
                            <td><b>{serverName}</b></td>
                            <td><b>{set}</b></td>
                            <td><b>{gameScore}</b></td>
                            <td><b>{pointScore}</b></td>
                            <td>
                                {/* Display resized play button image */}
                                <button
                                   class="button button5"
                                  onClick={(event) => {
                                      event.stopPropagation();
                                      onPointSelect(index);
                                  }}>▶</button>
                            </td>
                        </tr>
                    );
                })}
                {!expanded && pointsData.length >= 5 && ( // Only render the expand button if there are 5 or more points
                    <tr>
                        <td colSpan="5" className={styles.expandButtonCell}>
                            <button className={styles.expandButton} onClick={() => setExpanded(true)}>Expand</button>
                        </td>
                    </tr>
                )}
                {expanded && (
                    <tr>
                        <td colSpan="5" className={styles.expandButtonCell}>
                            <button className={styles.collapseButton} onClick={() => setExpanded(false)}>Collapse</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
}

export default PointsList;
