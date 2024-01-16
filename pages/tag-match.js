import React, { useState, useRef, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import VideoPlayer from '../components/VideoPlayer';

export default function TagMatch() {
    const [videoObject, setVideoObject] = useState(null);
    const [videoId, setVideoId] = useState('');
    const [timeList, setTimeList] = useState([])
    // currently impossible to determine exact YouTube FPS: 24-60 FPS
    const FPS = 30;
    
    const handleVideoIdChange = (event) => {
        setVideoId(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (!videoObject) {
            return;
        }
        /* Space: Play/Pause */
        if (event.key === " ") {
            let playing = videoObject.getPlayerState() === 1;
            if (playing) {
                videoObject.pauseVideo();
            }
            else {
                videoObject.playVideo();
            }
        }
        /* D: Records millisecond position in column of pointStartTime, rounded to the nearest ms */ 
        else if (event.key === "d") {
            const newTimestamp = Math.round(videoObject.getCurrentTime() * 1000);
            if (timeList.some(pair => pair[1] === 0)) return;

            setTimeList(timeList => [
                ...timeList, [newTimestamp, 0]
            ].sort((pair1, pair2) => pair1[0] - pair2[0]))
        }
        /* F: Records millisecond position in column of pointEndTime, rounded to the nearest ms */ 
        else if (event.key === "f") {
            const newTimestamp = Math.round(videoObject.getCurrentTime() * 1000);
            const updated = timeList.map((pair) => {
                // find corresponding d
                if (pair[1] === 0) {
                  return [pair[0], newTimestamp];
                }
                // shouldn't happen because f should always be after d
                return pair;
            })
            setTimeList(updated)
        }
        /* R: Fast forward a level (1,2,4,8,16) */
        else if (event.key === "r") {
            let playbackRate = videoObject.getPlaybackRate();
            console.log(playbackRate);
            if (playbackRate < 16) {
                videoObject.setPlaybackRate(playbackRate * 2);
            }
            // TODO: ADJUST FOR FRAME WITH YT API
            // videoObject.seekTo(currentTime + 1/FPS, true);
        }
        /* E: Backtrack one level (1,2,4,8,16) */
        else if (event.key === "e") {
            let playbackRate = videoObject.getPlaybackRate();
            if (playbackRate > 2) {
                videoObject.setPlaybackRate(playbackRate / 2);
            }
            // TODO: ADJUST FOR FRAME WITH YT API
            // videoObject.seekTo(currentTime - 1/FPS, true);
        }
        /* W: jump forward 5 seconds */
        else if (event.key === "w") {
            let currentTime = videoObject.getCurrentTime();
            videoObject.seekTo(currentTime + 5, true);
        }
        /* Q: jump back 5 seconds */
        else if (event.key === "q") {
            let currentTime = videoObject.getCurrentTime();
            videoObject.seekTo(currentTime - 5, true);
        }
        /* S: jump forward 10 seconds */
        else if (event.key === "s") {
            let currentTime = videoObject.getCurrentTime();
            videoObject.seekTo(currentTime + 10, true);
        }
        /* A: jump back 10 second */
        else if (event.key === "a") {
            let currentTime = videoObject.getCurrentTime();
            videoObject.seekTo(currentTime - 10, true);
        }
        /* 2: speed=2 */
        else if (event.key === "2") {
            videoObject.setPlaybackRate(2);
        }
        /* 1: speed=1 */
        else if (event.key === "1") {
            videoObject.setPlaybackRate(1);
        }
    }

    const handleStartTimeChange = (index, value) => {
        const updatedTimeList = [...timeList];
        updatedTimeList[index] = [value, updatedTimeList[index][1]];
        setTimeList(updatedTimeList);
    };

    const handleEndTimeChange = (index, value) => {
        const updatedTimeList = [...timeList];
        updatedTimeList[index] = [updatedTimeList[index][0], value];
        setTimeList(updatedTimeList);
    };

    const handleTimeBlur = () => {
        setTimeList(prevList => [...prevList].filter(elem => elem !== "").sort((a, b) => a - b));
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
                                    // onBlur={handleTimeBlur}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={pair[1]}
                                    onChange={(event) => handleEndTimeChange(index, event.target.value)}
                                    // onBlur={handleTimeBlur}
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
