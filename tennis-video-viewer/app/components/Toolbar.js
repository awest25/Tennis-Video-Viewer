import React from 'react';
import Link from 'next/link';

import styles from '../styles/Toolbar.module.css';

const Toolbar = () => {
    return (
        <div className={styles.toolbar}>
            {/* Toolbar content goes here */}
            <Link className={styles.name} href="/">Match Viewer</Link>
            {/* <Link className={styles.name} href="/">Match Viewer</Link> */}
            <Link className={styles.name} href="/matches">Matches</Link>
            {/* <Link className={styles.name} href="/matches">Matches</Link> */}
            {/* Add more links or content as needed */}
        </div>
    );
};

export default Toolbar;
