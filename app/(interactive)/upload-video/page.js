'use client'

import React, { useState, useEffect, useMemo } from 'react';
import uploadMatch from '../../services/upload.js';
import getTeams from '@/app/services/getTeams.js';

import styles from '../../styles/Upload.module.css'

export default function UploadVideo() {
  const [matchName, setMatchName] = useState('');
  const [videoId, setVideoId] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [clientTeam, setClientTeam] = useState('arizona_state');
  const [opponentTeam, setOpponentTeam] = useState('arizona_state');
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const allTeams = await getTeams();
        setTeams(allTeams);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!matchName || !videoId || !jsonFile || !clientTeam || !opponentTeam) {
      console.error("Please fill in all fields.");
      return;
    }
    
    try {
      const pointsJson = JSON.parse(await jsonFile.text());
      await uploadMatch(matchName, videoId, pointsJson, pdfFile, clientTeam, opponentTeam);
      alert('done!')
    } catch (error) {
      console.error("Error uploading match:", error);
    }
  };

  const teamOptions = useMemo(() => {
    return teams.map((option, index) => (
      <option key={index} value={option.name}>{option.name}</option>
    ));
  }, [teams]);

  return (
    <div className={styles.container}>
      <div>
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
            <select id="search" onChange={(e) => setClientTeam(e.target.value)}>
              {teamOptions}
            </select>
          </label>
          <label>
            Opponent Team: 
            <select id="search" onChange={(e) => setOpponentTeam(e.target.value)}>
              {teamOptions}
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
    </div>
  );
}
