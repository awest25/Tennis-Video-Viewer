// pages/matches/[matchName].js
import Head from 'next/head';
import styles from '../../styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { db } from '../../services/initializeFirebase.js';
import { doc, getDoc } from 'firebase/firestore';
import SearchDropdown from '../../components/SearchDropdown';
import VideoPlayer from '../../components/VideoPlayer';
import FilterList from '../../components/FilterList';
import PointsList from '../../components/PointsList';
import Toolbar from '../../components/Toolbar.js';

const MatchPage = () => {
    const router = useRouter();
    const { matchName } = router.query;
    const [matchData, setMatchData] = useState(null);
    const [filterList, setFilterList] = useState([]);
    const [videoObject, setVideoObject] = useState(null);

    useEffect(() => {
        if (matchName) {
            const fetchMatchData = async () => {
                try {
                    const docRef = doc(db, 'matches', matchName);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const newMatchData = docSnap.data();
                        setMatchData(newMatchData);

                        // Store matchData in localStorage ***THIS IS FOR CLIENT SIDE ONLY***)
                        if (typeof window !== 'undefined') {
                            localStorage.setItem('matchData', JSON.stringify(newMatchData));
                        }
                    } else {
                        console.error('No such document!');
                    }
                } catch (error) {
                    console.error('Error fetching match data:', error);
                }
            };

            fetchMatchData();
        }
    }, [matchName]);
    // Load matchData from localStorage
    useEffect(() => {
        if (!matchData && typeof window !== 'undefined') {
            const storedMatchData = localStorage.getItem('matchData');
            if (storedMatchData) {
                setMatchData(JSON.parse(storedMatchData));
            }
        }
    }, [matchData]);


    const handleJumpToTime = (time) => {
        if (videoObject && videoObject.seekTo) {
            videoObject.seekTo(time / 1000, true);
        }
    };

    const returnFilteredPoints = () => {
        if (!matchData) return [];

        let filteredPoints = matchData.points;
        const filterMap = new Map(filterList);

        filteredPoints = filteredPoints.filter(point =>
            Array.from(filterMap).every(([key, value]) =>
                value.includes(point[key])
            )
        );

        return filteredPoints;
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>{matchData ? matchData.name : 'Match Viewer'}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <div className="searchDropdown">
                    <SearchDropdown setMatchData={setMatchData} />
                </div>

                {matchData && (
                    <>
                        <Toolbar setMatchData={setMatchData} />
                        <h2>{matchData.name}</h2>
                        <div className={styles.mainContent}>
                            <div className="videoPlayer">
                                <VideoPlayer videoId={matchData.videoId} setVideoObject={setVideoObject} />
                            </div>
                            <div className="filterList">
                                <FilterList pointsData={matchData.points} filterList={filterList} setFilterList={setFilterList} />
                            </div>
                            <div className="pointsList">
                                <PointsList pointsData={returnFilteredPoints()} onPointSelect={handleJumpToTime} />
                            </div>
                        </div>
                        {matchData.pdfUrl && <iframe className={styles.pdfView} src={matchData.pdfUrl} width="90%" height="1550" />}
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
          width: 100%;
          justify-content: center;
          align-items: flex-start;
        }

        .videoPlayer {
          flex: 2;
          padding: 1rem;
        }

        .pointsList {
          flex: 1;
          margin-top: 1rem;
          padding: 1rem;
          border: 1px solid #ddd;
          border-radius: 5px;
          overflow-y: auto;
          height: 400px;
        }

        .filterList {
          flex: 1;
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
        .searchDropdown {
            margin-bottom: 1rem;
            width: 80%; /* Adjust the width to 80% */
            display: flex; /* Add flex display to center the SearchDropdown */
            justify-content: center;
        }
        
        .searchDropdown .Select {
            width: 100%; /* Set the width of the Select component to 100% */
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
