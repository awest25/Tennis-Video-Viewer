import React, { useState, useEffect, useMemo } from 'react';
import styles from '../styles/PointsList.module.css';
import getTeams from '@/app/services/getTeams.js';

const PointsList = ({ pointsData, onPointSelect, clientTeam, opponentTeam , matchData}) => {
    const [expanded, setExpanded] = useState(false);
    const [clientLogo, setClientLogo] = useState('');
    const [opponentLogo, setOpponentLogo] = useState('');
    // console.log("pointsData",pointsData)
    // console.log("clientTeam",clientTeam)
    // console.log("opponentTeam",opponentTeam)
    // console.log("matchData",matchData)


    const parsePointData = (pointName) => {
        const regex = /Set (\d+): (\d+-\d+), (\d+-\d+) (.*?) Serving/;
        const match = pointName.match(regex);

        if (match) {
            const [, set, gameScore, pointScore, serverName] = match;
            return { set, gameScore, pointScore, serverName };
        }
        return { set: '', gameScore: '', pointScore: '', serverName: '' };
    };

    const parsedPointsData = useMemo(() => {
        const visiblePoints = expanded ? pointsData : pointsData.slice(0, 4);
        return visiblePoints.map(point => ({
            ...point,
            parsedData: parsePointData(point.Name || '')
        }));
    }, [pointsData, expanded]);

    useEffect(() => {
        const fetchLogos = async () => {
            try {
                const allTeams = await getTeams();
                const clientLogoURL = allTeams.find((team) => team.name === clientTeam)?.logoUrl || '';
                const opponentLogoURL = allTeams.find((team) => team.name === opponentTeam)?.logoUrl || '';
                setClientLogo(clientLogoURL);
                setOpponentLogo(opponentLogoURL);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchLogos();
    }, [clientTeam, opponentTeam]);

    const getPlayerTeamLogo = (serverName) => {
        const playerRegex = /^(.*?)(?=\sUCLA|\svs|$)/;
        const match = matchData.name.match(playerRegex);
        const firstPlayerName = match ? match[0].trim() : '';
        const isServerPlayer = firstPlayerName === serverName;
        return isServerPlayer ? clientLogo : opponentLogo;
    };

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
                
                    return (
                        <tr
                            className={styles.pointsListItem}
                            key={index}
                            onClick={() => onPointSelect(point.Position)}
                            style={{ cursor: 'pointer' }}
                        >
                            <td>
                                <div className={styles.playerSchoolImg}>
                                    <img src={getPlayerTeamLogo(serverName)} alt="Team Logo" style={{ width: '50px', height: '30px' }} />
                                </div>
                            </td>
                            <td><b style={{ fontSize: '1.1em' }}>{set}</b></td>
                            <td><b style={{ fontSize: '1.1em' }}>{gameScore}</b></td>
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
