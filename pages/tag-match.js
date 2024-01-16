import React, { useState, useRef, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import VideoPlayer from '../components/VideoPlayer';

export default function TagMatch() {
    const [videoObject, setVideoObject] = useState(null);
    const [videoId, setVideoId] = useState('');
    const [timeList, setTimeList] = useState([])

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
                const newTimestamp = Math.round(videoObject.getCurrentTime() * 1000);
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

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [videoObject, timeList])

    return (
        <div>
            <Toolbar setMatchData={null}/>
            {/* temporary means to select video (should it be a form?) */}
            <label>Input YouTube Code: </label>
            <input type="text" value={videoId} onChange={handleVideoIdChange} />

            <VideoPlayer videoId={videoId} setVideoObject={setVideoObject} />

            <button onClick={() => navigator.clipboard.writeText('temp')}>Copy Columns</button>

            { /* CSV Table */ }
            <table>
                <tbody>
                    {timeList.map((pair, index) => {
                        return(
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={pair[0]}
                                    onChange={(event) => handleStartTimeChange(index, event.target.value)}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={pair[1]}
                                    onChange={(event) => handleEndTimeChange(index, event.target.value)}
                                />
                            </td>
                        </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
