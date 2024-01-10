import React, { useState, useRef, useEffect } from 'react';
import VideoPlayer from '../components/VideoPlayer';

export default function TagMatch() {
    const [videoObject, setVideoObject] = useState(null);
    const [videoId, setVideoId] = useState('');
    const [startTimeList, setStartTimeList] = useState([]);
    const [endTimeList, setEndTimeList] = useState([]);
    
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
        /* R: Fast forward a level (1, 2,4,8,16) */
        else if (event.key === "r") {
            let playbackRate = videoObject.getPlaybackRate();
            console.log(playbackRate);
            if (playbackRate < 16) {
                videoObject.setPlaybackRate(playbackRate * 2);
            }
        }
        /* E: speed=1 and jump back 1 second */
        else if (event.key === "e") {
            videoObject.setPlaybackRate(1);
            let currentTime = videoObject.getCurrentTime();
            videoObject.seekTo(currentTime - 1, true);
        }
        /* D: Records millisecond position in column of pointStartTime, rounded to the nearest ms */ 
        else if (event.key === "d") {
            const newTimestamp = Math.round(videoObject.getCurrentTime() * 1000);
            setStartTimeList([...startTimeList, newTimestamp].sort((a, b) => a - b));
            console.log(startTimeList);
        }
        /* F: Records millisecond position in column of pointEndTime, rounded to the nearest ms */ 
        else if (event.key === "f") {
            const newTimestamp = Math.round(videoObject.getCurrentTime() * 1000);
            setEndTimeList([...endTimeList, newTimestamp].sort((a, b) => a - b));
            console.log(endTimeList);
        }
    }

    function combineLists(list1, list2) {
        // Determine the length of the longer list
        let maxLength = Math.max(list1.length, list2.length);
    
        // Create the new list with combined elements
        let combinedList = [];
        // For copying to clipboard
        let dataString = "";
    
        for (let i = 0; i < maxLength; i++) {
            // Access elements from both lists, use 'null' if index exceeds list length
            let elemFromList1 = i < list1.length ? list1[i] : "";
            let elemFromList2 = i < list2.length ? list2[i] : "";
    
            // Add the element pair to the combined list
            combinedList.push([elemFromList1, elemFromList2]);

            // Add the element pair to the data string for copying to clipboard
            dataString += `${elemFromList1}\t${elemFromList2}\n`; // Tab-separated values
        }
    
        return { combinedList, dataString };
    }

    const handleStartTimeChange = (index, value) => {
        const updatedStartTimeList = [...startTimeList];
        updatedStartTimeList[index] = value;
        setStartTimeList(updatedStartTimeList);
    };

    const handleEndTimeChange = (index, value) => {
        const updatedEndTimeList = [...endTimeList];
        updatedEndTimeList[index] = value;
        setEndTimeList(updatedEndTimeList);
    };

    const handleStartTimeBlur = () => {
        setStartTimeList(prevList => [...prevList].filter(elem => elem !== "").sort((a, b) => a - b));
    };
    
    const handleEndTimeBlur = () => {
        setEndTimeList(prevList => [...prevList].filter(elem => elem !== "").sort((a, b) => a - b));
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        }
    }, [videoObject, startTimeList, endTimeList])

    return (
        <div>
            {/* temporary means to select video (should it be a form?) */}
            <input type="text" value={videoId} onChange={handleVideoIdChange} />

            <VideoPlayer videoId={videoId} setVideoObject={setVideoObject} />

            <button onClick={() => navigator.clipboard.writeText(combineLists(startTimeList, endTimeList).dataString)}>Copy Columns</button>

            { /* CSV Table */ }
            <table>
                <tbody>
                    { /* TODO: this won't work if lengths are different */ }
                    {combineLists(startTimeList, endTimeList).combinedList.map(([startTime, endTime], index) => (
                        <tr key={index}>
                            <td>
                                <input
                                    type="text"
                                    value={startTime}
                                    onChange={(event) => handleStartTimeChange(index, event.target.value)}
                                    onBlur={handleStartTimeBlur}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={endTime}
                                    onChange={(event) => handleEndTimeChange(index, event.target.value)}
                                    onBlur={handleEndTimeBlur}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
