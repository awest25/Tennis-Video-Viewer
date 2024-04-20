import React, { useEffect, useState } from "react";
import styles from '../styles/ExtendedList.module.css';
import playButtonImage from './play_button.png';
import getTeams from '@/app/services/getTeams.js';
import { ReactComponent as RedSvg } from './Red.svg';
import { ReactComponent as YellowSvg } from './Yellow.svg';
import { ReactComponent as GreenSvg } from './Green.svg';

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
                                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9.96338" r="9" fill="url(#paint0_radial_95_406)"/>
                                                        <circle cx="9" cy="9.96338" r="3" fill="#76E696"/>
                                                        <defs>
                                                        <radialGradient id="paint0_radial_95_406" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 9.96338) rotate(90) scale(9)">
                                                        <stop stop-color="white"/>
                                                        <stop offset="1" stop-color="#DCF6E4"/>
                                                        </radialGradient>
                                                        </defs>
                                                        </svg>
                                                        
                                                    )}
                                                    {item['lastShotResult'] === 'Error' && (
                                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9.96338" r="9" fill="url(#paint0_radial_95_660)"/>
                                                        <circle cx="9" cy="9.96338" r="3" fill="#F7AB1C"/>
                                                        <defs>
                                                        <radialGradient id="paint0_radial_95_660" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 9.96338) rotate(90) scale(9)">
                                                        <stop stop-color="white"/>
                                                        <stop offset="1" stop-color="#FFEBCD"/>
                                                        </radialGradient>
                                                        </defs>
                                                        </svg>
                                                        
                                                    )}
                                                    {item['lastShotResult'] === 'Double Fault' && (
                                                        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <circle cx="9" cy="9.96338" r="9" fill="url(#paint0_radial_95_656)"/>
                                                        <circle cx="9" cy="9.96338" r="3" fill="#FF866B"/>
                                                        <defs>
                                                        <radialGradient id="paint0_radial_95_656" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(9 9.96338) rotate(90) scale(9)">
                                                        <stop stop-color="white"/>
                                                        <stop offset="1" stop-color="#FFEDEA"/>
                                                        </radialGradient>
                                                        </defs>
                                                        </svg>
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

                            <td>
                                <button className={styles.button} onClick={() => Scroll(item)}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 30" x="0px" y="0px" style={{ width: '50px', height: '30px' }}>
                                        <title>play circle</title>
                                        <g data-name="play circle">
                                            <path d="M12,24A12,12,0,1,1,24,12,12,12,0,0,1,12,24ZM12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Z" stroke="grey" fill="grey" />
                                            <path d="M9,17 L16,12 L9,7 Z" fill="grey"/>
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
