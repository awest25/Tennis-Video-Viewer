'use client'

import React, { useState, useEffect, useRef } from 'react';
import VideoPlayer from '../../../components/VideoPlayer';
import { getTaggerButtonData, columnNames } from '../../../services/taggerButtonData.js';
import styles from '../../../styles/TagMatch.module.css';
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation'
import getMatchInfo from '../../../services/getMatchInfo.js';
import updateMatchDocument from '../../../services/updateMatchDocument.js';

export default function TagMatch() {
  // const router = useRouter();
  // const { matchId } = router.query;
  const pathname = usePathname()
  const matchId = pathname.substring(pathname.lastIndexOf('/') + 1);
  const [videoObject, setVideoObject] = useState(null);
  const [videoId, setVideoId] = useState('');
  const [tableState, setTableState] = useState({ rows: [], activeRowIndex: null });
  const [currentPage, setCurrentPage] = useState('ServerName'); // TODO: the default should continue from what was filled in last
  const [taggerHistory, setTaggerHistory] = useState([]); // Array to hold the history of states
  const [isPublished, setIsPublished] = useState(false); // TODO: impliment this functionality (only show published matches)
  const [popUp, setPopUp] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const popUpTimerId = useRef(null);
  const popUpRef = useRef(null);
  // currently impossible to determine exact YouTube FPS: 24-60 FPS
  const FRAMERATE = 30;

  useEffect(() => {
    console.log("line 23");
    getMatchInfo(matchId).then((matchDocument) => {
      setVideoId(matchDocument.videoId);

      if (matchDocument.published) {
        setIsPublished(true);
      } else {
        setIsPublished(false);
      }

      if (matchDocument.points) {
        setTableState(oldTableState => {
          return { ...oldTableState, rows: matchDocument.points };
        });
      } else {
        setTableState(oldTableState => {
          return { ...oldTableState, rows: [] };
        });
      }
    });
  }, [matchId]);

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
        // Get the video timestamp
        const newTimestamp = getVideoTimestamp();

        // If there is an active row and it has a start timestamp but no end timestamp, update the start to the current video timestamp
        // Otherwise, add a new row with the current video timestamp
        if (tableState.activeRowIndex !== null && tableState.rows[tableState.activeRowIndex].pointStartTime !== '' && tableState.rows[tableState.activeRowIndex].pointEndTime === '') {
          saveToHistory();
          changeRowValue(tableState.activeRowIndex, 'pointStartTime', newTimestamp);
        } else {
          saveToHistory();
          addNewRowAndSync();
        }

        sortTable();
      },
      "f": () => {
        const newTimestamp = getVideoTimestamp();
        // If there is an active row, update the end timestamp to the current video timestamp
        if (tableState.activeRowIndex !== null) {
          saveToHistory();
          changeRowValue(tableState.activeRowIndex, 'pointEndTime', newTimestamp);
        }
      },
      "r": () => videoObject.seekTo(videoObject.getCurrentTime() + 1 / FRAMERATE, true),
      "e": () => videoObject.seekTo(videoObject.getCurrentTime() - 1 / FRAMERATE, true),
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

  const changeRowValue = (rowIndex, key, value) => {
    setTableState(oldTableState => {
      let newRows = [...oldTableState.rows];
      newRows[rowIndex] = { ...newRows[rowIndex], [key]: value };
      return { ...oldTableState, rows: newRows };
    });
  };

  const convertToCSV = (data) => {
    const headers = Object.keys(data[0]);
    const rows = data.map(obj =>
      headers.map(fieldName => JSON.stringify(obj[fieldName])).join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  const handleCopy = () => {
    const csvData = convertToCSV(tableState.rows);
    navigator.clipboard.writeText(csvData);
  };


  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    }
  }, [videoObject, videoId, tableState.rows, currentPage]) // TODO: the buttons should be in a different component

  const updateActiveRow = (key, value) => {
    setPopUp(popUp => {
      const message = `Updating: ${key} = ${value}`;
      return [...popUp, message]; // Directly return the updated array
    });
    setTableState(oldTableState => {
      let newRows = [...oldTableState.rows];
      if (oldTableState.activeRowIndex !== null) {
        newRows[oldTableState.activeRowIndex] = { ...newRows[oldTableState.activeRowIndex], [key]: value };
      }
      return { ...oldTableState, rows: newRows };
    });
  }

  const addNewRowAndSync = () => {
    setTableState(oldTableState => {
      pullAndPushRows(oldTableState.rows, null);

      let newTimestamp = getVideoTimestamp();

      // Create a new row object with the required structure
      const newRow = columnNames.reduce((acc, columnName) => {
        // Check if a row already exists with the new timestamp
        let existingRow = tableState.rows.find(row => row.pointStartTime === newTimestamp);

        while (existingRow !== undefined) {
          // If a row already exists, increment the timestamp by 1
          newTimestamp += 1;
          existingRow = tableState.rows.find(row => row.pointStartTime === newTimestamp);
        }

        acc[columnName] = columnName === 'pointStartTime' ? newTimestamp : '';
        return acc;
      }, {});

      // Add new row and sort
      const updatedTable = [...oldTableState.rows, newRow];
      // Sort the table by 'pointStartTime'
      updatedTable.sort((a, b) => a.pointStartTime - b.pointStartTime);

      // After sorting, find the index of the new row
      const newIndex = updatedTable.findIndex(row => row.pointStartTime === newTimestamp);

      // Update the current row index state
      return { rows: updatedTable, activeRowIndex: newIndex };
    });
  };

  const deleteRowAndSync = (rowIndex) => {
    const rowToDeleteTimestamp = tableState.rows[rowIndex].pointStartTime;
    setTableState(oldTableState => {
      // Filter out the row to delete and sort the table
      const updatedTable = oldTableState.rows.filter((row, index) => index !== rowIndex)
      const newActiveRowIndex = rowIndex === oldTableState.activeRowIndex ? oldTableState.activeRowIndex - 1 : oldTableState.activeRowIndex;
      return { rows: updatedTable, activeRowIndex: newActiveRowIndex };
    });
    pullAndPushRows(tableState.rows, rowToDeleteTimestamp);
  }


  const getVideoTimestamp = () => {
    return Math.round(videoObject.getCurrentTime() * 1000);
  }

  const saveToHistory = () => {
    setTaggerHistory(taggerHistory => {
      // Add the new state to the history
      const updatedHistory = [...taggerHistory, { table: tableState.rows, page: currentPage, activeRowIndex: tableState.activeRowIndex }];

      // Check if the history exceeds the maximum length
      if (updatedHistory.length > 30) {
        // Remove the oldest entry (at the beginning of the array)
        return updatedHistory.slice(-30);
      }

      return updatedHistory;
    });
  }
  const showPopUp = () => {
    if (displayPopUp) {
      if (popUpTimerId.current) {
        clearTimeout(popUpTimerId.current);
      }
      setIsVisible(true);
      popUpTimerId.current = setTimeout(() => {
        setPopUp(prevState => ({ ...prevState, isVisible: false }));
      }, 3000);
    }
    else {
      setIsVisible(false)
    }
  };
  //Change Font Size Based On Text Size
  useEffect(() => {
    const adjustFontSize = () => {
      const popUpDiv = popUpRef.current;
      if (!popUpDiv) return;
      let currentFontSize = 16;
      popUpDiv.style.fontSize = `${currentFontSize}px`;
      while (popUpDiv.scrollHeight > popUpDiv.offsetHeight && currentFontSize > 8) {
        currentFontSize--;
        popUpDiv.style.fontSize = `${currentFontSize}px`;
      }
    };
    adjustFontSize();
  }, [popUp]); // Rerun when popUp changes

  const revealPopUp = async () => {
    setDisplayPopUp(current => !current);  // Toggle the state
  }
  useEffect(() => {
    if (displayPopUp) {
      showPopUp();  // Call showPopUp only after displayPopUp has changed
    }
  }, [displayPopUp]);


  const pullAndPushRows = async (rowState, rowToDeleteTimestamp = null) => {
    try {
      const tableSnapshot = [...rowState]; // Snapshot of the table before fetching updates
      // Fetch the current document state from the database
      const matchDocument = await getMatchInfo(matchId);
      const incomingRows = matchDocument.points ?? [];

      // Combine local snapshot and incoming rows
      let combinedRows = [...tableSnapshot, ...incomingRows];

      // If a `rowToDeleteTimestamp` is provided, filter out that row
      combinedRows = rowToDeleteTimestamp != null
        ? combinedRows.filter(row => row.pointStartTime !== rowToDeleteTimestamp)
        : combinedRows;

      // Filter out duplicates based on pointStartTime, keeping the last occurrence
      const uniqueRows = combinedRows.reduceRight((acc, row) => {
        acc.pointStartTimes.add(row.pointStartTime);
        if (acc.pointStartTimes.has(row.pointStartTime) && !acc.added.has(row.pointStartTime)) {
          acc.rows.unshift(row); // Add the row to the beginning to maintain order
          acc.added.add(row.pointStartTime);
        }
        return acc;
      }, { rows: [], pointStartTimes: new Set(), added: new Set() }).rows;

      // Update the document in Firestore with the unique rows
      await updateMatchDocument(matchId, {
        points: uniqueRows
      });

      // Update local state with the merged result
      setTableState(oldTableState => {
        // Merge the unique rows with current local changes that might have occurred during the async operation
        // First, filter out any outdated rows from the current table state
        const currentTableWithOutdatedRemoved = oldTableState.rows.filter(row =>
          !uniqueRows.some(uniqueRow => uniqueRow.pointStartTime === row.pointStartTime)
        );

        let updatedTable = [...currentTableWithOutdatedRemoved, ...uniqueRows];

        // Sort the table by 'pointStartTime'
        updatedTable.sort((a, b) => a.pointStartTime - b.pointStartTime);

        // Update the current row index state
        const oldIndex = oldTableState.activeRowIndex;
        const oldActiveRowTimestamp = oldTableState.rows[oldIndex]?.pointStartTime;
        const newIndex = updatedTable.findIndex(row => row.pointStartTime === oldActiveRowTimestamp);

        // Return the merged result
        return { rows: updatedTable, activeRowIndex: newIndex };
      });
      sortTable();
    } catch (error) {
      console.error("Error pulling and pushing rows: ", error);
    }
  };

  // Toggle the publushed state of the match
  const togglePublish = async () => {
    pullAndPushRows(tableState.rows, null);
    try {
      await updateMatchDocument(matchId, {
        published: !isPublished
      });
      setIsPublished(!isPublished);
    } catch (error) {
      console.error("Error toggling published state: ", error);
    }
    // TODO: Add CSV conversion function
  };

  const sortTable = () => {
    setTableState(oldTableState => {
      return { ...oldTableState, rows: oldTableState.rows.sort((a, b) => a.pointStartTime - b.pointStartTime) };
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
    setTableState(oldTableState => {
      return { ...oldTableState, rows: lastState.table };
    });
    setCurrentPage(lastState.page);
    setTableState(oldTableState => {
      return { ...oldTableState, activeRowIndex: lastState.activeRowIndex };
    });

    // Remove the last state from the history
    setTaggerHistory(taggerHistory.slice(0, -1));
  };

  // This pulls the button data from the taggerButtonData.js file
  const buttonData = getTaggerButtonData(updateActiveRow, addNewRowAndSync, setCurrentPage);

  const handleImageClick = (event) => {
    const courtWidthInInches = 432; // The court is 36 feet wide, or 432 inches
    const courtHeightInInches = 936; // The court is 78 feet long, or 936 inches

    // Get the bounding rectangle of the target (image)
    const rect = event.target.getBoundingClientRect();

    const widthOfCourt = rect.right - rect.left;
    const heightOfCourt = rect.bottom - rect.top;

    // Calculate the click position relative to the image
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Calculate the click position relative to the court
    const xInches = Math.round((x / widthOfCourt) * courtWidthInInches);
    const yInches = Math.round((y / heightOfCourt) * courtHeightInInches);

    console.log("xInches: " + xInches + " yInches: " + yInches);
    return { 'x': xInches, 'y': yInches };
  }


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <VideoPlayer videoId={videoId} setVideoObject={setVideoObject} />
          {/* temporary means to select video (should it be a form?) */}
          <label>Input YouTube Code: </label>
          <input type="text" value={videoId} onChange={handleVideoIdChange} />

          <button onClick={handleCopy}>Copy Columns</button>
          <button onClick={undoLastAction}>Undo</button>
          <button onClick={togglePublish}>{isPublished ? "Unpublish" : "Publish"}</button>
          <button onClick={revealPopUp}>{displayPopUp ? "Hide Last Command" : "Show Last Commmand"}</button>
        </div>
        <div>
          <p>{currentPage}</p>
          {buttonData[currentPage].map((button, index) => {
            return button.courtImage === true ? (
              <div>
                <p>{button.label}</p>
                <img
                  src="/images/Tennis_Court_Full.png"
                  alt="tennis court"
                  onClick={(event) => {
                    setPopUp([])
                    saveToHistory();
                    let data = handleImageClick(event); // returns data.x and data.y coordinates
                    data.table = tableState.rows;
                    data.activeRowIndex = tableState.activeRowIndex;
                    data.videoTimestamp = getVideoTimestamp();
                    button.action(data);
                    showPopUp()
                  }}
                  style={{ width: "10%" }}
                />
              </div>
            ) : (
              <button className={styles.customButton} key={index} onClick={() => {
                setPopUp([])
                saveToHistory();
                let data = {};
                data.table = tableState.rows;
                data.activeRowIndex = tableState.activeRowIndex;
                data.videoTimestamp = getVideoTimestamp();
                button.action(data);
                showPopUp()
              }}>
                {button.label}
              </button>
            );
          })}
        </div>
        <div>
          {isVisible && popUp.length > 0 && (
            <div className={styles.popUp} ref={popUpRef}>
              <h2 style={{ fontSize: '20px' }}>Altered Rows:</h2>
              {popUp.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
          )}
        </div>

      </div>



      { /* CSV Table */}
      <table>
        <thead>
          <tr>
            <th key={"delete_button"}>Delete</th>
            {columnNames.map((columnName, index) => (
              <th key={index}>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableState.rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td key={"delete_button_row"}>
                <button
                  onClick={() => deleteRowAndSync(rowIndex)}
                >
                  <i className="fa fa-trash" aria-hidden="true">X</i>
                </button>
              </td>
              {columnNames.map((columnName, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="text"
                    value={row[columnName] || ''}
                    onChange={(event) => {
                      saveToHistory(); // Save the current state to history first
                      changeRowValue(rowIndex, columnName, event.target.value); // Then handle the change
                    }}
                    // If the current row is the one being edited, highlight it
                    style={{ backgroundColor: tableState.activeRowIndex === rowIndex ? 'yellow' : 'white' }}
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
