import React, { useState } from 'react';
import uploadMatch from '../services/uploadMatch.js';

export default function UploadVideo() {
    const [matchName, setMatchName] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [jsonFile, setJsonFile] = useState(null);

    const handleMatchNameChange = (e) => {
        setMatchName(e.target.value);
    };

    const handleVideoUrlChange = (e) => {
        setVideoUrl(e.target.value);
    };

    const handleJsonFileChange = (e) => {
        setJsonFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Convert JSON file to an object
        const pointsJson = JSON.parse(await jsonFile.text());
        // Call uploadMatch function
        uploadMatch(matchName, videoUrl, pointsJson);
    };

    return (
        <div>
            <h1>Upload Video</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Match Name:
                    <input type="text" value={matchName} onChange={handleMatchNameChange} />
                </label>
                <br />
                <label>
                    Video URL:
                    <input type="text" value={videoUrl} onChange={handleVideoUrlChange} />
                </label>
                <br />
                <label>
                    JSON File:
                    <input type="file" accept=".json" onChange={handleJsonFileChange} />
                </label>
                <br />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
