import React, {useState} from "react";

import styles from "../styles/Roster.module.css";
const RosterTile = ({ firstName, lastName, playerPhoto, isActive, onClick }) => {

    return (
        <div className={styles.playerContainer}>
            <div 
                className={styles.infoContainer} 
                style={{ backgroundColor: isActive ? "#F1F9FF" : "#FFFFFF" }}
                onClick={onClick}
            >
                <img className={styles.playerImage} src={playerPhoto} alt="" />
                <div className={styles.textContainer}>
                    <div className={styles.playerName}>
                        {firstName} {lastName}
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default RosterTile