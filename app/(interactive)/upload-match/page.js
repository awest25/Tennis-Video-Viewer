'use client';

import React, { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { uploadMatch } from '../../services/upload.js';
import getTeams from '@/app/services/getTeams.js';
import styles from '../../styles/Upload.module.css';

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

const initialSchema = {
  title: "Upload Match",
  type: "object",
  properties: {
    clientTeam: {
      type: "string",
      title: "Client Team",
      enum: []
    },
    clientPlayer: {
      type: "string",
      title: "Client Player",
      enum: []
    },
    clientUTR: {
      type: "string",
      title: "Client UTR"
    },
    opponentTeam: {
      type: "string",
      title: "Opponent Team",
      enum: []
    },
    opponentPlayer: {
      type: "string",
      title: "Opponent Player",
      enum: []
    },
    opponentUTR: {
      type: "string",
      title: "Opponent UTR"
    },
    date: {
      type: "string",
      title: "Date",
      format: "date"
    },
    matchScore: {
      type: "object",
      title: "Match Score",
      properties: {
        set1: {
          type: "object",
          title: "Set 1",
          properties: {
            clientGames: { type: "number", title: "Client Games" },
            opponentGames: { type: "number", title: "Opponent Games" },
            clientTiebreak: { type: "number", title: "Client Tiebreak (if applicable)" },
            opponentTiebreak: { type: "number", title: "Opponent Tiebreak (if applicable)" }
          }
        },
        set2: {
          type: "object",
          title: "Set 2",
          properties: {
            clientGames: { type: "number", title: "Client Games" },
            opponentGames: { type: "number", title: "Opponent Games" },
            clientTiebreak: { type: "number", title: "Client Tiebreak (if applicable)" },
            opponentTiebreak: { type: "number", title: "Opponent Tiebreak (if applicable)" }
          }
        },
        set3: {
          type: "object",
          title: "Set 3 (if applicable)",
          properties: {
            clientGames: { type: "number", title: "Client Games" },
            opponentGames: { type: "number", title: "Opponent Games" },
            clientTiebreak: { type: "number", title: "Client Tiebreak (if applicable)" },
            opponentTiebreak: { type: "number", title: "Opponent Tiebreak (if applicable)" }
          }
        }
      }
    },
    division: {
      type: "string",
      title: "Division",
      enum: ["D1"]
    },
    event: {
      type: "string",
      title: "Event"
    },
    lineup: {
      type: "string",
      title: "Lineup"
    },
    matchVenue: {
      type: "string",
      title: "Match Venue"
    },
    round: {
      type: "string",
      title: "Round"
    },
    videoID: {
      type: "string",
      title: "Video ID"
    },
    temperature: {
      type: "string",
      title: "Temperature"
    },
    weather: {
      type: "string",
      title: "Weather",
      enum: ["Cloudy", "Windy"]
    },
    court: {
      type: "string",
      title: "Court",
      enum: ["Outdoor", "Indoor"]
    },
    surface: {
      type: "string",
      title: "Surface",
      enum: ["Hard", "Clay", "Grass"]
    },
    singlesDoubles: {
      type: "string",
      title: "Singles/Doubles",
      enum: ["Singles", "Doubles"]
    },
    jsonFile: {
      type: "string",
      title: "JSON File",
      format: "data-url"
    },
    pdfFile: {
      type: "string",
      title: "PDF File",
      format: "data-url"
    }
  },
  required: ["clientTeam", "clientPlayer", "opponentTeam", "matchScore", "date"]
};

const uiSchema = {
  jsonFile: {
    "ui:widget": "file"
  },
  pdfFile: {
    "ui:widget": "file"
  },
  matchScore: {
    set1: {
      clientTiebreak: {
        "ui:widget": "updown"
      },
      opponentTiebreak: {
        "ui:widget": "updown"
      }
    },
    set2: {
      clientTiebreak: {
        "ui:widget": "updown"
      },
      opponentTiebreak: {
        "ui:widget": "updown"
      }
    },
    set3: {
      clientTiebreak: {
        "ui:widget": "updown"
      },
      opponentTiebreak: {
        "ui:widget": "updown"
      }
    }
  }
};

export { initialSchema, uiSchema };

export default function UploadMatchForm() {
  const [schema, setSchema] = useState(initialSchema);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const allTeams = await getTeams();
        setTeams(allTeams);
        const teamNames = allTeams.map(team => team.name);
        // TODO: warning this methood of deep copy is lossy if the schema is more complex
        setSchema(prevSchema => ({
          ...prevSchema,
          properties: {
            ...prevSchema.properties,
            clientTeam: {
              ...prevSchema.properties.clientTeam,
              enum: teamNames
            },
            opponentTeam: {
              ...prevSchema.properties.opponentTeam,
              enum: teamNames
            }
          }
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTeams();    
  }, []);

  const handleChange = ({ formData }) => {
    let clientPlayers = [];
    let opponentPlayers = [];

    if (formData.clientTeam) {
      const selectedClientTeam = teams.find(team => team.name === formData.clientTeam);
      if (selectedClientTeam) {
        clientPlayers = selectedClientTeam.players?.map(player => `${player.firstName} ${player.lastName}`);
      }
    }

    if (formData.opponentTeam) {
      const selectedOpponentTeam = teams.find(team => team.name === formData.opponentTeam);
      if (selectedOpponentTeam) {
        opponentPlayers = selectedOpponentTeam.players?.map(player => `${player.firstName} ${player.lastName}`);
      }
    }

    setSchema(prevSchema => ({
      ...prevSchema,
      properties: {
        ...prevSchema.properties,
        clientPlayer: {
          ...prevSchema.properties.clientPlayer,
          enum: clientPlayers
        },
        opponentPlayer: {
          ...prevSchema.properties.opponentPlayer,
          enum: opponentPlayers
        }
      }
    }));
  };

  const handleSubmit = async ({ formData }) => {
    try {
      const pointsJson = formData.jsonFile ? JSON.parse(atob(formData.jsonFile.split(',')[1])) : [];
      if (pointsJson.length === 0) {
        const result = confirm("You're currently uploading an UNTAGGED match. Proceed?");
        if (!result) throw new Error("Upload cancelled by user.");
      }
      const teams = {
        clientTeam: formData.clientTeam,
        opponentTeam: formData.opponentTeam
      };
      const players = {
        client: {
          firstName: formData.clientPlayer.split(' ')[0],
          lastName: formData.clientPlayer.split(' ')[1],
          UTR: formData.clientUTR
        },
        opponent: {
          firstName: formData.opponentPlayer.split(' ')[0],
          lastName: formData.opponentPlayer.split(' ')[1],
          UTR: formData.opponentUTR
        }
      };
      const weather = {
        temperature: formData.temperature,
        cloudy: formData.weather.includes('Cloudy'),
        windy: formData.weather.includes('Windy')
      }
      const matchDetails = {
        weather, 
        division: formData.division,
        event: formData.event,
        lineup: formData.lineup,
        matchVenue: formData.matchVenue,
        round: formData.round,
        indoor: formData.court === 'Indoor',
        surface: formData.surface
      }
      const sets = parseMatchScore(formData.matchScore);
      await uploadMatch(sets, formData.videoID, pointsJson, formData.pdfFile, teams, players, formData.date, formData.singlesDoubles === 'Singles', matchDetails);
      alert('done!')
    } catch (error) {
      console.error("Error uploading match:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Upload Match</h1>
        <h3>Make sure you add the player in &apos;Upload Team&apos; before this!</h3>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          onChange={handleChange}
          onSubmit={handleSubmit}
          validator={validator}
        />
      </div>
    </div>
  );
}
