import React, { useState, useRef, useEffect } from 'react';
import Toolbar from '../components/Toolbar';
import VideoPlayer from '../components/VideoPlayer';
import { getTaggerButtonData, columnNames } from '../services/taggerButtonData.js';
import styles from '../styles/TagMatch.module.css';

export default function TagMatch() {
    const [videoObject, setVideoObject] = useState(null);
    const [videoId, setVideoId] = useState('');
    const [table, setTable] = useState([]);
    const [currentPage, setCurrentPage] = useState('PointScore'); // TODO: the default should continue from what was filled in last
    const [taggerHistory, setTaggerHistory] = useState([]); // Array to hold the history of states

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
                // Check if it's appropriate to add a new start timestamp
                const lastPoint = table.length > 0 ? table[table.length - 1] : null;
                if (!lastPoint || lastPoint['pointEndTime'] !== '') {
                  saveToHistory();
              
                  // Create a new row with all columns, only pointStartTime has a value
                  const newRow = columnNames.reduce((acc, columnName) => {
                    acc[columnName] = columnName === 'pointStartTime' ? newTimestamp : '';
                    return acc;
                  }, {});
              
                  setTable(table => [...table, newRow]);
                } else { // If the last point doesn't have an end timestamp, overwrite the start timestamp
                    saveToHistory();
                    // Update the last row with the new pointStartTime
                    setTable(table => table.map((row, index) => 
                        index === table.length - 1 ? { ...row, pointStartTime: newTimestamp } : row
                    ));
                }
              },
            "f": () => {
                const newTimestamp = Math.round(videoObject.getCurrentTime() * 1000);
                // Check if it's appropriate to set the end timestamp for the last point
                const lastPoint = table[table.length - 1];
                if (table.length > 0 && lastPoint['pointStartTime'] !== '') {
                    saveToHistory();
                    setTable(table => table.map((row, index) => 
                        index === table.length - 1 ? { ...row, pointEndTime: newTimestamp } : row
                    ));
                }
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

    const handleChange = (rowIndex, key, value) => {
        saveToHistory();
        setTable(currentList =>
            currentList.map((row, idx) => 
                idx === rowIndex ? { ...row, [key]: value } : row
            )
        );
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
    }, [videoObject, table, currentPage]) // TODO: the buttons should be in a different component

    const updateTable = (key, value) => {
        setTable(currentList => {
            const newList = [...currentList];
            const lastIndex = newList.length - 1;
            if (lastIndex >= 0) {
                newList[lastIndex] = { ...newList[lastIndex], [key]: value };
            }
            return newList;
        });
    }

    const saveToHistory = () => {
        setTaggerHistory(taggerHistory => {
            // Add the new state to the history
            const updatedHistory = [...taggerHistory, { table: table, page: currentPage }];

            // Check if the history exceeds the maximum length
            if (updatedHistory.length > 30) {
                // Remove the oldest entry (at the beginning of the array)
                return updatedHistory.slice(-30);
            }

            return updatedHistory;
        });
    }

    const undoLastAction = () => {
        if (taggerHistory.length === 0) {
            // Nothing to undo
            return;
        }
        
        // Get the last state from the history
        const lastState = taggerHistory[taggerHistory.length - 1];
        
        // Update the current state to the last state from the history
        setTable(lastState.table);
        setCurrentPage(lastState.page);
        
        // Remove the last state from the history
        setTaggerHistory(taggerHistory.slice(0, -1));
    };

    // This pulls the button data from the taggerButtonData.js file
    const buttonData = getTaggerButtonData(updateTable, setCurrentPage);

    const handleImageClick = (event) => {
        const courtWidthInInches = 432;
        const courtHeightInInches = 936;
        
        // Get the bounding rectangle of the target (image)
        const rect = event.target.getBoundingClientRect();

        const widthOfCourt = rect.right - rect.left;
        const heightOfCourt = rect.bottom - rect.top;

        // Calculate the click position relative to the image
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Calculate the click position relative to the court
        const xInches = Math.round(( x / widthOfCourt ) * courtWidthInInches);
        const yInches = Math.round(( y / heightOfCourt ) * courtHeightInInches);
        
        console.log("xInches: " + xInches + " yInches: " + yInches);
        return { 'x': xInches, 'y': yInches };
    }


    return (
        <div>
            <Toolbar setMatchData={null}/>
            {/* temporary means to select video (should it be a form?) */}
            <label>Input YouTube Code: </label>
            <input type="text" value={videoId} onChange={handleVideoIdChange} />

            <VideoPlayer videoId={videoId} setVideoObject={setVideoObject} />

            <button onClick={handleCopy}>Copy Columns</button>
            <button onClick={undoLastAction}>Undo</button>

            <div>
                {buttonData[currentPage].map((button, index) => {
                    return button.courtImage === true ? (
                        <div>
                            <p>{button.label}</p>
                            <img 
                                src="/images/Tennis_Court_Full.png" 
                                alt="tennis court" 
                                onClick={(event) => {
                                    saveToHistory();
                                    let data = handleImageClick(event); // returns data.x and data.y coordinates
                                    data.table = table;
                                    button.action(data);
                                }} 
                                style={{width: "10%"}}
                            />
                        </div>
                    ) : (
                        <button className={styles.customButton} key={index} onClick={() => {
                            saveToHistory();
                            let data = {};
                            data.table = table;
                            button.action(data);
                        }}>
                            {button.label}
                        </button>
                    );
                })}
            </div>



            { /* CSV Table */}
            <table>
                <thead>
                    <tr>
                    {columnNames.map((columnName, index) => (
                        <th key={index}>{columnName}</th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {table.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {columnNames.map((columnName, colIndex) => (
                        <td key={colIndex}>
                            <input
                            type="text"
                            value={row[columnName] || ''}
                            onChange={(event) => handleChange(rowIndex, columnName, event.target.value)}
                            />
                        </td>
                        ))}
                    </tr>
                    ))}
                </tbody>
                </table>
        </div>
    );
}
