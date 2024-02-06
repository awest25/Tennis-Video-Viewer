import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import '../services/initializeFirebase.js'; // Initialize Firebase on the client side

import SearchDropdown from '../components/SearchDropdown';
import VideoPlayer from '../components/VideoPlayer';
import FilterList from '../components/FilterList';
import PointsList from '../components/PointsList';
import Toolbar from '../components/Toolbar.js';
import ScoreBoard from '../components/ScoreBoard.js';

export default function Home() {

  const [matchData, setMatchData] = useState(null);
  const [filterList, setFilterList] = useState([]);
  const [videoObject, setVideoObject] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  // Function to jump to a specific time in the video, given in milliseconds, via the YouTube Player API
  var arr = [];
  const handleJumpToTime = (time) => {
    if (videoObject && videoObject.seekTo) {
      videoObject.seekTo(time / 1000, true);
    }
  };

  const handlePointClick = (point) => {
    handleJumpToTime(point.Position);
    console.log(point)
    setSelectedPoint([point.setScore, point.Name, point.serverName, point.returnerName]);
  };

  // const load_board = (point) => {

  // };

  const returnFilteredPoints = () => {
    let filteredPoints = matchData.points;
    const filterMap = new Map();
  
    // Group filters by key
    filterList.forEach(filter => {
      const [key, value] = filter;
      if (filterMap.has(key)) {
        filterMap.get(key).push(value);
      } else {
        filterMap.set(key, [value]);
      }
    });
  
    // Apply filters
    filterMap.forEach((values, key) => {
      if (values.length > 1) {
        // Multiple values for the same key, use OR logic
        filteredPoints = filteredPoints.filter(point => values.includes(point[key]));
      } else {
        // Single value for the key, use AND logic
        filteredPoints = filteredPoints.filter(point => point[key] === values[0]);
      }
    });

    return filteredPoints;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Match Viewer</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {!matchData && (
          <>
            <h1 className={styles.title}>
              Match Viewer
            </h1>

            {/* Search Dropdown */}
            <div className="searchDropdown">
              <SearchDropdown setMatchData={setMatchData} />
            </div>

            {/* Other Links */}
            <div className={styles.actionsContainer}>
              <p>Or get started by:</p>
              <ul>
                <li>
                    <Link href="/upload-video">Uploading a video</Link>
                </li>
                <li>
                  <Link href="/tag-match">Tagging a match</Link>
                </li>
              </ul>
            </div>

          </>
        )}

        {/* Main Content Area */}
        {matchData && (
          <>
            {/* Toolbar */}
            <Toolbar setMatchData={setMatchData}/>
            <h2>{matchData.name}</h2>
            <div className={styles.mainContent}>
              {/* Video Player */}
              <div className="videoPlayer">
                <VideoPlayer videoId={matchData.videoId} setVideoObject={setVideoObject} />
              </div>

              {/* Filter List */}
              <div className="filterList">
                <FilterList pointsData={matchData.points} filterList={filterList} setFilterList={setFilterList} />
              </div>

              {/* Points List */}
              <div className="pointsList">
              <PointsList pointsData={returnFilteredPoints()} onPointSelect={handleJumpToTime} onPointClick={handlePointClick}/>
              </div>
            </div>
            {/* Score display */}
            <div className="scoreboard">
              <ScoreBoard pointsData = {selectedPoint} names = {matchData.name}/>
            </div>
            <br></br>
            {matchData.pdfUrl && <iframe className={styles.pdfView} src={matchData.pdfUrl} width="90%" height="1550" />}
            <br></br>
          </>
        )}

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

        .filterList {
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

