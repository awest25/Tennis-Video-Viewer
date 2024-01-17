import React, { useState } from 'react';
import uploadMatch from '../services/uploadMatch.js';

export default function UploadVideo() {
    const [matchName, setMatchName] = useState('');
    const [videoId, setVideoId] = useState('');
    const [jsonFile, setJsonFile] = useState(null);
    const [pdfFile, setPdfFile] = useState(null); // New state for PDF file

    const handleMatchNameChange = (e) => {
        setMatchName(e.target.value);
    };

    const handleVideoIdChange = (e) => {
        setVideoId(e.target.value);
    };

    const handleJsonFileChange = (e) => {
        setJsonFile(e.target.files[0]);
    };

    const handlePdfFileChange = (e) => { // New handler for PDF file
        setPdfFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!matchName || !videoId || !jsonFile || !pdfFile) {
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
        <div>
            <button onClick={() => history.back()}>Home</button> {/* Home Button */}
            <h1>Upload Video</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Match Name:
                    <input type="text" value={matchName} onChange={handleMatchNameChange} />
                </label>
                <br />
                <label>
                    Video ID:
                    <input type="text" value={videoId} onChange={handleVideoIdChange} />
                </label>
                <br />
                <label>
                    JSON File:
                    <input type="file" accept=".json" onChange={handleJsonFileChange} />
                </label>
                <br />
                <label>
                    PDF File:
                    <input type="file" accept="application/pdf" onChange={handlePdfFileChange} />
                </label>
                <br />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
