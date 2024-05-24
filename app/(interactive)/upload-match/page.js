'use client'

import React, { useState, useEffect, useMemo } from 'react';
import { uploadMatch } from '../../services/upload.js';
import getTeams from '@/app/services/getTeams.js';

import styles from '../../styles/Upload.module.css'

const parseMatchScore = (matchScore) => {
  const sets = matchScore.split(" ");
  const transformedSets = [];
  
  sets.forEach(set => {
      const games = set.split("-");
      const clientGamesWon = parseInt(games[0]);
      const opponentGamesWon = parseInt(games[1]);
      let clientTiebreakPointsWon = null;
      let opponentTiebreakPointsWon = null;
      
      if (set.includes("(")) {
          const tiebreak = set.match(/\(([^)]+)\)/)[1].split("-");
          clientTiebreakPointsWon = parseInt(tiebreak[0]);
          opponentTiebreakPointsWon = parseInt(tiebreak[1]);
      }
      
      transformedSets.push({
          set_number: transformedSets.length + 1,
          clientGamesWon: clientGamesWon,
          opponentGamesWon: opponentGamesWon,
          clientTiebreakPointsWon: clientTiebreakPointsWon,
          opponentTiebreakPointsWon: opponentTiebreakPointsWon
      });
  });
  
  return transformedSets;
} 

