import React, { useState, useRef, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import VideoPlayer from '../components/VideoPlayer';

export default function TagMatch() {
    const [videoObject, setVideoObject] = useState(null);
    const [videoId, setVideoId] = useState('');
    const [rowList, setRowList] = useState([])

    // currently impossible to determine exact YouTube FPS: 24-60 FPS
    const FRAMERATE = 30;
    
    const handleVideoIdChange = (event) => {
        setVideoId(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (!videoObject) {
            return;
        }

        const keyActions = {
            " ": () => {
                const playing = videoObject.getPlayerState() === 1;
                playing ? videoObject.pauseVideo() : videoObject.playVideo();
            },
            "d": () => {
                const newTimestamp = Math.round(videoObject.getCurrentTime() * 1000);
                if (!rowList.some(row => row['pointEndTime'] === 0)) {
                    setRowList(timeList => [...timeList, { pointStartTime: newTimestamp, pointEndTime: 0 }]); // TODO: Sort automatically
                }
            },
            "f": () => {
                const newTimestamp = Math.round(videoObject.getCurrentTime() * 1000);
                setRowList(timeList => timeList.map(row => 
                    row.pointEndTime === 0 ? { ...row, pointEndTime: newTimestamp } : row));
            },            
            "r": () => videoObject.seekTo(videoObject.getCurrentTime() + 1/FRAMERATE, true),
            "e": () => videoObject.seekTo(videoObject.getCurrentTime() - 1/FRAMERATE, true),
            "w": () => videoObject.seekTo(videoObject.getCurrentTime() + 5, true),
            "q": () => videoObject.seekTo(videoObject.getCurrentTime() - 5, true),
            "s": () => videoObject.seekTo(videoObject.getCurrentTime() + 10, true),
            "a": () => videoObject.seekTo(videoObject.getCurrentTime() - 10, true),
            "2": () => videoObject.setPlaybackRate(2),
            "1": () => videoObject.setPlaybackRate(1),
        };

        const action = keyActions[event.key];
        if (action) action();
    };

    const handleStartTimeChange = (index, value) => {
        const updatedRowList = rowList.map((item, idx) => 
            idx === index ? { ...item, start: parseInt(value) } : item
        );
        setRowList(updatedRowList);
    };
    
    const handleEndTimeChange = (index, value) => {
        const updatedRowList = rowList.map((item, idx) => 
            idx === index ? { ...item, end: parseInt(value) } : item
        );
        setRowList(updatedRowList);
    };

    const convertToCSV = (data) => {
        const headers = Object.keys(data[0]);
        const rows = data.map(obj => 
            headers.map(fieldName => JSON.stringify(obj[fieldName])).join(',')
        );
        return [headers.join(','), ...rows].join('\n');
    };

    const handleCopy = () => {
        const csvData = convertToCSV(timeList);
        navigator.clipboard.writeText(csvData);
    };    
    
    
    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [videoObject, rowList])

    let buttonData = {
        Page1: [['0-0', () => {},],
                ['15-0', () => {},],],
    }

    return (
        <div>
            <Toolbar setMatchData={null}/>
            {/* temporary means to select video (should it be a form?) */}
            <label>Input YouTube Code: </label>
            <input type="text" value={videoId} onChange={handleVideoIdChange} />

            <VideoPlayer videoId={videoId} setVideoObject={setVideoObject} />

            <button onClick={handleCopy}>Copy Columns</button>

            <div>
                {buttonData['Page1'].map(([label, action], index) => {
                    return (
                        <button key={index} onClick={action}>{label}</button>
                    );
                })}
            </div>

            { /* CSV Table */}
            <table>
            <tbody>
                    {rowList.map((row, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                <input
                                    type="text"
                                    value={row.pointStartTime}
                                    onChange={(event) => handleStartTimeChange(index, event.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.pointEndTime}
                                    onChange={(event) => handleEndTimeChange(index, event.target.value)}
                                />
                            </td>
                            {/* Add additional cells here as needed for more columns */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
