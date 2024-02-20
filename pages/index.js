import Head from 'next/head';
import styles from '../styles/Home.module.css';
import filterStyles from '../styles/FilterList.module.css';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import nameMap from '../services/nameMap.js';
import '../services/initializeFirebase.js'; // Initialize Firebase on the client side
import SearchDropdown from '../components/SearchDropdown';
import VideoPlayer from '../components/VideoPlayer';
import FilterList from '../components/FilterList';
import PointsList from '../components/PointsList';
import Toolbar from '../components/Toolbar.js';
import ScoreBoard from '../components/ScoreBoard.js'; // Ensure ScoreBoard is correctly imported
import Select from 'react-select';

export default function Home() {
  const [matchData, setMatchData] = useState();
  const [filterList, setFilterList] = useState([]);
  const [videoObject, setVideoObject] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [showPercent, setShowPercent] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [playingPoint, setPlayingPoint] = useState(null);

  // Function to jump to a specific time in the video, given in milliseconds, via the YouTube Player API
  const handleJumpToTime = (time) => {
    if (videoObject && videoObject.seekTo) {
      videoObject.seekTo(time / 1000, true);
    }
  };
  
  
  

  
  useEffect(() => {
    if (matchData) {
      const points = returnFilteredPoints();
      const sortedPoints = [...points].sort((a, b) => b.Position - a.Position);

      const updateScoreboardWithTime = (time) => {
        const currentPoint = sortedPoints.find((point) => point.Position <= time);
        if (currentPoint) {
          setPlayingPoint(currentPoint);
        }
      };

      const intervalId = setInterval(() => {
        if (videoObject && videoObject.getCurrentTime) {
          const currentTime = videoObject.getCurrentTime() * 1000;
          updateScoreboardWithTime(currentTime);
        }
      }, 1000);

      return () => clearInterval(intervalId); // Cleanup to avoid memory leaks
    }
  }, [videoObject, matchData]);

  const returnFilteredPoints = () => {
    let filteredPoints = matchData.points;
    const filterMap = new Map();

    filterList.forEach((filter) => {
      const [key, value] = filter;
      if (filterMap.has(key)) {
        filterMap.get(key).push(value);
      } else {
        filterMap.set(key, [value]);
      }
    });

    filterMap.forEach((values, key) => {
      filteredPoints = filteredPoints.filter(point => 
        values.length > 1 ? values.includes(point[key]) : point[key] === values[0]
      );
    });

    return filteredPoints;
  };

  //Active Filter
  const removeFilter = (key, value) => {
    const updatedFilterList = filterList.filter(([filterKey, filterValue]) => !(filterKey === key && filterValue === value));
    setFilterList(updatedFilterList);
  };

  const sortedFilterList = filterList.sort((a, b) => a[0].localeCompare(b[0]));

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
            <Toolbar setMatchData={setMatchData} />
            <div className={styles.headerRow}>
              <div className={styles.titleContainer}>
                <h2>{matchData.name}</h2>
              </div>
              {/* Options Container */}
              <div className={filterStyles.optionsContainer}>
                <svg
                  className={filterStyles.optionsToggle}
                  onClick={() => setShowOptions(!showOptions)}
                  viewBox="0 0 24 24"
                  fill="black"
                  xmlns="http://www.w3.org/2000/svg">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M4 18L20 18" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M4 12L20 12" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                    <path d="M4 6L20 6" stroke="#000000" stroke-width="2" stroke-linecap="round"></path>
                  </g>
                </svg>
                <div className={filterStyles.optionsList}>
                  {showOptions && (
                    <>
                      <div>
                        <input
                          type="checkbox"
                          id="showOptionsCheckbox"
                          checked={showPercent}
                          onChange={() => setShowPercent(!showPercent)}
                        />
                        <label htmlFor="showOptionsCheckbox">Show Percentage</label>
                      </div>
                      {showPercent && (
                        <Select
                          onChange={(selectedOption) => setShowCount(selectedOption.value === "option2")}
                          options={[
                            { value: "option1", label: "Percent" },
                            { value: "option2", label: "Count" }
                          ]}
                          isSearchable={false}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.mainContent}>
              {/* Video Player */}
              <div className="videoPlayer">
                <VideoPlayer videoId={matchData.videoId} setVideoObject={setVideoObject}/>
              </div>
              <div>
                {/* Filter List */}
                <div className={filterStyles.activeFilterListContainer}>
                  Active Filters:
                  <ul className={filterStyles.activeFilterList}>
                    {sortedFilterList.map(([key, value]) => (
                      <li className={filterStyles.activeFilterItem} key={`${key}-${value}`} style={{ cursor: 'pointer' }} onClick={() => removeFilter(key, value)}>
                        {nameMap[key]}: {value}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* List Holders */}
                <div className='listHolder'>
                  {/* Filter List */}
                  <div className="filterList">
                    <FilterList pointsData={matchData.points} filterList={filterList} setFilterList={setFilterList} showPercent={showPercent} showCount={showCount} />
                  </div>

                  {/* Points List */}
                  <div className="pointsList">
                    <PointsList pointsData={returnFilteredPoints()} onPointSelect={handleJumpToTime} />
                  </div>
                </div>
              </div>
            </div>
            {/* Score display */}
            <div className="scoreboard">
              <ScoreBoard names={matchData.name} playData={playingPoint}/>
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
          margin-top: 0rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow-y: auto;
          height: 350px;
        }

        .filterList {
          flex: 1; // Takes up 1/3 of the space
          margin-top: 0rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow-y: auto;
          height: 350px;
        }
        
        .listHolder {
          display: flex; 
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

