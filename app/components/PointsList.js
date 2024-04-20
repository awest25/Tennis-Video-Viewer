import React, { useState, useEffect } from 'react';
import styles from '../styles/PointsList.module.css';
import getTeams from '@/app/services/getTeams.js';

const PointsList = ({ pointsData, onPointSelect, clientTeam, opponentTeam }) => {
    const [expanded, setExpanded] = useState(false);
    const [clientLogo, setClientLogo] = useState('');
    const [opponentLogo, setOpponentLogo] = useState('');

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

    const parsePointData = (pointName) => {
        const regex = /Set (\d+): (\d+-\d+), (\d+-\d+) (.*?) Serving/;
        const match = pointName.match(regex);

        if (match) {
            const [, set, gameScore, pointScore, serverName] = match;
            return { set, gameScore, pointScore, serverName };
        }
        return { set: '', gameScore: '', pointScore: '', serverName: '' };
    };

    const displayedPoints = expanded ? pointsData : pointsData.slice(0, 5);

    return (
        <div>
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
                    {displayedPoints.map((point, index) => {
                        const { set, gameScore, pointScore, serverName } = parsePointData(point.Name || '');
                        return (
                            <tr
                                className={styles.pointsListItem}
                                key={index}
                                onClick={() => onPointSelect(point.Position)}
                                style={{ cursor: 'pointer' }}
                            >
                                <td>
                                    <div className={styles.playerSchoolImg}>
                                        <img src={serverName === point.player1Name ? clientLogo : opponentLogo} className={styles.IMG} />
                                    </div>
                                </td>
                                <td><b style={{ fontSize: '1em' }}>{set}</b></td>
                                <td><b style={{ fontSize: '1em' }}>{gameScore}</b></td>
                                <td><b style={{ fontSize: '1em', whiteSpace: 'nowrap', width: '20%' }}>{pointScore}</b></td>
                                <td>
                                <svg width="2.7vw" height="2.7vw" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.4">
                                    <mask id="mask0_95_468" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                                    <rect x="0.191406" y="0.93457" width="24" height="24" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_95_468)">
                                    <path d="M9.69043 17.4346L16.6904 12.9346L9.69043 8.43457V17.4346ZM12.1904 22.9346C10.8071 22.9346 9.50709 22.6721 8.29043 22.1471C7.07376 21.6221 6.01543 20.9096 5.11543 20.0096C4.21543 19.1096 3.50293 18.0512 2.97793 16.8346C2.45293 15.6179 2.19043 14.3179 2.19043 12.9346C2.19043 11.5512 2.45293 10.2512 2.97793 9.03457C3.50293 7.8179 4.21543 6.75957 5.11543 5.85957C6.01543 4.95957 7.07376 4.24707 8.29043 3.72207C9.50709 3.19707 10.8071 2.93457 12.1904 2.93457C13.5738 2.93457 14.8738 3.19707 16.0904 3.72207C17.3071 4.24707 18.3654 4.95957 19.2654 5.85957C20.1654 6.75957 20.8779 7.8179 21.4029 9.03457C21.9279 10.2512 22.1904 11.5512 22.1904 12.9346C22.1904 14.3179 21.9279 15.6179 21.4029 16.8346C20.8779 18.0512 20.1654 19.1096 19.2654 20.0096C18.3654 20.9096 17.3071 21.6221 16.0904 22.1471C14.8738 22.6721 13.5738 22.9346 12.1904 22.9346ZM12.1904 20.9346C14.4238 20.9346 16.3154 20.1596 17.8654 18.6096C19.4154 17.0596 20.1904 15.1679 20.1904 12.9346C20.1904 10.7012 19.4154 8.80957 17.8654 7.25957C16.3154 5.70957 14.4238 4.93457 12.1904 4.93457C9.9571 4.93457 8.06543 5.70957 6.51543 7.25957C4.96543 8.80957 4.19043 10.7012 4.19043 12.9346C4.19043 15.1679 4.96543 17.0596 6.51543 18.6096C8.06543 20.1596 9.9571 20.9346 12.1904 20.9346Z" fill="#1C1B1F"/>
                                    </g>
                                    </g>
                                    </svg>
                                </td>
                            </tr>
                        );
                    })}
                    {!expanded && pointsData.length > 4 && (
                        <tr>
                            <td colSpan="5" >
                                <div style={{ padding: '0.5vw' }}>
                                    <button className={styles.buttonn} onClick={() => setExpanded(true)}>Expand</button>
                                </div>
                            </td>
                        </tr>
                    )}
                    {expanded && (
                        <tr>
                            <td colSpan="5">
                                <div style={{ padding: '0.5vw' }}>
                                    <button className={styles.buttonn} onClick={() => setExpanded(false)}>Collapse</button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default PointsList;
