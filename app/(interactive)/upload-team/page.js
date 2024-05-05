'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { uploadTeam, uploadPlayer } from '../../services/upload.js';
import getTeams from '@/app/services/getTeams.js';

import styles from '../../styles/Upload.module.css'

export default function UploadVideo() {
  const [teamName, setTeamName] = useState('');
  const [teamSelect, setTeamSelect] = useState('Arizona (M)')
  const [playerName, setPlayerName] = useState('');
  const [playerFirstName, setPlayerFirstName] = useState('');
  const [playerLastName, setPlayerLastName] = useState('');
  const [playerPhoto, setPlayerPhoto] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [teams, setTeams] = useState([]);
  // prevents re-rendering of teams on other state change (useful when teams is expensive)
  // const memoizedTeams = useMemo(() => teams, [teams]);

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

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    
    if (!teamName || !logoFile) {
      console.error("Please fill in all fields.");
      return;
    }
    
    try {
      await uploadTeam(teamName, logoFile)
      alert('done!')
    } catch (error) {
      console.error("Error uploading match:", error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    
    if (!playerFirstName || !playerLastName || !teamSelect) {
      console.error("Please fill in Player Name.");
      return;
    }
    
    try {
      await uploadPlayer(playerFirstName, playerLastName, playerPhoto, teamSelect)
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
        <h1 className={styles.title}>Current Teams</h1>
        <ul>
          {teams.map((team, index) => (
            <li key={index} value={team.name}>{team.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <h1 className={styles.title}>Add Team</h1>
        <form className={styles.form} onSubmit={handleUploadSubmit}>
          <label>
            Team Name: 
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          </label>
          <label>
            Logo File (png or jpg): 
            <input type="file" accept="image/png, image/jpeg" onChange={(e) => setLogoFile(e.target.files[0])} />
          </label>
          <button type="submit">Upload</button>
        </form>
      </div>
      <div>
        <h1 className={styles.title}>Add Player</h1>
        <h3>See added players by selecting the team in 'Upload Match'</h3>
        <form className={styles.form} onSubmit={handleAddSubmit}>
          <label>
            Fist Name: 
            <input type="text" value={playerFirstName} onChange={(e) => setPlayerFirstName(e.target.value)} />
          </label>
          <label>
            Last Name: 
            <input type="text" value={playerLastName} onChange={(e) => setPlayerLastName(e.target.value)} />
          </label>
          <label>
            Team: 
            <select id="search" onChange={(e) => setTeamSelect(e.target.value)}>
              {teamOptions}
            </select>
          </label>
          <label>
            Player Photo (webp, svg, png, jpg):
            <input type="file" accept="image/webp, image/svg+xml, image/png, image/jpeg" onChange={(e) => setPlayerPhoto(e.target.files[0])} />
          </label>
          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
}
