import React, { useState, useRef, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import VideoPlayer from '../components/VideoPlayer';

export default function TagMatch() {
    const [videoObject, setVideoObject] = useState(null);
    const [videoId, setVideoId] = useState('');
    const [timeList, setTimeList] = useState([]);
    const [timerValue, setTimerValue] = useState(0);
// issue with the timer: When no video code, gives a value error. Fix this
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
                if (!timeList.some(pair => pair[1] === 0)) {
                    setTimeList(timeList => [...timeList, [newTimestamp, 0]]
                        .sort((pair1, pair2) => pair1[0] - pair2[0]));
                }
            },
            "f": () => {
                const newTimestamp = Math.round(videoObject.getCurrentTime());
                setTimeList(timeList => timeList.map(pair => 
                    pair[1] === 0 ? [pair[0], newTimestamp] : pair));
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
        const updatedTimeList = [...timeList];
        updatedTimeList[index] = [parseInt(value), updatedTimeList[index][1]];
        setTimeList(updatedTimeList);
    };


    const handleEndTimeChange = (index, value) => {
        const updatedTimeList = [...timeList];
        updatedTimeList[index] = [updatedTimeList[index][0], parseInt(value)];
        setTimeList(updatedTimeList);
    };


    const handleMinutesSecondsChange = (minutes, seconds) => {
        const newTime = (minutes * 60) + seconds;
        videoObject.seekTo(newTime, true);
    };

    const updateTimer = () => {
        if (videoObject && typeof videoObject.getCurrentTime === 'function') {
            const currentTime = Math.round(videoObject.getCurrentTime() * 1000);
            setTimerValue(currentTime);
        }
    };

    const handleMillisecondsChange = (value) => {
        const milliseconds = parseInt(value);
        videoObject.seekTo(milliseconds / 1000, true); 
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        const timerInterval = setInterval(updateTimer, 100);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            clearInterval(timerInterval);
        };
    }, [videoObject, timeList]);
    return (
        <div style={{ marginTop: '100px' }}>
            <Toolbar setMatchData={null} />
    
            <label>Enter YouTube Code: </label>
            <input type="text" value={videoId} onChange={handleVideoIdChange} />
    
            <VideoPlayer videoId={videoId} setVideoObject={setVideoObject} />
            <button onClick={() => {
                const columns = timeList.map(pair => pair.join('\t')).join('\n');
                navigator.clipboard.writeText(columns);
            }}>
                Copy Columns
            </button>
    
            {/* CSV Table */}
            <table>
                <tbody>
                    {timeList.map((pair, index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="number" 
                                    value={pair[0]}
                                    onChange={(event) => handleStartTimeChange(index, event.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="number" 
                                    value={pair[1]}
                                    onChange={(event) => handleEndTimeChange(index, event.target.value)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
    
            <div>
                <p>Current Time: {timerValue}ms</p>
                <p>Jump to time in milliseconds:</p>
                <div>
                    <div style={{ display: 'flex' }}>
                        <input
                            type="number" 
                            placeholder="Milliseconds"
                            value={timerValue}
                            onChange={(event) => handleMillisecondsChange(event.target.value)}
                            style={{ marginRight: '10px' }}
                        />
                        <span>ms</span>
                    </div>
                    <p>Or enter time in minutes and seconds:</p>
                    <div>
                        <input
                            type="number" 
                            placeholder="Minutes"
                            value={Math.floor(timerValue / 60000)}
                            onChange={(event) => {
                                const minutes = parseFloat(event.target.value);
                                const seconds = timerValue % 60000 / 1000;
                                handleMinutesSecondsChange(minutes, seconds);
                            }}
                            style={{ marginRight: '10px' }}
                        />
                        <span>mins. </span>
                        <input
                            type="number"
                            placeholder="Seconds"
                            value={Math.round((timerValue % 60000) / 1000)}
                            onChange={(event) => {
                                const seconds = parseFloat(event.target.value);
                                const minutes = Math.floor(timerValue / 60000);
                                handleMinutesSecondsChange(minutes, seconds);
                            }}
                        />
                        <span> secs. </span>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
    
}