// app/(homepage)/page.js (Home Component)
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import SearchDropdown from '../components/SearchDropdown';
import styles from '../styles/Home.module.css';
import { useAuth } from '../components/AuthWrapper'; // Import useAuth

const Home = () => {
  const { authUser, userProfile, handleSignOut } = useAuth(); // Use useAuth hook to get the user and sign-out function

  return (
    <div>
      <div className={styles.titleBar}>
        <div className={styles.leftTitle}>
          <h1>BSA | Tennis Consulting</h1>
        </div>
        <div className={styles.rightTitle}>
          {authUser ? (
            <button onClick={handleSignOut}>Sign Out</button>
          ) : (
            <button>Sign In</button>
          )}
        </div>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Match Viewer</h1>

        {/* Search Dropdown */}
        <div className="searchDropdown">
          <SearchDropdown />
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
    </div>
  );
};

export default Home;
