import React, { useEffect, useState } from "react";
import styles from '../styles/ExtendedList.module.css';
import playButtonImage from './play_button.png';
import getTeams from '@/app/services/getTeams.js';

const Logos = ({
    clientTeam,
    opponentTeam,
  }) => {
    const [clientLogo, setClientLogo] = useState('');
    const [opponentLogo, setOpponentLogo] = useState('');
    const [isUnfinished, setIsUnfinished] = useState(false);
  
    useEffect(() => {
      const fetchLogos = async () => {
        try {
          const allTeams = await getTeams();
          const clientLogoURL = allTeams.find((team) => team.name === clientTeam).logoUrl;
          const opponentLogoURL = allTeams.find((team) => team.name === opponentTeam).logoUrl;
          setClientLogo(clientLogoURL);
          setOpponentLogo(opponentLogoURL);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchLogos();
    });}

const ExtendedList = ({ pointsData, clientTeam, opponentTeam }) => {
    const [client_logo, setClientLogo] = useState('');
    const [opponent_logo, setOpponentLogo] = useState('');
  
    useEffect(() => {
      const fetchLogos = async () => {
        try {
          console.log(clientTeam);
          console.log(opponentTeam);
          const allTeams = await getTeams();
          const clientLogoURL = allTeams.find((team) => team.name === clientTeam).logoUrl;
          const opponentLogoURL = allTeams.find((team) => team.name === opponentTeam).logoUrl;
          setClientLogo(clientLogoURL);
          setOpponentLogo(opponentLogoURL);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchLogos();
    });
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
