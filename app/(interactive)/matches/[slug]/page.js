'use client'

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation'

import filterListStyles from '../../../styles/FilterList.module.css'
import styles from '../../../styles/Match.module.css';
import VideoPlayer from '../../../components/VideoPlayer';
import FilterList from '../../../components/FilterList';
import PointsList from '../../../components/PointsList';
import ScoreBoard from '../../../components/ScoreBoard';
import MatchTiles from '@/app/components/MatchTiles';
import extractSetScores from '@/app/services/extractSetScores';
import ExtendedList from '../../../components/ExtendedList';

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
  const [showPDF, setShowPDF] = useState(true);
  const [tab, setTab] = useState(1);
  const [triggerScroll, setTriggerScroll] = useState(false);
  const tableRef = useRef(null);
  const iframeRef = useRef(null);

  const matchSetScores = matchData ? extractSetScores(matchData.points) : {};

  // const router = useRouter();
  console.log(matchData)
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

  useEffect(() => {
    if (triggerScroll && !showPDF) {
      if (tableRef.current) {
        tableRef.current.scrollIntoView({ behavior: "smooth" });
      }
      setTriggerScroll(false);
    }
  }, [triggerScroll, showPDF]);

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

  const scrollToDetailedList = () => {
    setShowPDF(false);
    setTriggerScroll(true);
  };


  const sortedFilterList = filterList.sort((a, b) => a[0].localeCompare(b[0]));

  function addBorderRadius() {
    console.log('adding border radius');
    const anyIframe = document.getElementById('player');
    if (anyIframe) {
      console.log('found iframe:', anyIframe);
      anyIframe.style.borderRadius = '10px';
    }
  }

  return (
    <div className={styles.container}>
      {/* Main Content Area */}
      {matchData && (
        <>
          <MatchTiles matchName={matchData.name} clientTeam={matchData.clientTeam} opponentTeam={matchData.opponentTeam} matchDetails={matchData.matchDetails} {...matchSetScores} />
          <div className={styles.headerRow}>
            <div className={styles.titleContainer}>
              <h2>{matchData.name}</h2>
            </div>
          </div>
          <div className={styles.mainContent}>
            {/* Video Player */}
            <div className={styles.videoPlayer}>
              <div ref={iframeRef}>
                <VideoPlayer id='player' videoId={matchData.videoId} setVideoObject={setVideoObject} onReady={addBorderRadius} />
              </div>
            </div>
            <div className={styles.sidebar}>
              {/* Filter List */}
              <div className={filterListStyles.activeFilterListContainer}>
                Active Filters:
                <ul className={filterListStyles.activeFilterList}>
                  {sortedFilterList.map(([key, value]) => (
                    <li className={filterListStyles.activeFilterItem} key={`${key}-${value}`} style={{ cursor: 'pointer' }} onClick={() => removeFilter(key, value)}>
                      {nameMap[key]}: {value}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setTab(0)} className={tab === 0 ? styles.toggle_buttona_active : styles.toggle_buttona_inactive}>Filters</button>
              <button onClick={() => setTab(1)} className={tab === 1 ? styles.toggle_buttonb_active : styles.toggle_buttonb_inactive}>Points</button>
              {/* List Holders */}
              {/* Filter List */}
              {tab === 0 && 
                <div className={styles.sidebox}>
                  {/* Radio Options */}
                  <div className={filterListStyles.optionsList}>
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
                  <div className={styles.sidecontent}>
                    <FilterList pointsData={matchData.points} filterList={filterList} setFilterList={setFilterList} showPercent={showPercent} showCount={showCount} />
                  </div>
                </div>}
              {tab === 1 &&
                <div className={styles.sidebox}>
                  {/* Points List */}
                  <div className={styles.sidecontent}>
                    <PointsList pointsData={returnFilteredPoints()} onPointSelect={handleJumpToTime} clientTeam={matchData.clientTeam} opponentTeam={matchData.opponentTeam} />
                  </div>
                  <div style={{ padding: '0.5vw', paddingLeft: '5vw' }}>
                    <button className={styles.viewDetailedListButton} onClick={() => scrollToDetailedList()}>View Detailed List</button>
                  </div>
                </div>}
              {/* Score display */}
              <div className="scoreboard">
                <ScoreBoard names={matchData.name} playData={playingPoint} {...matchSetScores} />
              </div>
            </div>
          </div>
          <div className={styles.toggle}>
            <button onClick={() => setShowPDF(true)} className={showPDF ? styles.toggle_buttonb_active : styles.toggle_buttonb_inactive}>Key Stats & Visuals</button>
            <button onClick={() => setShowPDF(false)} className={showPDF ? styles.toggle_buttona_inactive : styles.toggle_buttona_active}>Points</button>
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
        
        .listHolder {
          display: flex;
          gap: 10px;
        }
      `}</style>
    </div>
  );
};

export default MatchPage;