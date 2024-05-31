'use client'

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'

import filterStyles from '../../../styles/FilterList.module.css'
import styles from '../../../styles/Match.module.css';
import VideoPlayer from '../../../components/VideoPlayer';
import FilterList from '../../../components/FilterList';
import PointsList from '../../../components/PointsList';
import ScoreBoard from '../../../components/ScoreBoard';
import MatchTiles from '@/app/components/MatchTiles';
import { AuthProvider } from '@/app/components/AuthWrapper';
import extractSetScores from '@/app/services/extractSetScores';
import ExtendedList from '../../../components/ExtendedList';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../services/initializeFirebase';
import transformData from '../../../services/transformData';
import nameMap from '../../../services/nameMap';

const MatchPage = () => {
  const [matchData, setMatchData] = useState();
  const [filterList, setFilterList] = useState([]);
  const [videoObject, setVideoObject] = useState(null);
  const [showPercent, setShowPercent] = useState(false);
  const [showCount, setShowCount] = useState(false);
  const [playingPoint, setPlayingPoint] = useState(null);
  const [showPDF, setShowPDF] = useState(false);
  const tableRef = useRef(null);
  const iframeRef = useRef(null);

  const matchSetScores = matchData ? extractSetScores(matchData.points) : {};

  // const router = useRouter();
  const pathname = usePathname()
  const docId = pathname.substring(pathname.lastIndexOf('/') + 1);

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
        setMatchData(transformedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [docId]);

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

      return () => clearInterval(intervalId);
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

  const removeFilter = (key, value) => {
    const updatedFilterList = filterList.filter(([filterKey, filterValue]) => !(filterKey === key && filterValue === value));
    setFilterList(updatedFilterList);
  };

  const scrollToDetailedList = () => {
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const togglePDF = () => {
    setShowPDF(false);
  };

  const togglePoints = () => {
    setShowPDF(true);
  };

  const sortedFilterList = filterList.sort((a, b) => a[0].localeCompare(b[0]));

  return (
    <AuthProvider>
      <div className={styles.container}>
        {matchData && (
          <>
            <MatchTiles matchName={matchData.name} clientTeam={matchData.clientTeam} opponentTeam={matchData.opponentTeam} matchDetails={matchData.matchDetails} {...matchSetScores}  />
            <div className={styles.headerRow}>
              <div className={styles.titleContainer}>
                <h2>{matchData.name}</h2>
              </div>
            </div>
            <div className={styles.mainContent}>
              <div className="videoPlayer">
                <div ref={iframeRef}>
                  <VideoPlayer videoId={matchData.videoId} setVideoObject={setVideoObject} />
                </div>
              </div>
              <div>
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
                <div className='listHolder'>
                  <div className="filterList">
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
                    <div className="pointsList">
                      <PointsList pointsData={returnFilteredPoints()} onPointSelect={handleJumpToTime} clientTeam={matchData.clientTeam} opponentTeam={matchData.opponentTeam}  />
                    </div>
                  <div style={{ padding: '0.5vw', paddingLeft: '5vw' }}>
                    <button className={styles.viewDetailedListButton} onClick={() => scrollToDetailedList()}>View Detailed List</button>
                  </div>
                    <div className="scoreboard">
                      <ScoreBoard names={matchData.name} playData={playingPoint} {...matchSetScores}  />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          <div className={styles.toggle}>
            <button onClick={() => togglePDF()} className={showPDF ? styles.toggle_buttona_inactive : styles.toggle_buttona_active}>Points</button>
            <button onClick={() => togglePoints()} className={showPDF ? styles.toggle_buttonb_active : styles.toggle_buttonb_inactive}>Key Stats & Visuals</button>
            {showPDF ? (
              <iframe className={styles.pdfView} src={matchData.pdfUrl} width="90%" height="1550" />
            ) : (
              <div ref={tableRef} className={styles.ExtendedList}>
                <ExtendedList pointsData={returnFilteredPoints()} clientTeam={matchData.clientTeam} opponentTeam={matchData.opponentTeam} onPointSelect={handleJumpToTime} iframe={iframeRef} />
              </div>
            )}
          </div>
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
            width: 100%;
            justify-content: center;
            align-items: flex-start;
          }

          .videoPlayer {
            flex: 2;
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
    </AuthProvider>
  );
};

export default MatchPage;
