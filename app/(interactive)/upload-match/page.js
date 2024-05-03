'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { uploadMatch } from '../../services/upload.js';
import getTeams from '@/app/services/getTeams.js';

import styles from '../../styles/Upload.module.css'

export default function UploadVideo() {
  const [matchScore, setMatchScore] = useState('');
  const [videoId, setVideoId] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [clientTeam, setClientTeam] = useState('Arizona (M)');
  const [clientPlayer, setClientPlayer] = useState(null);
  const [opponentTeam, setOpponentTeam] = useState('Arizona (M)');
  const [opponentPlayer, setOpponentPlayer] = useState(null);
  const [teams, setTeams] = useState([]);
  const [matchDate, setMatchDate] = useState('')
  const [singles, setSingles] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const allTeams = await getTeams();
        setTeams(allTeams);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeams().then(() => {
      setClientTeam('Arizona (M)'); setOpponentTeam('Arizona (M)')
    });    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!matchScore || !videoId || !clientTeam || !opponentTeam || !clientPlayer || !opponentPlayer || !matchDate) {
      console.error("Please fill in all fields.");
      return;
    }
    
    try {
      const pointsJson = jsonFile? JSON.parse(await jsonFile.text()) : [];
      console.log(pointsJson)
      if (pointsJson.length === 0) {
        const result = confirm("You're currently uploading an UNTAGGED match. Proceed?");
        if (!result) throw new Error("Upload cancelled by user.");
      }
      const teams = [clientTeam, opponentTeam];
      const players = [clientPlayer, opponentPlayer];
      await uploadMatch(matchScore, videoId, pointsJson, pdfFile, teams, players, matchDate, singles);
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
  const clientPlayerOptions = useMemo(() => {
    const team = teams.find(team => team.name === clientTeam);
    if (!team || !Object.prototype.hasOwnProperty.call(team, 'players')) return null; // Check if team or team.players doesn't exist
    return team.players.map(player => (
      <option key={player} value={player}>{player}</option>
    ));
  }, [clientTeam, teams]);
  const opponentPlayerOptions = useMemo(() => {
    const team = teams.find(team => team.name === opponentTeam);
    if (!team || !Object.prototype.hasOwnProperty.call(team, 'players')) return null; // Check if team or team.players doesn't exist
    return team.players.map(player => (
      <option key={player} value={player}>{player}</option>
    ));
  }, [opponentTeam, teams]);

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Upload Match</h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Client Team: 
            <select id="search" onChange={(e) => setClientTeam(e.target.value)}>
              {teamOptions}
            </select>
          </label>
          <label>
            Client Player: 
            <select id="search" onChange={(e) => setClientPlayer(e.target.value)}>
              {clientPlayerOptions}
            </select>
          </label>
          <label>
            Opponent Team: 
            <select id="search" onChange={(e) => setOpponentTeam(e.target.value)}>
              {teamOptions}
            </select>
          </label>
          <label>
            Opponent Player: 
            <select id="search" onChange={(e) => setOpponentPlayer(e.target.value)}>
              {opponentPlayerOptions}
            </select>
          </label>
          <label>
            Match Score (spaces only between sets): 7-4 6-7(0-7) 7-2(13-11): 
          </label>
          <input type="text" value={matchScore} onChange={(e) => setMatchScore(e.target.value)} />
          <label htmlFor="date">Date:
            <input
              type="date"
              id="date"
              value={matchDate}
              onChange={(e) => {setMatchDate(e.target.value)}}
            />
          </label>
          <label>
            Video ID: 
            <input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)} />
          </label>
          <label>
            <input
              type="radio"
              checked={singles}
              onChange={() => {setSingles(true)}}
            />
            Singles
          </label>
          <label>
            <input
              type="radio"
              checked={!singles}
              onChange={() => {setSingles(false)}}
            />
            Doubles
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
