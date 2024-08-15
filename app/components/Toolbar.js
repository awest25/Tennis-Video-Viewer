'use client'
import React, { useState } from 'react';
import Link from 'next/link';

import SearchDropdown from './SearchDropdown';

import styles from '../styles/Toolbar.module.css';
import '../styles/global.css';

const Toolbar = () => {
  const [user, setUser] = useState(null)
  return (
    <div className={styles.toolbar}>
      {/* Toolbar content goes here */}
      <Link className={styles.name} href="/">Match Viewer</Link>
      {/* <Link className={styles.name} href="/matches">Matches</Link> */}
      <SearchDropdown className={styles.name}/>
      {/* Add more links or content as needed */}
    </div>
  );
};

export default Toolbar;
