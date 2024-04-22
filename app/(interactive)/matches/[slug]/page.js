'use client'

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'

import filterStyles from '../../../styles/FilterList.module.css'
import styles from '../../../styles/Match.module.css';
import VideoPlayer from '../../../components/VideoPlayer';
import FilterList from '../../../components/FilterList';
import PointsList from '../../../components/PointsList';
import ScoreBoard from '../../../components/ScoreBoard';
import MatchTiles from '@/app/components/MatchTiles';
import extractSetScores from '@/app/services/extractSetScores';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/initializeFirebase';
import transformData from '../../../services/transformData';
import nameMap from '../../../services/nameMap';

// export async function generateStaticParams() {
//     const querySnapshot = await getDocs(collection(db, 'matches'));
//     const matches = querySnapshot.docs.map((doc) => doc.data());

//     return matches.map((match) => ({
//       slug: match.slug,
//     }))
//   }

const MatchPage = () => {
  const [matchData, setMatchData] = useState();
  const [filterList, setFilterList] = useState([]);
  const [videoObject, setVideoObject] = useState(null);
  // const [showOptions, setShowOptions] = useState(false);
  const [showPercent, setShowPercent] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [playingPoint, setPlayingPoint] = useState(null);

  const matchSetScores = matchData ? extractSetScores(matchData.points) : {};

  // const router = useRouter();
  const pathname = usePathname()
  const docId = pathname.substring(pathname.lastIndexOf('/') + 1);

  // Function to jump to a specific time in the video, given in milliseconds, via the YouTube Player API
  const handleJumpToTime = (time) => {
    if (videoObject && videoObject.seekTo) {
      videoObject.seekTo(time / 1000, true);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentRef = doc(db, 'matches', docId);
        const documentSnapshot = await getDoc(documentRef);
        const transformedData = transformData(documentSnapshot.data());
        setMatchData(transformedData)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Call the fetchData function when the component mounts or when videoId changes
  }, []);

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
      }, 200);

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
      {/* Main Content Area */}
      {matchData && (
        <>
          <MatchTiles matchName={matchData.name} clientTeam={matchData.clientTeam} opponentTeam={matchData.opponentTeam} matchDetails={matchData.matchDetails} {...matchSetScores}/>
          <div className={styles.headerRow}>
            <div className={styles.titleContainer}>
              <h2>{matchData.name}</h2>
            </div>
          </div>
          <div className={styles.mainContent}>
            {/* Video Player */}
            <div className="videoPlayer">
              <div>
                <VideoPlayer videoId={matchData.videoId} setVideoObject={setVideoObject} />
              </div>
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
                  {/* Radio Options */}
                  <div className={filterStyles.optionsList}>
                    <div>
                      <input
                        type="radio"
                        id="defaultRadio"
                        checked={!showCount && !showPercent}
                        onChange={() => {
                          setShowPercent(false);
                          setShowCount(false);
                        }}
                      />
                      <label htmlFor="defaultRadio">Default</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="percentRadio"
                        checked={showPercent}
                        onChange={() => {
                          setShowPercent(true);
                          setShowCount(false);
                        }}
                      />
                      <label htmlFor="percentRadio">Show Percent</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="countRadio"
                        checked={showCount}
                        onChange={() => {
                          setShowPercent(false);
                          setShowCount(true);
                        }}
                      />
                      <label htmlFor="countRadio">Show Count</label>
                    </div>
                  </div>
                  <FilterList pointsData={matchData.points} filterList={filterList} setFilterList={setFilterList} showPercent={showPercent} showCount={showCount} />
                </div>
                <div className='jumpList'>
                  {/* Points List */}
                  <div className="pointsList">
                    <PointsList pointsData={returnFilteredPoints()} onPointSelect={handleJumpToTime} />
                  </div>
                  {/* Score display */}
                  <div className="scoreboard">
                    <ScoreBoard names={matchData.name} playData={playingPoint} {...matchSetScores}/>
                  </div>
                </div>

              
                
              </div>
            </div>
          </div>
          <br></br>
          {matchData.pdfUrl && <iframe className={styles.pdfView} src={matchData.pdfUrl} width="90%" height="1550" />}
          <br></br>
        </>
      )}

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
          flex: 1; /* Takes up 1/3 of the space */
          margin-top: 0;
          padding: 1vw;
          margin-left: 1vw;
          border: 0.1vw solid #ddd;
          border-radius: 1.5vw;
          overflow-y: auto;
          height: 30vw;
          background: linear-gradient(to bottom, #ffffff, #fafafa); 
        }

        .filterList {
          flex: 2; // Takes up 1/3 of the space
          margin-top: 0rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 15px;
          overflow-y: auto;
          height: 350px;
        }
        .jumpList {
          width: 325px;
        }
        
        .listHolder {
          display: flex;
          gap: 10px;
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
};

export default MatchPage;