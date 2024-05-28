import React, { useState, useEffect } from 'react';
import styles from '../styles/PointsList.module.css';
import getTeams from '@/app/services/getTeams.js';

const PointsList = ({ pointsData, onPointSelect, clientTeam, opponentTeam }) => {
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

  const displayedPoints = pointsData;

  return (
    <div className={styles.pointsContainer}>
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
                <td >
                  <div className={styles.imgcontainer}>
                  <div className={styles.playerSchoolImg}>
                    <img src={serverName === point.player1Name ? clientLogo : opponentLogo} className={styles.IMG} />
                  </div>
                  </div>
                </td>
                <td><b style={{ fontSize: '1em' }}>{set}</b></td>
                <td><b style={{ fontSize: '1em' }}>{gameScore}</b></td>
                <td><b style={{ fontSize: '1em', whiteSpace: 'nowrap', width: '20%' }}>{pointScore}</b></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PointsList;
