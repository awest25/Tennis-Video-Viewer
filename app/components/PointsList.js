import React, { useState, useMemo } from 'react';
import styles from '../styles/PointsList.module.css';

const PointsList = ({ teamsData, pointsData, onPointSelect, clientLogo, opposingLogo }) => {
    const [expanded, setExpanded] = useState(false);
    console.log('Teams Data:', teamsData);
    console.log('Points Data:', pointsData);

    // Utility function to parse individual point data
    const parsePointData = (pointName) => {
        const regex = /Set (\d+): (\d+-\d+), (\d+-\d+) (.*?) Serving/;
        const match = pointName.match(regex);

        if (match) {
            const [, set, gameScore, pointScore, serverName] = match;
            return { set, gameScore, pointScore, serverName };
        }
        return { set: '', gameScore: '', pointScore: '', serverName: '' };
    };

    // useMemo to calculate visible points and parse their data only when pointsData or expanded changes
    const parsedPointsData = useMemo(() => {
        const visiblePoints = expanded ? pointsData : pointsData.slice(0, 4);
        return visiblePoints.map(point => ({
            ...point,
            parsedData: parsePointData(point.Name || '')
        }));
    }, [pointsData, expanded]);

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
                {parsedPointsData.map((point, index) => {
                    const { set, gameScore, pointScore, serverName } = point.parsedData;
                    const logoToUse = serverName === point['player1Name'] ? clientLogo : opposingLogo;

                    return (
                        <tr
                            className={styles.pointsListItem}
                            key={index}
                            onClick={() => onPointSelect(point.Position)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>
                                <div className={styles.playerSchoolImg}>
                                    <img src={logoToUse} alt="Team Logo" style={{ width: '50px', height: '30px' }} />
                                </div>
                            </td>
                            <td><b style={{ fontSize: '1.1em',  }}>{set}</b></td>
                            <td><b style={{ fontSize: '1.1em',   }}>{gameScore}</b></td>
                            <td><b style={{ fontSize: '1.1em', whiteSpace: 'nowrap', width: '20%' }}>{pointScore}</b></td>
                            <td>
                                <img src="https://icons.veryicon.com/png/o/miscellaneous/food-time/play-video-1.png" alt="Play Icon" style={{ maxWidth: '30px', height: 'auto', minWidth: '30px' }} />
                            </td>
                        </tr>
                    );
                })}
                {!expanded && pointsData.length > 5 && (
                    <tr>
                        <td colSpan="5">
                            <button className={styles.buttonn} onClick={() => setExpanded(true)}>Expand</button>
                        </td>
                    </tr>
                )}
                {expanded && (
                    <tr>
                        <td colSpan="5">
                            <button className={styles.buttonn} onClick={() => setExpanded(false)}>Collapse</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default PointsList;
