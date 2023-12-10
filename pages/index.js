import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import React, { useState, useRef } from 'react';

import SearchDropdown from '../components/SearchDropdown';
import VideoPlayer from '../components/VideoPlayer';
import PointsList from '../components/PointsList';

import samplePointsData from '/public/data/dummy_point_info.json';

export default function Home() {

  // The currentTime state variable isn't strictly nessessary (along with handeTimeUpdate) but it's useful for debugging
  const [currentTime, setCurrentTime] = useState(0);
  const videoRef = useRef(null);

  const [pointsData, setPointsData] = useState(samplePointsData);


  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime * 1000); // seconds --> milliseconds
  };

  const handleJumpToTime = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time / 1000; // milliseconds --> seconds
      videoRef.current.play(); // plays the video after jumping
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
          <SearchDropdown setPointsData={setPointsData} />
        </div>

        {/* Main Content Area */}
        <div className={styles.mainContent}>
          {/* Video Player */}
          <div className="videoPlayer">
            <VideoPlayer videoURL={'/data/dummy_video.mp4'} videoRef={videoRef} handleTimeUpdate={handleTimeUpdate} />
          </div>

          {/* Points List */}
          <div className="pointsList">
            <PointsList pointsData={pointsData} onPointSelect={handleJumpToTime}/>
          </div>
        </div>

        <p>Current Time: {(currentTime/1000).toFixed(2)} seconds</p>

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
