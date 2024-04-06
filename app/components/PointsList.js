import React, { useState } from 'react';
import styles from '../styles/PointsList.module.css';

const PointsList = ({ pointsData, onPointSelect, clientLogo, opposingLogo}) => {
    const [expanded, setExpanded] = useState(false);

    const parsePointData = (pointName) => {
        const regex = /Set (\d+): (\d+-\d+), (\d+-\d+) (.*?) Serving/;
        const match = pointName.match(regex);

        if (match) {
            const [, set, gameScore, pointScore, serverName] = match;
            return { set, gameScore, pointScore, serverName };
        }
        return { set: '', gameScore: '', pointScore: '', serverName: '' };
    };

    const visiblePointsData = expanded ? pointsData : pointsData.slice(0, 5);

    return (
        <table className={styles.pointsList}>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z" crossorigin="anonymous"></link>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js" integrity="sha384-pzjw8f+JdXm2JSB79/Oz+FAk8L/ny3gmm8gjOqc4hFQt0Ec6m8U5tV/ds9vL3ftj" crossorigin="anonymous"></script>

            <thead>
                <tr>
                    <th>Server</th>
                    <th>Set</th>
                    <th>Game</th>
                    <th >Point</th> {/* Set a fixed width for the "Point" column */}
                   
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {visiblePointsData.map((point, index) => {
                    const { set, gameScore, pointScore, serverName } = parsePointData(point.Name || '');
                    // Determine which logo to use based on the server's name compared within each point
                    const logoToUse = point['serverName'] === point['player1Name'] ? clientLogo : opposingLogo;

                    return (
                        <tr className={styles.pointsListItem} key={index}>
                            <td>
                            <div className={styles.playerSchoolImg}>
                                <img src={logoToUse} alt="Team Logo" style={{ width: '50px', height: '30px' }} />
                                {/*serverName*/}
                            </div>
                            </td>
                            <td><b style={{ fontSize: '1.1em'  }}>{set}</b></td>
                            <td><b style={{ fontSize: '1.1em' }}>{gameScore}</b></td>
                            <td><b style={{ fontSize: '1.1em', whiteSpace: 'nowrap'  ,width: '20%'  }}>{pointScore}</b></td>


                            <td>
                            <div 
                                onClick={(event) => {
                                    event.stopPropagation();
                                    onPointSelect(point.Position); // Assuming you have a way to uniquely identify points
                                }}
                            > <img src="https://icons.veryicon.com/png/o/miscellaneous/food-time/play-video-1.png" alt="Team Logo" style={{ maxWidth: '30px', height: 'auto', minWidth: '30px' }} />
                               
                            </div>
                                </td>
                        </tr>
                    );
                })}
                {!expanded && pointsData.length > 5 && (
                    <tr>
                        <td colSpan="5">
                            <button className="btn btn-light" onClick={() => setExpanded(true)}>Expand</button>
                        </td>
                    </tr>
                )}
                {expanded && (
                    <tr>
                        <td colSpan="5">
                            <button className="btn btn-lighty" onClick={() => setExpanded(false)}>Collapse</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};



export default PointsList;
