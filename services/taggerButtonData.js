/* ======== Usage: =========

The 'getTaggerButtonData' function generates a JSON object used for creating a dynamic user interface with buttons. This object maps page names to arrays of button objects, each defined with specific properties and actions.

Structure:
- Each button object has a 'label' property, which specifies the text to be displayed on the button.
- The 'action' property of each button is a function that handles all logic for the button and can call the following functions (passed from tag-match.js) in any amount/order:
  - 'updateLastRow': This action adds a value to a specified column in the last row of the table. The column name is the first argument, and the value to add is the second argument.
  - 'setCurrentPage': This action updates the 'currentPage' state with the name of the page passed as an argument.
  - 'addNewRow': Calling this function with no arguments adds a new row to the table.
  - All table data is stored in the 'data' argument of the action function, accessed with 'data.table'.

For images it's a little different:
    - To bring in a court image, the following property must be set: { courtImage: true }
    - The label sits above the image
    - The action takes a data argument
    - The x coordinate is stored in: data.x
    - The y coordinate is sotred in: data.y
You can then use this x and y coordinate to update the table.

For example, if the coordinates are really high, you know the serve was long, and you write the logic to record it:
if (data.y > 800) {
    updateLastRow('isErrorLong', '1'); // sets the isErrorLong column to '1' for the last row
}

Other examples:
updateLastRow('pointScore', '0-0'); // sets the pointScore column to '0-0' for the last row
setCurrentPage('FirstServeResult'); // sets the currentPage to 'FirstServeResult'
newRow(); // adds a new row to the table

======== Developed by Alex West ======== */
var serverScore = 0;
var returnerScore = 0;
var player1SetScore = 0;
var player2SetScore = 0;
var player1GameScore = 0;
var player2GameScore = 0;

