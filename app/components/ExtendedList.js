import React, { useEffect, useState} from "react";
import styles from '../styles/ExtendedList.module.css';
import getTeams from '@/app/services/getTeams.js';
import Winner from '../../public/Winner.js';
import Error from '../../public/Error.js';
import DoubleFault from "../../public/DoubleFault";
import PlayButton from "../../public/PlayButton";

const ExtendedList = ({ pointsData, clientTeam, opponentTeam, onPointSelect, iframe }) => {
    const [client_logo, setClientLogo] = useState('');
    const [opponent_logo, setOpponentLogo] = useState('');

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
    });
    let keys = ["", "serverName", "setScore", "gameScore", "pointScore", "pointWonBy", "lastShotResult", "rallyCount"];
    let keys_headers = ["Server", "", "Set Score", "Game Score", "Point", "Point Winner", "Last Shot Type", "Shot Count", ""];


    const Scroll=(point)=>{
        // useref
      onPointSelect(point.Position);
      if (iframe.current) {
        iframe.current.scrollIntoView({ behavior: "smooth" });
    }
    }

    return (
        <div id="table-container" className={styles.tableContainer}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.TR}>
                        {keys_headers.map((key, index) => (
                            <th className={styles.TH} key={index}>{key}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pointsData.map((item, rowIndex) => (
                        <tr className={styles.TR}>
                            {keys.map((key, cellIndex) => (
                                <td className={styles.TD} key={cellIndex}>
                                    {cellIndex === 0 ? (
                                        <img src={item['player1Name'] === item['serverName'] ? client_logo : opponent_logo} className={styles.IMG}/>
                                    ) : (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {cellIndex === keys.length - 2 ? (
                                                <>
                                                    {item['lastShotResult'] === 'Winner' && (
                                                        <Winner/>
                                                    )}
                                                    {item['lastShotResult'] === 'Error' && (
                                                        <Error/>
                                                        
                                                    )}
                                                    {item['lastShotResult'] === 'DoubleFault' && (
                                                        <DoubleFault/>
                                                        
                                                    )}
                                                    <span style={{ marginLeft: '4px' }}>{item['lastShotResult']}</span>
                                                </>
                                            ) : (
                                                item[key]
                                            )}
                                        </div>
                                    )}
                                </td>
                            ))}

                            <td className={styles.TD2}>
                                <button className={styles.button} onClick={() => Scroll(item)}>
                                <PlayButton/>
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
