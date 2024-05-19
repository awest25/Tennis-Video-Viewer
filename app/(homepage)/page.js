'use client'
import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import SearchDropdown from '../components/SearchDropdown';
import SignIn from '../components/SignIn';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [user, setUser] = useState(null);

  const handle_effect = (user)=>{
    setUser(user);
  }
  return (
    <div>
      <div className={styles.titleBar}>
      <div className={styles.leftTitle}>
        <h1>BSA | Tennis Consulting</h1>
      </div>
      <div className={styles.rightTitle}>
        <button onClick={()=>console.log('clicked sign in')}>Sign In</button>
      </div>
      </div>
      {user ? (
        <div className={styles.container}>
          <h1 className={styles.title}>Match Viewer</h1>

          {/* Search Dropdown */}
          <div className="searchDropdown">
            <SearchDropdown authorization={user}/>
          </div>

          {/* Other Links */}
          <div className={styles.actionsContainer}>
            <p>Or get started by:</p>
            <ul>
              <li>
                <Link href="/upload-match">Uploading a match</Link>
              </li>
              <li>
                <Link href="/upload-team">Adding a Team</Link>
              </li>
              <li>
                <Link href="/tag-match">Tagging a match</Link>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className={styles.container}>
        <SignIn setUser={handle_effect}/>
        </div>
      )}
    </div>
  );
};

export default Home;
