'use client'

import React, { useState, useEffect, useMemo } from 'react';
import uploadTeam from '../../services/upload.js';
import getTeams from '@/app/services/getTeams.js';

import styles from '../../styles/Upload.module.css'

export default function UploadVideo() {
  const [teamName, setTeamName] = useState('');
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

  const handleSubmit = async (e) => {
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
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Team Name (M/W): 
            <input type="text" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
          </label>
          <label>
            Logo File (png or jpg): 
            <input type="file" accept="image/png, image/jpeg" onChange={(e) => setLogoFile(e.target.files[0])} />
          </label>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
