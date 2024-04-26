import React, { useEffect, useState } from "react";
import styles from '../styles/ExtendedList.module.css';
import playButtonImage from './play_button.png';
import getTeams from '@/app/services/getTeams.js';
import Winner from '../../public/Winner.js';
import Error from '../../public/Error.js';
import DoubleFault from "@/public/DoubleFault";

const ExtendedList = ({ pointsData, clientTeam, opponentTeam, onPointSelect }) => {
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
    let keys_headers = ["Server", "", "Set Score", "Game Score", "Point", "Point Winner", "Last Shot Type", "Duration"];
    

    const Scroll=(point)=>{
      onPointSelect(point.Position);
      window.scrollTo({
        top: 100,
        behavior: "smooth"
    });
    }

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
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {cellIndex === keys.length - 2 ? (
                                                <>
                                                    {item['lastShotResult'] === 'Winner' && (
                                                        <Winner/>
                                                    )}
                                                    {item['lastShotResult'] === 'Error' && (
                                                        <Error/>
                                                        
                                                    )}
                                                    {item['lastShotResult'] === 'Double Fault' && (
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
                                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g opacity="0.4">
                                    <mask id="mask0_95_468" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="25">
                                    <rect x="0.191406" y="0.93457" width="24" height="24" fill="#D9D9D9"/>
                                    </mask>
                                    <g mask="url(#mask0_95_468)">
                                    <path d="M9.69043 17.4346L16.6904 12.9346L9.69043 8.43457V17.4346ZM12.1904 22.9346C10.8071 22.9346 9.50709 22.6721 8.29043 22.1471C7.07376 21.6221 6.01543 20.9096 5.11543 20.0096C4.21543 19.1096 3.50293 18.0512 2.97793 16.8346C2.45293 15.6179 2.19043 14.3179 2.19043 12.9346C2.19043 11.5512 2.45293 10.2512 2.97793 9.03457C3.50293 7.8179 4.21543 6.75957 5.11543 5.85957C6.01543 4.95957 7.07376 4.24707 8.29043 3.72207C9.50709 3.19707 10.8071 2.93457 12.1904 2.93457C13.5738 2.93457 14.8738 3.19707 16.0904 3.72207C17.3071 4.24707 18.3654 4.95957 19.2654 5.85957C20.1654 6.75957 20.8779 7.8179 21.4029 9.03457C21.9279 10.2512 22.1904 11.5512 22.1904 12.9346C22.1904 14.3179 21.9279 15.6179 21.4029 16.8346C20.8779 18.0512 20.1654 19.1096 19.2654 20.0096C18.3654 20.9096 17.3071 21.6221 16.0904 22.1471C14.8738 22.6721 13.5738 22.9346 12.1904 22.9346ZM12.1904 20.9346C14.4238 20.9346 16.3154 20.1596 17.8654 18.6096C19.4154 17.0596 20.1904 15.1679 20.1904 12.9346C20.1904 10.7012 19.4154 8.80957 17.8654 7.25957C16.3154 5.70957 14.4238 4.93457 12.1904 4.93457C9.9571 4.93457 8.06543 5.70957 6.51543 7.25957C4.96543 8.80957 4.19043 10.7012 4.19043 12.9346C4.19043 15.1679 4.96543 17.0596 6.51543 18.6096C8.06543 20.1596 9.9571 20.9346 12.1904 20.9346Z" fill="#1C1B1F"/>
                                    </g>
                                    </g>
                                    </svg>
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
