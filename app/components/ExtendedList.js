import React from 'react';
import styles from '../styles/ExtendedList.module.css';
import playButtonImage from '../play_circle.jpg';

const ExtendedList = ({ pointsData, client_logo, opponent_logo }) => {
    let keys = ["", "serverName", "setScore", "gameScore", "pointScore", "pointWonBy", "lastShotResult", "rallyCount"];
    let keys_headers = ["", "Server", "Set Score", "Game Score", "Point", "Point Winner", "Last Shot Type", "Duration"];
    

    return (
        <div id="table-container" className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {keys_headers.map((key, index) => (
                            <th className={styles.TH} key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pointsData.map((item, rowIndex) => (
                        <tr key={rowIndex}>
                            {keys.map((key, cellIndex) => (
                                <td className={styles.TD} key={cellIndex}>
                                    {cellIndex === 0 ? (
                                        <img src={item['player1Name'] === item['serverName'] ? client_logo : opponent_logo} className={styles.IMG}/>
                                    ) : (
                                        item[key]
                                    )}
                                </td>
                            ))}
                            <td>
                                <button className={styles.button}>
                                    <img src={playButtonImage} className={styles.playButton} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ExtendedList;
