import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React, { useState, useRef } from 'react';
import '../services/initializeFirebase.js'; // Initialize Firebase on the client side

import SearchDropdown from '../components/SearchDropdown';
import VideoPlayer from '../components/VideoPlayer';
import PointsList from '../components/PointsList';

export default function Home() {

  const videoRef = useRef(null);
  const [matchData, setMatchData] = useState(null);

  // Function to jump to a specific time in the video, given in milliseconds, via the YouTube Player API
  const handleJumpToTime = (time) => {
    if (videoRef.current) {
      videoRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'seekTo', args: [time/1000, true] }),
          '*'
      );
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Tennis Video Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Tennis Video Viewer
        </h1>

        <p className={styles.description}>
          Get started by <Link href="/upload-video">uploading a video</Link>.
        </p>

        {/* Search Dropdown */}
        <div className="searchDropdown">
          <SearchDropdown setMatchData={setMatchData} />
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {/* Video Player */}
          <div className="videoPlayer">
            <VideoPlayer videoURL={matchData ? matchData.url : ''} videoRef={videoRef} />
          </div>

          {/* Points List */}
          <div className="pointsList">
            <PointsList pointsData={matchData ? matchData.points : []} onPointSelect={handleJumpToTime}/>
          </div>
        </div>

      </main>

      <footer>
      Developed by Bruin Sports Analytics for use by UCLA Tennis
      </footer>


      <style jsx>{`
        main {
          padding-top: 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .searchDropdown {
          margin-bottom: 1rem;
          width: 80%;
        }

        ${styles.mainContent} {
          display: flex;
          flex-direction: row;
          width: 100%; // Take up the full width
          justify-content: center;
          align-items: flex-start;
        }

        .videoPlayer {
          flex: 2; // Takes up 2/3 of the space
          padding: 1rem;
        }

        .pointsList {
          flex: 1; // Takes up 1/3 of the space
          margin-top: 1rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow-y: auto;
          height: 400px;
        }

        footer {
          width: 100%;
          height: 70px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>


      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
