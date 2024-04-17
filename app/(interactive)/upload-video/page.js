'use client'

import React, { useState } from 'react';
import uploadMatch from '../../services/uploadMatch.js';

import styles from '../../styles/Upload.module.css'

export default function UploadVideo() {
  const [matchName, setMatchName] = useState('');
  const [videoId, setVideoId] = useState('');
  const [jsonFile, setJsonFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  const handleMatchNameChange = (e) => {
    setMatchName(e.target.value);
  };

  const handleVideoIdChange = (e) => {
    setVideoId(e.target.value);
  };

  const handleJsonFileChange = (e) => {
    setJsonFile(e.target.files[0]);
  };

  const handlePdfFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!matchName || !videoId || !jsonFile) {
      console.error("Please fill in all fields.");
      return;
    }
    
    try {
      const pointsJson = JSON.parse(await jsonFile.text());
      await uploadMatch(matchName, videoId, pointsJson, pdfFile);
    } catch (error) {
      console.error("Error uploading match:", error);
    }
  };
    

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Upload Video</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>
          Match Name: 
          <input type="text" value={matchName} onChange={handleMatchNameChange} />
        </label>
        <label>
          Video ID: 
          <input type="text" value={videoId} onChange={handleVideoIdChange} />
        </label>
        <label>
          JSON File: 
          <input type="file" accept=".json" onChange={handleJsonFileChange} />
        </label>
        <label>
          PDF File: 
          <input type="file" accept="application/pdf" onChange={handlePdfFileChange} />
        </label>
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}