export default function UploadVideo() {
  const [matchScore, setMatchScore] = useState('');
  const [videoId, setVideoId] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [clientTeam, setClientTeam] = useState();
  const [clientPlayerFirst, setClientPlayerFirst] = useState('');
  const [clientPlayerLast, setClientPlayerLast] = useState('');
  const [clientUTR, setClientUTR] = useState(null);
  const [opponentTeam, setOpponentTeam] = useState();
  const [opponentPlayerFirst, setOpponentPlayerFirst] = useState('');
  const [opponentPlayerLast, setOpponentPlayerLast] = useState('');
  const [opponentUTR, setOpponentUTR] = useState(null);
  const [teams, setTeams] = useState([]);
  const [matchDate, setMatchDate] = useState('');
  const [division, setDivision] = useState('');
  const [event, setEvent] = useState('');
  const [lineup, setLineup] = useState('');
  const [matchVenue, setMatchVenue] = useState('');
  const [round, setRound] = useState('');
  const [indoor, setIndoor] = useState(false);
  const [surface, setSurface] = useState('hard');
  const [singles, setSingles] = useState(true);
  const [temperature, setTemperature] = useState(null);
  const [cloudy, setCloudy] = useState(false);
  const [windy, setWindy] = useState(false);

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
    
    if (!matchScore || !videoId || !clientTeam || !opponentTeam || !clientPlayerFirst || !clientPlayerLast || !opponentPlayerFirst || !opponentPlayerLast || !matchDate || !clientUTR || !opponentUTR || !temperature || !division || !event || !lineup || !matchVenue || !round || !indoor || !surface ) {
      // console.error(`Please fill in the following fields: ${missingFields.join(', ')}.`);
      console.error('missing fields')
      return;
    }
    
    try {
      const pointsJson = jsonFile? JSON.parse(await jsonFile.text()) : [];
      console.log(pointsJson)
      if (pointsJson.length === 0) {
        const result = confirm("You're currently uploading an UNTAGGED match. Proceed?");
        if (!result) throw new Error("Upload cancelled by user.");
      }
      const teams = {
        clientTeam,
        opponentTeam
      };
      const players = {
        client: {
          firstName: clientPlayerFirst,
          lastName: clientPlayerLast,
          UTR: clientUTR
        },
        opponent: {
          firstName: opponentPlayerFirst,
          lastName: opponentPlayerLast,
          UTR: opponentUTR
        }
      };
      const weather = {
        temperature,
        cloudy,
        windy
      }
      const matchDetails = {
        weather, 
        division,
        event,
        lineup,
        matchVenue,
        round,
        indoor,
        surface
      }
      const sets = parseMatchScore(matchScore);
      await uploadMatch(sets, videoId, pointsJson, pdfFile, teams, players, matchDate, singles, matchDetails);
      alert('done!')
    } catch (error) {
      console.error("Error uploading match:", error);
    }
  };

  const teamOptions = useMemo(() => {
    if (teams.length === 0) return null;
    setClientTeam(teams[0].name);
    setOpponentTeam(teams[0].name);
    return teams.map((option, index) => (
      <option key={index} value={option.name}>{option.name}</option>
    ));
  }, [teams]);
  const clientPlayerOptions = useMemo(() => {
    const team = teams.find(team => team.name === clientTeam);
    if (!team || !Object.prototype.hasOwnProperty.call(team, 'players')) return null; // Check if team or team.players doesn't exist
    setClientPlayerFirst(team.players[0].firstName);
    setClientPlayerLast(team.players[0].lastName);
    return team.players.map((player, index) => (
      <option key={index} value={[player.firstName, player.lastName]}>{player.firstName} {player.lastName}</option>
    ));
  }, [clientTeam, teams]);
  const opponentPlayerOptions = useMemo(() => {
    const team = teams.find(team => team.name === opponentTeam);
    if (!team || !Object.prototype.hasOwnProperty.call(team, 'players')) return null; // Check if team or team.players doesn't exist
    //setOpponentPlayer(team.players[0].firstName);
    setOpponentPlayerFirst(team.players[0].firstName);
    setOpponentPlayerLast(team.players[0].lastName);
    return team.players.map((player, index)  => (
      <option key={index} value={[player.firstName, player.lastName]}>{player.firstName} {player.lastName}</option>
      
    ));
  }, [opponentTeam, teams]);

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Upload Match</h1>
        <h3>Make sure you add the player in &apos;Upload Team&apos; before this!</h3>
        <form className={styles.form} onSubmit={handleSubmit}>
          <label>
            Client Team: 
            <select id="search" onChange={(e) => {setClientTeam(e.target.value)}}>
              {teamOptions}
            </select>
          </label>
          <label>
            Client Player: 
            <select id="search" onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(',');
              setClientPlayerFirst(firstName);
              setClientPlayerLast(lastName);
            }}>
              {clientPlayerOptions}
            </select>
          </label>
          <label>Client UTR:
            <input type="text" value={clientUTR} onChange={(e) => setClientUTR(e.target.value)} />
          </label>
          
          <label>
            Opponent Team: 
            <select id="search" onChange={(e) => setOpponentTeam(e.target.value)}>
              {teamOptions}
            </select>
          </label>
          <label>
            Opponent Player: 
            <select id="search" onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(',');
              setOpponentPlayerFirst(firstName);
              setOpponentPlayerLast(lastName);
            }}>
              {opponentPlayerOptions}
            </select>
          </label>
          <label>Opponent UTR:
            <input type="text" value={opponentUTR} onChange={(e) => setOpponentUTR(e.target.value)} />
          </label>
          <label>
            Match Score (spaces only between sets): 7-4 6-7(0-7) 7-2(13-11): 
          </label>
          <input type="text" value={matchScore} onChange={(e) => setMatchScore(e.target.value)} />
          <label htmlFor="date">Date:
            <input type="date" value={matchDate} onChange={(e) => {setMatchDate(e.target.value)}} />
          </label>
          <label>Division:
            <input type="text" value={division} onChange={(e) => setDivision(e.target.value)} />
          </label>
          <label>Event:
            <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} />
          </label>
          <label>Lineup:
            <input type="text" value={lineup} onChange={(e) => setLineup(e.target.value)} />
          </label>
          <label>Match Venue:
            <input type="text" value={matchVenue} onChange={(e) => setMatchVenue(e.target.value)} />
          </label>
          <label>Round:
            <input type="text" value={round} onChange={(e) => setRound(e.target.value)} />
          </label>
          <label>
            Video ID: 
            <input type="text" value={videoId} onChange={(e) => setVideoId(e.target.value)} />
          </label>
          <label>Temperature:
            <input type="text" value={temperature} onChange={(e) => setTemperature(e.target.value)} />
          </label>
          <label> Weather: 
            <input type="checkbox" checked={cloudy} onChange={() => {setCloudy(!cloudy)}} /> Cloudy
            <input type="checkbox" checked={windy} onChange={() => {setWindy(!windy)}} /> Windy
          </label>
          <label> Court: 
            <input type="radio" checked={!indoor} onChange={() => {setIndoor(false)}} /> Outdoor
            <input type="radio" checked={indoor} onChange={() => {setIndoor(true)}} /> Indoor
          </label>
          <label> Surface: 
            <input type="radio" checked={surface === 'hard'} onChange={() => {setSurface('hard')}} /> Hard
            <input type="radio" checked={surface === 'clay'} onChange={() => {setSurface('clay')}} /> Clay
            <input type="radio" checked={surface === 'grass'} onChange={() => {setSurface('grass')}} /> Grass
          </label>
          <label> Singles/Doubles
            <input type="radio" checked={singles} onChange={() => {setSingles(true)}} /> Singles
            <input type="radio" checked={!singles} onChange={() => {setSingles(false)}} /> Doubles
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
