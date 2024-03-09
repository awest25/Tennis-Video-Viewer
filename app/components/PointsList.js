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
                            <td>{serverName}</td>
                            <td>{set}</td>
                            <td>{gameScore}</td>
                            <td>{pointScore}</td>
                            <td>
                                {/* Display resized play button image */}
                                <button
                                  className={styles.circularButton}
                                  onClick={(event) => {
                                      event.stopPropagation();
                                      onPointSelect(index);
                                  }}>▶</button>
                            </td>
                        </tr>
                    );
                })}
                {!expanded && (
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