function updateScore(shotInRally, isWinner, serverName) {
if ((shotInRally % 2 == 0) &
    isWinner == '1') {
        if (returnerScore == 40) {
            if (serverName == 'Player1') {
                    player2GameScore += 1;
                    serverScore = 0;
                    returnerScore = 0;
            }
            else
            {
                player1GameScore += 1;
                serverScore = 0;
                returnerScore = 0; 
            }

            }
            else if (returnerScore != 30) {
                returnerScore += 15;
            }
            else {
                returnerScore += 10;
                 }
}
else if (shotInRally % 2 == 0) {
            if (serverScore == 40) {
                    if (serverName == 'Player1') {
                        player1GameScore += 1;
                        serverScore = 0;
                        returnerScore = 0;
                    }
                    else
                    {
                        player2GameScore += 1;
                        serverScore = 0;
                        returnerScore = 0; 
                    }
                }
            else if (serverScore != 30) {
                serverScore += 15;
                            }
            else    {
                serverScore += 10;
                }
                            
    }
else if (shotInRally % 2 == 1 &
isWinner == '1') {
    if (serverScore == 40) {
        if (data.table[data.table.length - data.table.length + 1]['serverName'] == 'Player1') {
            player1GameScore += 1;
            serverScore = 0;
            returnerScore = 0;
        }
        else
        {
            player2GameScore += 1;
            serverScore = 0;
            returnerScore = 0; 
        }
    }
    else if (serverScore != 30) {
    serverScore += 15;
                }
    else  {
    serverScore += 10;
    }
}
else {
    if (returnerScore == 40) {
        if (data.table[data.table.length - data.table.length + 1]['serverName'] == 'Player1') {
                player2GameScore += 1;
                serverScore = 0;
                returnerScore = 0;
        }
        else
        {
            player1GameScore += 1;
            serverScore = 0;
            returnerScore = 0; 
        }

        }
        else if (returnerScore != 30) {
            returnerScore += 15;
        }
        else {
            returnerScore += 10;
             }
}
}
function chooseSide() {
    if (serverScore == 40 || returnerScore == 40) {
        if ((serverScore + returnerScore) % 2 == 0) {
            return "Ad";
        }
        else
        {
            return "Deuce";
        }
    }
    else {
        if ((serverScore + returnerScore) % 2 == 0) {
            return "Deuce";
        }
        else
        {
            return "Ad";
        } 
    }
    
}
function doubleFault(serverName) {
    if (returnerScore < 30) {
        returnerScore += 15;
    }
    else if (returnerScore < 40) {
        returnerScore += 10;
    }
    else {
    if (serverName == 'Player1') {
        player2GameScore += 1;
        serverScore = 0;
        returnerScore = 0;
    }
    else
    {
        player1GameScore += 1;
        serverScore = 0;
        returnerScore = 0; 
    } 
    }
}
// function endPoint() {
//     if (serverScore == 40 && returnerScore == 40) {
//         setCurrentPage('PointScore');
//     }
//     else {
//     updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
//     updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
//     updateLastRow('pointScore', serverScore + '-' + returnerScore);
//     updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
//     updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
//     updateLastRow('isPointStart', 1);
//     updateLastRow('shotInRally', 1);
//     updateLastRow('side', chooseSide());
//     setCurrentPage('FirstServe');  
//     }
// }
export const getTaggerButtonData = (updateLastRow, addNewRow, setCurrentPage) => ({
    // //added SetScore
    // 'SetScore': [
    //     {
    //         label: '0-0',
    //         action: () => {
    //             addNewRow();
    //             updateLastRow('setScore', '0-0');
    //             setCurrentPage('GameScore');
    //         }
    //     },
    //     {
    //         label: '0-1',
    //         action: () => {
    //             addNewRow();
    //             updateLastRow('setScore', '0-1');
    //             setCurrentPage('GameScore');
    //         }
    //     },
    //     {
    //         label: '1-0',
    //         action: () => {
    //             addNewRow();
    //             updateLastRow('setScore', '1-0');
    //             setCurrentPage('GameScore');
    //         }
    //     },
    //     {
    //         label: '1-1',
    //         action: () => {
    //             addNewRow();
    //             updateLastRow('setScore', '1-1');
    //             setCurrentPage('GameScore');
    //         }
    //     },
    //     ],
    // // added GameScore
    // 'GameScore': [
    //     {
    //         label: '0-0',
    //         action: () => {
    //             updateLastRow('gameScore', '0-0');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '0-1',
    //         action: () => {
    //             updateLastRow('gameScore', '0-1');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '0-2',
    //         action: () => {
    //             updateLastRow('gameScore', '0-2');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '0-3',
    //         action: () => {
    //             updateLastRow('gameScore', '0-3');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '0-4',
    //         action: () => {
    //             updateLastRow('gameScore', '0-4');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '0-5',
    //         action: () => {
    //             updateLastRow('gameScore', '0-5');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '1-0',
    //         action: () => {
    //             updateLastRow('gameScore', '1-0');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '1-1',
    //         action: () => {
    //             updateLastRow('gameScore', '1-1');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '1-2',
    //         action: () => {
    //             updateLastRow('gameScore', '1-2');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '1-3',
    //         action: () => {
    //             updateLastRow('gameScore', '1-3');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '1-4',
    //         action: () => {
    //             updateLastRow('gameScore', '1-4');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '1-5',
    //         action: () => {
    //             updateLastRow('gameScore', '1-5');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '2-0',
    //         action: () => {
    //             updateLastRow('gameScore', '2-0');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '2-1',
    //         action: () => {
    //             updateLastRow('gameScore', '2-1');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '2-2',
    //         action: () => {
    //             updateLastRow('gameScore', '2-2');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '2-3',
    //         action: () => {
    //             updateLastRow('gameScore', '2-3');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '2-4',
    //         action: () => {
    //             updateLastRow('gameScore', '2-4');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '2-5',
    //         action: () => {
    //             updateLastRow('gameScore', '2-5');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '3-0',
    //         action: () => {
    //             updateLastRow('gameScore', '3-0');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '3-1',
    //         action: () => {
    //             updateLastRow('gameScore', '3-1');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '3-2',
    //         action: () => {
    //             updateLastRow('gameScore', '3-2');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '3-3',
    //         action: () => {
    //             updateLastRow('gameScore', '3-3');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '3-4',
    //         action: () => {
    //             updateLastRow('gameScore', '3-4');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '3-5',
    //         action: () => {
    //             updateLastRow('gameScore', '3-5');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '4-0',
    //         action: () => {
    //             updateLastRow('gameScore', '4-0');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '4-1',
    //         action: () => {
    //             updateLastRow('gameScore', '4-1');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '4-2',
    //         action: () => {
    //             updateLastRow('gameScore', '4-2');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '4-3',
    //         action: () => {
    //             updateLastRow('gameScore', '4-3');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '4-4',
    //         action: () => {
    //             updateLastRow('gameScore', '4-4');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '4-5',
    //         action: () => {
    //             updateLastRow('gameScore', '4-5');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '5-0',
    //         action: () => {
    //             updateLastRow('gameScore', '5-0');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '5-1',
    //         action: () => {
    //             updateLastRow('gameScore', '5-1');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '5-2',
    //         action: () => {
    //             updateLastRow('gameScore', '5-2');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '5-3',
    //         action: () => {
    //             updateLastRow('gameScore', '5-3');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '5-4',
    //         action: () => {
    //             updateLastRow('gameScore', '5-4');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '5-5',
    //         action: () => {
    //             updateLastRow('gameScore', '5-5');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '5-6',
    //         action: () => {
    //             updateLastRow('gameScore', '5-6');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '6-5',
    //         action: () => {
    //             updateLastRow('gameScore', '6-5');
    //             setCurrentPage('ServerName');
    //         }
    //     },
    //     {
    //         label: '6-6',
    //         action: () => {
    //             updateLastRow('gameScore', '6-6');
    //             setCurrentPage('ServerName');
    //         }
    //     },
        
    // ],
    'ServerName': [
        {
            label: 'Player1',
            action: () => {
                addNewRow();
                updateLastRow('serverName', 'Player1');
                setCurrentPage('ServerSide')
            }
        },
        {
            label: 'Player2',
            action: () => {
                addNewRow();
                updateLastRow('serverName', 'Player2');
                setCurrentPage('ServerSide')
            }
        },
    ],
    'ServerSide': [
        {
            label: 'NearSide',
            action: () => {
                updateLastRow('serverFarNear', 'Near');
                updateLastRow('pointScore', serverScore + '-' + returnerScore);
                updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                updateLastRow('isPointStart', 1);
                updateLastRow('shotInRally', 1);
                updateLastRow('side', chooseSide());
                setCurrentPage('FirstServe');
                //setCurrentPage('PointScore')
            }
        },
        {
            label: 'FarSide',
            action: () => {
                updateLastRow('serverFarNear', 'Far');
                updateLastRow('pointScore', serverScore + '-' + returnerScore);
                updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                updateLastRow('isPointStart', 1);
                updateLastRow('shotInRally', 1);
                updateLastRow('side', chooseSide());
                setCurrentPage('FirstServe');
               // setCurrentPage('PointScore')
            }
        },
    ],
    'PointScore': [
        // {
        //     label: '0-0',
        //     action: (data) => {
        //         addNewRow();
        //         updateLastRow('pointScore', '0-0');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Deuce');
        //         setCurrentPage('FirstServe');
        //         console.log(data.table[data.table.length - 1]); // logs the last row of the table
        //     }
        // },
        // {
        //     label: '15-0',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '15-0');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Ad');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '30-0',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '30-0');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Deuce');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '40-0',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '40-0');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Ad');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // // Add additional buttons based on the image
        // {
        //     label: '0-15',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '0-15');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Ad');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '15-15',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '15-15');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Deuce');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '30-15',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '30-15');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Ad');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '40-15',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '40-15');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Deuce');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '0-30',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '0-30');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Deuce');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '15-30',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '15-30');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Ad');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '30-30',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '30-30');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Deuce');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '40-30',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '40-30');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Ad');
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '0-40',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '0-40');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Ad');
        //         updateLastRow('isBreakPoint', 1);
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '15-40',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '15-40');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Deuce');
        //         updateLastRow('isBreakPoint', 1);
        //         setCurrentPage('FirstServe');
        //     }
        // },
        // {
        //     label: '30-40',
        //     action: () => {
        //         addNewRow();
        //         updateLastRow('pointScore', '30-40');
        //         updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
        //         updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
        //         updateLastRow('isPointStart', 1);
        //         updateLastRow('shotInRally', 1);
        //         updateLastRow('side', 'Ad');
        //         updateLastRow('isBreakPoint', 1);
        //         setCurrentPage('FirstServe');
        //     }
        // },
        {
            label: '40-40 (Ad Side)',
            action: () => {
                updateLastRow('pointScore', '40-40');
                updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                updateLastRow('isPointStart', 1);
                updateLastRow('shotInRally', 1);
                updateLastRow('side', 'Ad');
                updateLastRow('isBreakPoint', 1);
                setCurrentPage('FirstServe');
            }
        },
        {
            label: '40-40 (Deuce Side)',
            action: () => {
                updateLastRow('pointScore', '40-40');
                updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                updateLastRow('isPointStart', 1);
                updateLastRow('shotInRally', 1);
                updateLastRow('side', 'Deuce');
                updateLastRow('isBreakPoint', 1);
                setCurrentPage('FirstServe');
            }
        },
    ],

    'FirstServe': [
        {
            courtImage: true,
            label: 'Select First Serve Position',
            action: (data) => {
                updateLastRow('firstServeXCoord', data.x);
                updateLastRow('firstServeYCoord', data.y);
                // Depending on coordinates, fill location of serve, etc...
                if (data.table[data.table.length - 1]['serverFarNear'] == 'Near') {
                    console.log('Here');
                    if ((data.table[data.table.length - 1])['side'] == 'Deuce') // split by side
                    {
                            // Assuming coordinate range of x: 75 -215, y: 220-470
                        if (data.x >= 75 & data.x < 121)
                        {
                            updateLastRow('firstServeZone', 'Wide');
                            if (data.y >= 220 & data.y <= 470)
                            {
                                updateLastRow('firstServeIn', '1');
                                setCurrentPage('GroundstrokeContact');
                            }
                            else
                            {
                                updateLastRow('firstServeIn', '0');
                                setCurrentPage('SecondServe');
                            }
                        }
                        else if (data.x >= 121 & data.x <= 168)
                        {
                            updateLastRow('firstServeZone', 'Body');
                            if (data.y >= 220 & data.y <= 470)
                            {
                                updateLastRow('firstServeIn', '1');
                                setCurrentPage('GroundstrokeContact');
                            }
                            else
                            {
                                updateLastRow('firstServeIn', '0');
                                setCurrentPage('SecondServe');
                            }
                        }
                        else if (data.x > 168 & data.x <= 215)
                        {
                            updateLastRow('firstServeZone', 'T');
                            if (data.y >= 220 & data.y <= 470)
                            {
                                updateLastRow('firstServeIn', '1');
                                setCurrentPage('GroundstrokeContact');
                            }
                            else
                            {
                                updateLastRow('firstServeIn', '0');
                                setCurrentPage('SecondServe');
                            }
                        }
                        else
                        {
                            updateLastRow('firstServeIn', '0');
                            if (data.x > 215) 
                            {
                                updateLastRow('firstServeZone', 'T');
                            }
                            else 
                            {
                                updateLastRow('firstServeZone', 'Wide')
                            }
                            setCurrentPage('SecondServe');
                        }
                    }
            else // wide and T inverted for Ad side
                {  // Assuming coordinate range of x: 215-350, y: 220-470
                    if (data.x >= 215 & data.x < 260)
                    {
                        updateLastRow('firstServeZone', 'T');
                        if (data.y >= 220 & data.y <= 470)
                        {
                            updateLastRow('firstServeIn', '1');
                            setCurrentPage('GroundstrokeContact');
                        }
                        else
                        {
                            updateLastRow('firstServeIn', '0');
                            setCurrentPage('SecondServe');
                        }
                    }
                    else if (data.x >= 260 & data.x <= 305)
                    {
                        updateLastRow('firstServeZone', 'Body');
                        if (data.y >= 220 & data.y <= 470)
                        {
                            updateLastRow('firstServeIn', '1');
                            setCurrentPage('GroundstrokeContact');
                        }
                        else
                        {
                            updateLastRow('firstServeIn', '0');
                            setCurrentPage('SecondServe');
                        }
                    }
                    else if (data.x > 305 & data.x <= 350)
                    {
                        updateLastRow('firstServeZone', 'Wide');
                        if (data.y >= 220 & data.y <= 470)
                        {
                            updateLastRow('firstServeIn', '1');
                            setCurrentPage('GroundstrokeContact');
                        }
                        else
                        {
                            updateLastRow('firstServeIn', '0');
                            setCurrentPage('SecondServe');
                        }
                    }
                    else
                    {
                        updateLastRow('firstServeIn', '0');
                        if (data.x > 215) 
                        {
                            updateLastRow('firstServeZone', 'T');
                        }
                        else 
                        {
                            updateLastRow('firstServeZone', 'Wide')
                        }
                        setCurrentPage('SecondServe');
                    }   
                }
            }
            // FAR SIDE
            else
            {
                if ((data.table[data.table.length - 1])['side'] == 'Ad') // split by side
                {
                    // Assuming coordinate range of x: 75 -215, y: 470-723
                if (data.x >= 75 & data.x < 121)
                {
                    updateLastRow('firstServeZone', 'Wide');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateLastRow('firstServeIn', '1');
                        setCurrentPage('GroundstrokeContact');
                    }
                    else
                    {
                        updateLastRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else if (data.x >= 121 & data.x <= 168)
                {
                    updateLastRow('firstServeZone', 'Body');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateLastRow('firstServeIn', '1');
                        setCurrentPage('GroundstrokeContact');
                    }
                    else
                    {
                        updateLastRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else if (data.x > 168 & data.x <= 215)
                {
                    updateLastRow('firstServeZone', 'T');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateLastRow('firstServeIn', '1');
                        setCurrentPage('GroundstrokeContact');
                    }
                    else
                    {
                        updateLastRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else
                {
                    updateLastRow('firstServeIn', '0');
                    if (data.x > 215) 
                    {
                        updateLastRow('firstServeZone', 'T');
                    }
                    else 
                    {
                        updateLastRow('firstServeZone', 'Wide')
                    }
                    setCurrentPage('SecondServe');
                }
            }
            else // wide and T inverted for Deuce side
            {  // Assuming coordinate range of x: 215-350, y: 470-723
                if (data.x >= 215 & data.x < 260)
                {
                    updateLastRow('firstServeZone', 'T');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateLastRow('firstServeIn', '1');
                        setCurrentPage('GroundstrokeContact');
                    }
                    else
                    {
                        updateLastRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else if (data.x >= 260 & data.x <= 305)
                {
                    updateLastRow('firstServeZone', 'Body');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateLastRow('firstServeIn', '1');
                        setCurrentPage('GroundstrokeContact');
                    }
                    else
                    {
                        updateLastRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else if (data.x > 305 & data.x <= 350)
                {
                    updateLastRow('firstServeZone', 'Wide');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateLastRow('firstServeIn', '1');
                        setCurrentPage('GroundstrokeContact');
                    }
                    else
                    {
                        updateLastRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else
                {
                    updateLastRow('firstServeIn', '0');
                    if (data.x >= 215 & data.x < 260) 
                    {
                        updateLastRow('firstServeZone', 'T');
                    }
                    else 
                    {
                        updateLastRow('firstServeZone', 'Wide')
                    }
                    setCurrentPage('SecondServe');
                }   
            }  
            }
        }
        },
    ],
    'SecondServe': [
        {
        courtImage: true,
        label: 'Select Second Serve Position',
        action: (data) => {
            updateLastRow('secondServeXCoord', data.x);
            updateLastRow('secondServeYCoord', data.y);
            // Depending on coordinates, fill location of serve, etc...
            if (data.table[data.table.length - 1]['serverFarNear'] == 'Near') {
            if ((data.table[data.table.length - 1])['side'] == 'Deuce') // split by side
            {
                // Assuming coordinate range of x: 75 -215, y: 220-470
            if (data.x >= 75 & data.x < 121)
            {
                updateLastRow('secondServeZone', 'Wide');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x >= 121 & data.x <= 168)
            {
                updateLastRow('secondServeZone', 'Body');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x > 168 & data.x <= 215)
            {
                updateLastRow('secondServeZone', 'T');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else
            {
                updateLastRow('secondServeIn', '0');
                if (data.x > 215) 
                {
                    updateLastRow('secondServeZone', 'T');
                }
                else 
                {
                    updateLastRow('secondServeZone', 'Wide')
                }
                doubleFault(data.table[data.table.length - 1]['serverName']);
                if (serverScore == 0 && returnerScore == 0) {
                    setCurrentPage('ServerName');
                }
                else {
                    addNewRow();
                if (serverScore == 40 && returnerScore == 40) {
                    setCurrentPage('PointScore');
                }
                else {
                    updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                    updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                    updateLastRow('pointScore', serverScore + '-' + returnerScore);
                    updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                    updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                    updateLastRow('isPointStart', 1);
                    updateLastRow('shotInRally', 1);
                    updateLastRow('side', chooseSide());
                    setCurrentPage('FirstServe');  
                }   
            }
            }
        }
        else // wide and T inverted for Ad side
        {  // Assuming coordinate range of x: 215-350, y: 220-470
            if (data.x >= 215 & data.x < 260)
            {
                updateLastRow('secondServeZone', 'T');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x >= 260 & data.x <= 305)
            {
                updateLastRow('secondServeZone', 'Body');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x > 305 & data.x <= 350)
            {
                updateLastRow('secondServeZone', 'Wide');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else
            {
                updateLastRow('secondServeIn', '0');
                if (data.x > 215) 
                {
                    updateLastRow('secondServeZone', 'T');
                }
                else 
                {
                    updateLastRow('secondServeZone', 'Wide')
                }
                doubleFault(data.table[data.table.length - 1]['serverName']);
                if (serverScore == 0 && returnerScore == 0) {
                    setCurrentPage('ServerName');
                }
                else {
                    addNewRow();
                if (serverScore == 40 && returnerScore == 40) {
                    setCurrentPage('PointScore');
                }
                else {
                    updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                    updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                    updateLastRow('pointScore', serverScore + '-' + returnerScore);
                    updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                    updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                    updateLastRow('isPointStart', 1);
                    updateLastRow('shotInRally', 1);
                    updateLastRow('side', chooseSide());
                    setCurrentPage('FirstServe');  
                }   
            }
            }   
        }
        }
        // FAR SIDE
        else
        {
            if ((data.table[data.table.length - 1])['side'] == 'Ad') // split by side
            {
                // Assuming coordinate range of x: 75 -215, y: 470-723
            if (data.x >= 75 & data.x < 121)
            {
                updateLastRow('secondServeZone', 'Wide');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x >= 121 & data.x <= 168)
            {
                updateLastRow('secondServeZone', 'Body');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    addNewRow();
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x > 168 & data.x <= 215)
            {
                updateLastRow('secondServeZone', 'T');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else
            {
                updateLastRow('secondServeIn', '0');
                if (data.x > 215) 
                {
                    updateLastRow('secondServeZone', 'T');
                }
                else 
                {
                    updateLastRow('secondServeZone', 'Wide')
                }
                doubleFault(data.table[data.table.length - 1]['serverName']);
                if (serverScore == 0 && returnerScore == 0) {
                    setCurrentPage('ServerName');
                }
                else {
                    addNewRow();
                if (serverScore == 40 && returnerScore == 40) {
                    setCurrentPage('PointScore');
                }
                else {
                    updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                    updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                    updateLastRow('pointScore', serverScore + '-' + returnerScore);
                    updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                    updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                    updateLastRow('isPointStart', 1);
                    updateLastRow('shotInRally', 1);
                    updateLastRow('side', chooseSide());
                    setCurrentPage('FirstServe');  
                }   
            }
            }
        }
        else // wide and T inverted for Deuce side
        {  // Assuming coordinate range of x: 215-350, y: 470-723
            if (data.x >= 215 & data.x < 260)
            {
                updateLastRow('secondServeZone', 'T');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x >= 260 & data.x <= 305)
            {
                updateLastRow('secondServeZone', 'Body');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x > 305 & data.x <= 350)
            {
                updateLastRow('secondServeZone', 'Wide');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateLastRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateLastRow('secondServeIn', '0');
                    doubleFault(data.table[data.table.length - 1]['serverName']);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else
            {
                updateLastRow('secondServeIn', '0');
                if (data.x >= 215 & data.x <= 260) 
                {
                    updateLastRow('secondServeZone', 'T');
                }
                else 
                {
                    updateLastRow('secondServeZone', 'Wide')
                }
                doubleFault(data.table[data.table.length - 1]['serverName']);
            if (serverScore == 0 && returnerScore == 0) {
                setCurrentPage('ServerName');
            }
            else {
                addNewRow();
            if (serverScore == 40 && returnerScore == 40) {
                setCurrentPage('PointScore');
            }
            else {
                updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                updateLastRow('pointScore', serverScore + '-' + returnerScore);
                updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                updateLastRow('isPointStart', 1);
                updateLastRow('shotInRally', 1);
                updateLastRow('side', chooseSide());
                setCurrentPage('FirstServe');  
            }   
        }
            }   
        } 
        }
        
    }
    }
    ],
    'GroundstrokeContact': [
        {
            courtImage: true,
            label: 'Select Shot Contact Position',
            action: (data) => {
                addNewRow();
                updateLastRow('shotContactX', data.x);
                updateLastRow('shotContactY', data.y);
                updateLastRow('shotInRally', parseInt(data.table[data.table.length - 1]['shotInRally']) + 1);
                // Need to copy down: pointScore, gameScore, setScore, serverName, serverSide
                updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                updateLastRow('pointScore', data.table[data.table.length - 1]['pointScore']);
                updateLastRow('gameScore', data.table[data.table.length - 1]['gameScore']);
                updateLastRow('setScore', data.table[data.table.length - 1]['setScore']);
                updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                if (data.y < 471) 
                { // assuming 470 is halfway point
                    if (data.x < 215) 
                    {
                        updateLastRow('side', 'Deuce');
                        setCurrentPage('GroundstrokeShotInfo')
                    }
                    else
                    {
                        updateLastRow('side', 'Ad');
                        setCurrentPage('GroundstrokeShotInfo')
                    }
                }
                else
                {
                    if (data.x < 215) 
                    {
                        updateLastRow('side', 'Ad');
                        setCurrentPage('GroundstrokeShotInfo')
                    }
                    else
                    {
                        updateLastRow('side', 'Deuce');
                        setCurrentPage('GroundstrokeShotInfo')
    
                    } 
                }
        },
    }
    ],
    'GroundstrokeShotInfo': [
        {
            label: 'Forehand',
            action: () => {
                updateLastRow('shotFhBh', 'Forehand');
                setCurrentPage('GroundstrokeLocation');
            }
        },
        {
            label: 'Backhand',
            action: () => {
                updateLastRow('shotFhBh', 'Backhand');
                setCurrentPage('GroundstrokeLocation');
            }
        },

    ],
    'GroundstrokeLocation': [
        {
            label: 'Slice',
            action: () => {
                updateLastRow('isSlice', '1');
            }
        },
        {
            label: 'Dropshot',
            action: () => {
                updateLastRow('isDropshot', '1');
            }
        },
        {
            label: 'Approach',
            action: () => {
                updateLastRow('isApproach', '1');
            }
        },
        {
            label: 'Volley',
            action: () => {
                updateLastRow('isVolley', '1');
            }
        },
        {
            label: 'Overhead',
            action: () => {
                updateLastRow('isOverhead', '1');
            }
        },
        {
            label: 'Lob',
            action: () => {
                updateLastRow('isLob', '1');
            }
        },
        {
            label: 'Player1AtNet',
            action: () => {
                updateLastRow('atNetPlayer1', '1');
            }
        },
        {
            label: 'Player2AtNet',
            action: () => {
                updateLastRow('atNetPlayer2', '1');
            }
        },
        {
            label: 'Winner',
            action: () => {
                updateLastRow('isWinner', '1');
                updateLastRow('isPointEnd', '1');
            }
        },
        {
            label: 'ErrorWideLeft',
            action: () => {
                updateLastRow('isErrorWideL', '1');
                updateLastRow('isPointEnd', '1');
            }
        },
        {
            label: 'ErrorWideRight',
            action: () => {
                updateLastRow('isErrorWideR', '1');
                updateLastRow('isPointEnd', '1');
            }
        },
        {
            label: 'ErrorLong',
            action: () => {
                updateLastRow('isErrorLong', '1');
                updateLastRow('isPointEnd', '1');
            }
        },
        {
            label: 'ErrorNet',
            action: () => {
                updateLastRow('isErrorNet', '1');
                updateLastRow('isPointEnd', '1');
            }
        },
        {
            courtImage: true,
            label: 'Select Shot Result Location',
            action: (data) => {
                updateLastRow('shotLocationX', data.x);
                updateLastRow('shotLocationY', data.y);
                // assuming 215 is halfway point
                if (data.x > 215 & data.table[data.table.length - 1]["shotContactX"] > 215) {
                    updateLastRow('shotDirection', "Down the Line");
                }
                else if (data.x <= 215 & data.table[data.table.length - 1]["shotContactX"] > 215) {
                    updateLastRow('shotDirection', "Crosscourt");
                }
                else if (data.x > 215 & data.table[data.table.length - 1]["shotContactX"] <= 215) {
                    updateLastRow('shotDirection', "Crosscourt");
                }
                else {
                    updateLastRow('shotDirection', "Down the Line");
                }
                if (data.table[data.table.length - 1]["isPointEnd"] == '1') { 
                    updateScore(parseInt(data.table[data.table.length - 1]["shotInRally"]), 
                    data.table[data.table.length - 1]["isWinner"], 
                    data.table[data.table.length - 1]["serverName"]);
                    if (serverScore == 0 && returnerScore == 0) {
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName'])
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear'])
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateLastRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateLastRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateLastRow('pointScore', serverScore + '-' + returnerScore);
                        updateLastRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateLastRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateLastRow('isPointStart', 1);
                        updateLastRow('shotInRally', 1);
                        updateLastRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
            }
                else 
                {
                    setCurrentPage('GroundstrokeContact');
                }
        },
    }
    ],
});

export const columnNames = [
    'pointScore',
    'gameScore',
    'setScore',
    'tiebreakScore',
    'isPointStart',
    'pointStartTime',
    'isPointEnd',
    'pointEndTime',
    'pointNumber',
    'isBreakPoint',
    'shotInRally',
    'side',
    'serverName',
    'serverFarNear',
    'firstServeIn',
    'firstServeZone',
    'firstServeXCoord',
    'firstServeYCoord',
    'secondServeIn',
    'secondServeZone',
    'secondServeXCoord',
    'secondServeYCoord',
    'isAce',
    'shotContactX',
    'shotContactY',
    'shotDirection',
    'shotFhBh',
    'isSlice',
    'isVolley',
    'isOverhead',
    'isApproach',
    'isDropshot',
    'atNetPlayer1',
    'atNetPlayer2',
    'isLob',
    'shotLocationX',
    'shotLocationY',
    'isWinner',
    'isErrorWideR',
    'isErrorWideL',
    'isErrorNet',
    'isErrorLong',
    'clientTeam',
    'Date',
    'Division',
    'Event',
    'lineupPosition',
    'matchDetails',
    'matchVenue',
    'opponentTeam',
    'player1Name',
    'player2Name',
    'player1Hand',
    'player2Hand',
    'Round',
    'Surface',
    'Notes',
];