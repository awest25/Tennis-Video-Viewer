'use client'

import React, { useState, useEffect, useMemo } from 'react';
import uploadMatch from '../../services/uploadMatch.js';
import getLogos from '@/app/services/getLogos.js';

import styles from '../../styles/Upload.module.css'

export default function UploadVideo() {
  const [matchName, setMatchName] = useState('');
  const [videoId, setVideoId] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [clientLogo, setClientLogo] = useState('a&m');
  const [opponentLogo, setOpponentLogo] = useState('a&m');
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const logos = await getLogos();
        setLogos(logos);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchLogos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(clientLogo)
    console.log(opponentLogo)
    
    if (!matchName || !videoId || !jsonFile || !clientLogo || !opponentLogo) {
      console.error("Please fill in all fields.");
      return;
    }
    
    try {
      const pointsJson = JSON.parse(await jsonFile.text());
      const clientLogoURL = logos.find((logo) => logo.name === clientLogo).downloadURL;
      const opponentLogoURL = logos.find((logo) => logo.name === opponentLogo).downloadURL;
      await uploadMatch(matchName, videoId, pointsJson, pdfFile, clientLogoURL, opponentLogoURL);
      alert('done!')
    } catch (error) {
      console.error("Error uploading match:", error);
    }
  };

  const logosOptions = useMemo(() => {
    return logos.map((option, index) => (
      <option key={index} value={option.name}>{option.name}</option>
    ));
  }, [logos]);

  console.log(logos)

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Video</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Match Name: 
          <input type="text" value={matchName} onChange={(e) => setMatchName(e.target.value)} />
        </label>
        <label>
          Video ID: 
          <input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)} />
        </label>
        <label>
          Client Team: 
          <select id="search" onChange={(e) => setClientLogo(e.target.value)}>
            {logosOptions}
          </select>
        </label>
        <label>
          Opponent Team: 
          <select id="search" onChange={(e) => setOpponentLogo(e.target.value)}>
            {logosOptions}
          </select>
        </label>
        <label>
          JSON File: 
          <input type="file" accept=".json" onChange={(e) => setJsonFile(e.target.files[0])} />
        </label>
        <label>
          PDF File: 
          <input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
