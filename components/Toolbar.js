import React from 'react';
import styles from '../styles/Toolbar.module.css';
import SearchDropdown from './SearchDropdown';

const Toolbar = ({ setMatchData, teamToSearch}) => {
    return (
        <div className={styles.toolbar}>
            {/* Toolbar content goes here */}
            <a className={styles.name} href="/">Match Viewer</a>
            {setMatchData!==null && <SearchDropdown setMatchData={setMatchData} />}
            {/* Add more links or content as needed */}
        </div>
    );
};

export default Toolbar;
