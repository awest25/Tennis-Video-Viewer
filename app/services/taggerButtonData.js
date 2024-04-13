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

Available properties of `data`:
data.x
data.y
data.table
data.activeRowIndex
data.videoTimestamp

======== Developed by Alex West ======== */
var serverScore = 0;
var returnerScore = 0;
var player1SetScore = 0;
var player2SetScore = 0;
var player1GameScore = 0;
var player2GameScore = 0;
var player1TiebreakScore = 0;
var player2TiebreakScore = 0;

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
                        serverScore = 0;
                        returnerScore = 0;
                        player1GameScore += 1;
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
    else  {
    serverScore += 10;
    }
}
else {
    if (returnerScore == 40) {
        if (serverName == 'Player1') {
                serverScore = 0;
                returnerScore = 0;
                player2GameScore += 1;
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
function ace(serverName) {
    if (serverScore < 30) {
        serverScore += 15;
    }
    else if (serverScore < 40) {
        serverScore += 10;
    }
    else {
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
 } 
function updateTiebreakScore(shotInRally, isWinner, serverName) {
    if ((shotInRally % 2 == 0) &
    isWinner == '1') {
        if (serverName == 'Player1') {
            player2TiebreakScore += 1;
        }
        else {
            player1TiebreakScore += 1;
        }
    }
    else if ((shotInRally % 2 == 0)) {
        if (serverName == 'Player1') {
            player1TiebreakScore += 1;
        }
        else {
            player2TiebreakScore += 1;
        }
    }
    else if ((shotInRally % 2 == 1) & 
    isWinner == '1') {
        if (serverName == 'Player1') {
            player1TiebreakScore += 1;
        }
        else {
            player2TiebreakScore += 1;
        }
    }
    else  {
        if (serverName == 'Player1') {
            player2TiebreakScore += 1;
        }
        else {
            player1TiebreakScore += 1;
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
export const getTaggerButtonData = (updateActiveRow, addNewRow, setCurrentPage) => ({
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
                updateActiveRow('serverName', 'Player1');
                setCurrentPage('ServerSide')
            }
        },
        {
            label: 'Player2',
            action: () => {
                addNewRow();
                updateActiveRow('serverName', 'Player2');
                setCurrentPage('ServerSide')
            }
        },
    ],
    'ServerSide': [
        {
            label: 'NearSide',
            action: () => {
                updateActiveRow('serverFarNear', 'Near');
                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                updateActiveRow('isPointStart', 1);
                updateActiveRow('shotInRally', 1);
                updateActiveRow('side', chooseSide());
                setCurrentPage('FirstServe');
                //setCurrentPage('PointScore')
            }
        },
        {
            label: 'FarSide',
            action: () => {
                updateActiveRow('serverFarNear', 'Far');
                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                updateActiveRow('isPointStart', 1);
                updateActiveRow('shotInRally', 1);
                updateActiveRow('side', chooseSide());
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
                updateActiveRow('pointScore', '40-40');
                updateActiveRow('gameScore', data.table[data.table.length - 1]['gameScore']);
                updateActiveRow('setScore', data.table[data.table.length - 1]['setScore']);
                updateActiveRow('isPointStart', 1);
                updateActiveRow('shotInRally', 1);
                updateActiveRow('side', 'Ad');
                updateActiveRow('isBreakPoint', 1);
                setCurrentPage('FirstServe');
            }
        },
        {
            label: '40-40 (Deuce Side)',
            action: () => {
                updateActiveRow('pointScore', '40-40');
                updateActiveRow('gameScore', data.table[data.table.length - 1]['gameScore']);
                updateActiveRow('setScore', data.table[data.table.length - 1]['setScore']);
                updateActiveRow('isPointStart', 1);
                updateActiveRow('shotInRally', 1);
                updateActiveRow('side', 'Deuce');
                updateActiveRow('isBreakPoint', 1);
                setCurrentPage('FirstServe');
            }
        },
    ],
    'FirstServe': [
    {
    label: 'Ace',
    action: () => {
        updateActiveRow('isAce', '1');
        updateActiveRow('isPointEnd', '1');
        updateActiveRow('isWinner', '1');
        //setCurrentPage('PointScore')
        }
    },
    {
            courtImage: true,
            label: 'Select First Serve Position',
            action: (data) => {
                updateActiveRow('firstServeXCoord', data.x);
                updateActiveRow('firstServeYCoord', data.y);
                
                // Depending on coordinates, fill location of serve, etc...
                if (data.table[data.table.length - 1]['serverFarNear'] == 'Near') {
                    if ((data.table[data.table.length - 1])['side'] == 'Deuce') // split by side
                    {
                            // Assuming coordinate range of x: 75 -215, y: 220-470
                        if (data.x >= 75 & data.x < 121)
                        {
                            updateActiveRow('firstServeZone', 'Wide');
                            if (data.y >= 220 & data.y <= 470)
                            {
                                updateActiveRow('firstServeIn', '1');
                                if (data.table[data.table.length - 1]['isAce'] == '1') {
                                    ace(data.table[data.table.length - 1]['serverName']);
                                    if (serverScore == 0 && returnerScore == 0) {
                                        setCurrentPage('ServerName');
                                    }
                                    else {
                                        addNewRow();
                                    if (serverScore == 40 && returnerScore == 40) {
                                        setCurrentPage('PointScore');
                                    }
                                    else {
                                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                        updateActiveRow('isPointStart', 1);
                                        updateActiveRow('shotInRally', 1);
                                        updateActiveRow('side', chooseSide());
                                        setCurrentPage('FirstServe');  
                                    }   
                                }
                            }
                            else {
                                setCurrentPage('GroundstrokeContact');
                            }
                        }
                            else
                            {
                                updateActiveRow('firstServeIn', '0');
                                setCurrentPage('SecondServe');
                            }
                        }
                        else if (data.x >= 121 & data.x <= 168)
                        {
                            updateActiveRow('firstServeZone', 'Body');
                            if (data.y >= 220 & data.y <= 470)
                            {
                                updateActiveRow('firstServeIn', '1');
                                if (data.table[data.table.length - 1]['isAce'] == '1') {
                                    ace(data.table[data.table.length - 1]['serverName']);
                                    if (serverScore == 0 && returnerScore == 0) {
                                        setCurrentPage('ServerName');
                                    }
                                    else {
                                        addNewRow();
                                    if (serverScore == 40 && returnerScore == 40) {
                                        setCurrentPage('PointScore');
                                    }
                                    else {
                                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                        updateActiveRow('isPointStart', 1);
                                        updateActiveRow('shotInRally', 1);
                                        updateActiveRow('side', chooseSide());
                                        setCurrentPage('FirstServe');  
                                    }   
                                }
                            }
                            else {
                                setCurrentPage('GroundstrokeContact');
                            }
                            }
                            else
                            {
                                updateActiveRow('firstServeIn', '0');
                                setCurrentPage('SecondServe');
                            }
                        }
                        else if (data.x > 168 & data.x <= 215)
                        {
                            updateActiveRow('firstServeZone', 'T');
                            if (data.y >= 220 & data.y <= 470)
                            {
                                updateActiveRow('firstServeIn', '1');
                                if (data.table[data.table.length - 1]['isAce'] == '1') {
                                    ace(data.table[data.table.length - 1]['serverName']);
                                    if (serverScore == 0 && returnerScore == 0) {
                                        setCurrentPage('ServerName');
                                    }
                                    else {
                                        addNewRow();
                                    if (serverScore == 40 && returnerScore == 40) {
                                        setCurrentPage('PointScore');
                                    }
                                    else {
                                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                        updateActiveRow('isPointStart', 1);
                                        updateActiveRow('shotInRally', 1);
                                        updateActiveRow('side', chooseSide());
                                        setCurrentPage('FirstServe');  
                                    }   
                                }
                            }
                            else {
                                setCurrentPage('GroundstrokeContact');
                            }
                            }
                            else
                            {
                                updateActiveRow('firstServeIn', '0');
                                setCurrentPage('SecondServe');
                            }
                        }
                        else
                        {
                            updateActiveRow('firstServeIn', '0');
                            if (data.x > 215) 
                            {
                                updateActiveRow('firstServeZone', 'T');
                            }
                            else 
                            {
                                updateActiveRow('firstServeZone', 'Wide')
                            }
                            setCurrentPage('SecondServe');
                        }
                    }
            else // wide and T inverted for Ad side
                {  // Assuming coordinate range of x: 215-350, y: 220-470
                    if (data.x >= 215 & data.x < 260)
                    {
                        updateActiveRow('firstServeZone', 'T');
                        if (data.y >= 220 & data.y <= 470)
                        {
                            updateActiveRow('firstServeIn', '1');
                            if (data.table[data.table.length - 1]['isAce'] == '1') {
                                ace(data.table[data.table.length - 1]['serverName']);
                                if (serverScore == 0 && returnerScore == 0) {
                                    setCurrentPage('ServerName');
                                }
                                else {
                                    addNewRow();
                                if (serverScore == 40 && returnerScore == 40) {
                                    setCurrentPage('PointScore');
                                }
                                else {
                                    updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                    updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                    updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                    updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                    updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                    updateActiveRow('isPointStart', 1);
                                    updateActiveRow('shotInRally', 1);
                                    updateActiveRow('side', chooseSide());
                                    setCurrentPage('FirstServe');  
                                }   
                            }
                        }
                        else {
                            setCurrentPage('GroundstrokeContact');
                        }
                        }
                        else
                        {
                            updateActiveRow('firstServeIn', '0');
                            setCurrentPage('SecondServe');
                        }
                    }
                    else if (data.x >= 260 & data.x <= 305)
                    {
                        updateActiveRow('firstServeZone', 'Body');
                        if (data.y >= 220 & data.y <= 470)
                        {
                            updateActiveRow('firstServeIn', '1');
                            if (data.table[data.table.length - 1]['isAce'] == '1') {
                                ace(data.table[data.table.length - 1]['serverName']);
                                if (serverScore == 0 && returnerScore == 0) {
                                    setCurrentPage('ServerName');
                                }
                                else {
                                    addNewRow();
                                if (serverScore == 40 && returnerScore == 40) {
                                    setCurrentPage('PointScore');
                                }
                                else {
                                    updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                    updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                    updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                    updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                    updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                    updateActiveRow('isPointStart', 1);
                                    updateActiveRow('shotInRally', 1);
                                    updateActiveRow('side', chooseSide());
                                    setCurrentPage('FirstServe');  
                                }   
                            }
                        }
                        else {
                            setCurrentPage('GroundstrokeContact');
                        }
                        }
                        else
                        {
                            updateActiveRow('firstServeIn', '0');
                            setCurrentPage('SecondServe');
                        }
                    }
                    else if (data.x > 305 & data.x <= 350)
                    {
                        updateActiveRow('firstServeZone', 'Wide');
                        if (data.y >= 220 & data.y <= 470)
                        {
                            updateActiveRow('firstServeIn', '1');
                            if (data.table[data.table.length - 1]['isAce'] == '1') {
                                ace(data.table[data.table.length - 1]['serverName']);
                                if (serverScore == 0 && returnerScore == 0) {
                                    setCurrentPage('ServerName');
                                }
                                else {
                                    addNewRow();
                                if (serverScore == 40 && returnerScore == 40) {
                                    setCurrentPage('PointScore');
                                }
                                else {
                                    updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                    updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                    updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                    updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                    updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                    updateActiveRow('isPointStart', 1);
                                    updateActiveRow('shotInRally', 1);
                                    updateActiveRow('side', chooseSide());
                                    setCurrentPage('FirstServe');  
                                }   
                            }
                        }
                        else {
                            setCurrentPage('GroundstrokeContact');
                        }
                        }
                        else
                        {
                            updateActiveRow('firstServeIn', '0');
                            setCurrentPage('SecondServe');
                        }
                    }
                    else
                    {
                        updateActiveRow('firstServeIn', '0');
                        if (data.x > 215) 
                        {
                            updateActiveRow('firstServeZone', 'T');
                        }
                        else 
                        {
                            updateActiveRow('firstServeZone', 'Wide')
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
                    updateActiveRow('firstServeZone', 'Wide');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateActiveRow('firstServeIn', '1');
                        if (data.table[data.table.length - 1]['isAce'] == '1') {
                            ace(data.table[data.table.length - 1]['serverName']);
                            if (serverScore == 0 && returnerScore == 0) {
                                setCurrentPage('ServerName');
                            }
                            else {
                                addNewRow();
                            if (serverScore == 40 && returnerScore == 40) {
                                setCurrentPage('PointScore');
                            }
                            else {
                                updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                updateActiveRow('isPointStart', 1);
                                updateActiveRow('shotInRally', 1);
                                updateActiveRow('side', chooseSide());
                                setCurrentPage('FirstServe');  
                            }   
                        }
                    }
                    else {
                        setCurrentPage('GroundstrokeContact');
                    }
                    }
                    else
                    {
                        updateActiveRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else if (data.x >= 121 & data.x <= 168)
                {
                    updateActiveRow('firstServeZone', 'Body');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateActiveRow('firstServeIn', '1');
                        if (data.table[data.table.length - 1]['isAce'] == '1') {
                            ace(data.table[data.table.length - 1]['serverName']);
                            if (serverScore == 0 && returnerScore == 0) {
                                setCurrentPage('ServerName');
                            }
                            else {
                                addNewRow();
                            if (serverScore == 40 && returnerScore == 40) {
                                setCurrentPage('PointScore');
                            }
                            else {
                                updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                updateActiveRow('isPointStart', 1);
                                updateActiveRow('shotInRally', 1);
                                updateActiveRow('side', chooseSide());
                                setCurrentPage('FirstServe');  
                            }   
                        }
                    }
                    else {
                        setCurrentPage('GroundstrokeContact');
                    }
                    }
                    else
                    {
                        updateActiveRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else if (data.x > 168 & data.x <= 215)
                {
                    updateActiveRow('firstServeZone', 'T');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateActiveRow('firstServeIn', '1');
                        if (data.table[data.table.length - 1]['isAce'] == '1') {
                            ace(data.table[data.table.length - 1]['serverName']);
                            if (serverScore == 0 && returnerScore == 0) {
                                setCurrentPage('ServerName');
                            }
                            else {
                                addNewRow();
                            if (serverScore == 40 && returnerScore == 40) {
                                setCurrentPage('PointScore');
                            }
                            else {
                                updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                updateActiveRow('isPointStart', 1);
                                updateActiveRow('shotInRally', 1);
                                updateActiveRow('side', chooseSide());
                                setCurrentPage('FirstServe');  
                            }   
                        }
                    }
                    else {
                        setCurrentPage('GroundstrokeContact');
                    }
                    }
                    else
                    {
                        updateActiveRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else
                {
                    updateActiveRow('firstServeIn', '0');
                    if (data.x > 215) 
                    {
                        updateActiveRow('firstServeZone', 'T');
                    }
                    else 
                    {
                        updateActiveRow('firstServeZone', 'Wide')
                    }
                    setCurrentPage('SecondServe');
                }
            }
            else // wide and T inverted for Deuce side
            {  // Assuming coordinate range of x: 215-350, y: 470-723
                if (data.x >= 215 & data.x < 260)
                {
                    updateActiveRow('firstServeZone', 'T');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateActiveRow('firstServeIn', '1');
                        if (data.table[data.table.length - 1]['isAce'] == '1') {
                            ace(data.table[data.table.length - 1]['serverName']);
                            if (serverScore == 0 && returnerScore == 0) {
                                setCurrentPage('ServerName');
                            }
                            else {
                                addNewRow();
                            if (serverScore == 40 && returnerScore == 40) {
                                setCurrentPage('PointScore');
                            }
                            else {
                                updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                updateActiveRow('isPointStart', 1);
                                updateActiveRow('shotInRally', 1);
                                updateActiveRow('side', chooseSide());
                                setCurrentPage('FirstServe');  
                            }   
                        }
                    }
                    else {
                        setCurrentPage('GroundstrokeContact');
                    }
                    }
                    else
                    {
                        updateActiveRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else if (data.x >= 260 & data.x <= 305)
                {
                    updateActiveRow('firstServeZone', 'Body');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateActiveRow('firstServeIn', '1');
                        if (data.table[data.table.length - 1]['isAce'] == '1') {
                            ace(data.table[data.table.length - 1]['serverName']);
                            if (serverScore == 0 && returnerScore == 0) {
                                setCurrentPage('ServerName');
                            }
                            else {
                                addNewRow();
                            if (serverScore == 40 && returnerScore == 40) {
                                setCurrentPage('PointScore');
                            }
                            else {
                                updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                updateActiveRow('isPointStart', 1);
                                updateActiveRow('shotInRally', 1);
                                updateActiveRow('side', chooseSide());
                                setCurrentPage('FirstServe');  
                            }   
                        }
                    }
                    else {
                        setCurrentPage('GroundstrokeContact');
                    }
                    }
                    else
                    {
                        updateActiveRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else if (data.x > 305 & data.x <= 350)
                {
                    updateActiveRow('firstServeZone', 'Wide');
                    if (data.y >= 470 & data.y <= 723)
                    {
                        updateActiveRow('firstServeIn', '1');
                        if (data.table[data.table.length - 1]['isAce'] == '1') {
                            ace(data.table[data.table.length - 1]['serverName']);
                            if (serverScore == 0 && returnerScore == 0) {
                                setCurrentPage('ServerName');
                            }
                            else {
                                addNewRow();
                            if (serverScore == 40 && returnerScore == 40) {
                                setCurrentPage('PointScore');
                            }
                            else {
                                updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                                updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                                updateActiveRow('isPointStart', 1);
                                updateActiveRow('shotInRally', 1);
                                updateActiveRow('side', chooseSide());
                                setCurrentPage('FirstServe');  
                            }   
                        }
                    }
                    else {
                        setCurrentPage('GroundstrokeContact');
                    }
                    }
                    else
                    {
                        updateActiveRow('firstServeIn', '0');
                        setCurrentPage('SecondServe');
                    }
                }
                else
                {
                    updateActiveRow('firstServeIn', '0');
                    if (data.x >= 215 & data.x < 260) 
                    {
                        updateActiveRow('firstServeZone', 'T');
                    }
                    else 
                    {
                        updateActiveRow('firstServeZone', 'Wide')
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
            updateActiveRow('secondServeXCoord', data.x);
            updateActiveRow('secondServeYCoord', data.y);
            // Depending on coordinates, fill location of serve, etc...
            if (data.table[data.table.length - 1]['serverFarNear'] == 'Near') {
            if ((data.table[data.table.length - 1])['side'] == 'Deuce') // split by side
            {
                // Assuming coordinate range of x: 75 -215, y: 220-470
            if (data.x >= 75 & data.x < 121)
            {
                updateActiveRow('secondServeZone', 'Wide');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x >= 121 & data.x <= 168)
            {
                updateActiveRow('secondServeZone', 'Body');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x > 168 & data.x <= 215)
            {
                updateActiveRow('secondServeZone', 'T');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else
            {
                updateActiveRow('secondServeIn', '0');
                if (data.x > 215) 
                {
                    updateActiveRow('secondServeZone', 'T');
                }
                else 
                {
                    updateActiveRow('secondServeZone', 'Wide')
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
                    updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                    updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                    updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                    updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                    updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                    updateActiveRow('isPointStart', 1);
                    updateActiveRow('shotInRally', 1);
                    updateActiveRow('side', chooseSide());
                    setCurrentPage('FirstServe');  
                }   
            }
            }
        }
        else // wide and T inverted for Ad side
        {  // Assuming coordinate range of x: 215-350, y: 220-470
            if (data.x >= 215 & data.x < 260)
            {
                updateActiveRow('secondServeZone', 'T');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x >= 260 & data.x <= 305)
            {
                updateActiveRow('secondServeZone', 'Body');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x > 305 & data.x <= 350)
            {
                updateActiveRow('secondServeZone', 'Wide');
                if (data.y >= 220 & data.y <= 470)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else
            {
                updateActiveRow('secondServeIn', '0');
                if (data.x > 215) 
                {
                    updateActiveRow('secondServeZone', 'T');
                }
                else 
                {
                    updateActiveRow('secondServeZone', 'Wide')
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
                    updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                    updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                    updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                    updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                    updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                    updateActiveRow('isPointStart', 1);
                    updateActiveRow('shotInRally', 1);
                    updateActiveRow('side', chooseSide());
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
                updateActiveRow('secondServeZone', 'Wide');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x >= 121 & data.x <= 168)
            {
                updateActiveRow('secondServeZone', 'Body');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x > 168 & data.x <= 215)
            {
                updateActiveRow('secondServeZone', 'T');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else
            {
                updateActiveRow('secondServeIn', '0');
                if (data.x > 215) 
                {
                    updateActiveRow('secondServeZone', 'T');
                }
                else 
                {
                    updateActiveRow('secondServeZone', 'Wide')
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
                    updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                    updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                    updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                    updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                    updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                    updateActiveRow('isPointStart', 1);
                    updateActiveRow('shotInRally', 1);
                    updateActiveRow('side', chooseSide());
                    setCurrentPage('FirstServe');  
                }   
            }
            }
        }
        else // wide and T inverted for Deuce side
        {  // Assuming coordinate range of x: 215-350, y: 470-723
            if (data.x >= 215 & data.x < 260)
            {
                updateActiveRow('secondServeZone', 'T');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x >= 260 & data.x <= 305)
            {
                updateActiveRow('secondServeZone', 'Body');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else if (data.x > 305 & data.x <= 350)
            {
                updateActiveRow('secondServeZone', 'Wide');
                if (data.y >= 470 & data.y <= 723)
                {
                    updateActiveRow('secondServeIn', '1');
                    setCurrentPage('GroundstrokeContact');
                }
                else
                {
                    updateActiveRow('secondServeIn', '0');
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
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                        updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                }
                }
            }
            else
            {
                updateActiveRow('secondServeIn', '0');
                if (data.x >= 215 & data.x <= 260) 
                {
                    updateActiveRow('secondServeZone', 'T');
                }
                else 
                {
                    updateActiveRow('secondServeZone', 'Wide')
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
                updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                updateActiveRow('gameScore', player1GameScore + '-' + player2GameScore);
                updateActiveRow('setScore', player1SetScore + '-' + player2SetScore);
                updateActiveRow('isPointStart', 1);
                updateActiveRow('shotInRally', 1);
                updateActiveRow('side', chooseSide());
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
                updateActiveRow('shotContactX', data.x);
                updateActiveRow('shotContactY', data.y);
                updateActiveRow('shotInRally', parseInt(data.table[data.table.length - 1]['shotInRally']) + 1);
                // Need to copy down: pointScore, gameScore, setScore, serverName, serverSide
                updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                updateActiveRow('pointScore', data.table[data.table.length - 1]['pointScore']);
                updateActiveRow('gameScore', data.table[data.table.length - 1]['gameScore']);
                updateActiveRow('setScore', data.table[data.table.length - 1]['setScore']);
                updateActiveRow('tiebreakScore', data.table[data.table.length - 1]['tiebreakScore']);
                updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                if (data.y < 471) 
                { // assuming 470 is halfway point
                    if (data.x < 215) 
                    {
                        updateActiveRow('side', 'Deuce');
                        setCurrentPage('GroundstrokeShotInfo')
                    }
                    else
                    {
                        updateActiveRow('side', 'Ad');
                        setCurrentPage('GroundstrokeShotInfo')
                    }
                }
                else
                {
                    if (data.x < 215) 
                    {
                        updateActiveRow('side', 'Ad');
                        setCurrentPage('GroundstrokeShotInfo')
                    }
                    else
                    {
                        updateActiveRow('side', 'Deuce');
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
                updateActiveRow('shotFhBh', 'Forehand');
                setCurrentPage('GroundstrokeLocation');
            }
        },
        {
            label: 'Backhand',
            action: () => {
                updateActiveRow('shotFhBh', 'Backhand');
                setCurrentPage('GroundstrokeLocation');
            }
        },

    ],
    'GroundstrokeLocation': [
        {
            label: 'Slice',
            action: () => {
                updateActiveRow('isSlice', '1');
            }
        },
        {
            label: 'Dropshot',
            action: () => {
                updateActiveRow('isDropshot', '1');
            }
        },
        {
            label: 'Approach',
            action: () => {
                updateActiveRow('isApproach', '1');
            }
        },
        {
            label: 'Volley',
            action: () => {
                updateActiveRow('isVolley', '1');
            }
        },
        {
            label: 'Overhead',
            action: () => {
                updateActiveRow('isOverhead', '1');
            }
        },
        {
            label: 'Lob',
            action: () => {
                updateActiveRow('isLob', '1');
            }
        },
        {
            label: 'Player1AtNet',
            action: () => {
                updateActiveRow('atNetPlayer1', '1');
            }
        },
        {
            label: 'Player2AtNet',
            action: () => {
                updateActiveRow('atNetPlayer2', '1');
            }
        },
        {
            label: 'Winner',
            action: () => {
                updateActiveRow('isWinner', '1');
                updateActiveRow('isPointEnd', '1');
            }
        },
        {
            label: 'ErrorWideLeft',
            action: () => {
                updateActiveRow('isErrorWideL', '1');
                updateActiveRow('isPointEnd', '1');
            }
        },
        {
            label: 'ErrorWideRight',
            action: () => {
                updateActiveRow('isErrorWideR', '1');
                updateActiveRow('isPointEnd', '1');
            }
        },
        {
            label: 'ErrorLong',
            action: () => {
                updateActiveRow('isErrorLong', '1');
                updateActiveRow('isPointEnd', '1');
            }
        },
        {
            label: 'ErrorNet',
            action: () => {
                updateActiveRow('isErrorNet', '1');
                updateActiveRow('isPointEnd', '1');
            }
        },
        {
            courtImage: true,
            label: 'Select Shot Result Location',
            action: (data) => {
                updateActiveRow('shotLocationX', data.x);
                updateActiveRow('shotLocationY', data.y);
                // assuming 215 is halfway point
                if (data.x > 215 & data.table[data.table.length - 1]["shotContactX"] > 215) {
                    updateActiveRow('shotDirection', "Down the Line");
                }
                else if (data.x <= 215 & data.table[data.table.length - 1]["shotContactX"] > 215) {
                    updateActiveRow('shotDirection', "Crosscourt");
                }
                else if (data.x > 215 & data.table[data.table.length - 1]["shotContactX"] <= 215) {
                    updateActiveRow('shotDirection', "Crosscourt");
                }
                else {
                    updateActiveRow('shotDirection', "Down the Line");
                }
                if (data.table[data.table.length - 1]["isPointEnd"] == '1') {
                    serverScore =  parseInt(data.table[data.table.length - 1]['pointScore'].split("-")[0]);
                    returnerScore =  parseInt(data.table[data.table.length - 1]['pointScore'].split("-")[1]);
                    player1GameScore =  parseInt(data.table[data.table.length - 1]['gameScore'].split("-")[0]);
                    player2GameScore = parseInt(data.table[data.table.length - 1]['gameScore'].split("-")[1]); 
                    player1SetScore =  parseInt(data.table[data.table.length - 1]['setScore'].split("-")[0]);
                    player2SetScore = parseInt(data.table[data.table.length - 1]['setScore'].split("-")[1]);
                    if (player1GameScore == 6 && player2GameScore == 6) {
                        player1TiebreakScore = parseInt(data.table[data.table.length - 1]['tiebreakScore'].split("-")[0]);
                        player2TiebreakScore = parseInt(data.table[data.table.length - 1]['tiebreakScore'].split("-")[1]);
                        updateTiebreakScore(parseInt(data.table[data.table.length - 1]["shotInRally"]), 
                        data.table[data.table.length - 1]["isWinner"], 
                        data.table[data.table.length - 1]["serverName"]);
                        if (player1TiebreakScore >= 7 && (player1TiebreakScore - player2TiebreakScore) >= 2 ) {
                            player1SetScore += 1;
                            player1GameScore = 0;
                            player2GameScore = 0;
                            player1TiebreakScore = 0;
                            player2TiebreakScore = 0;
                            setCurrentPage('ServerName');
                        }
                        else if (player2TiebreakScore >= 7 && (player2TiebreakScore - player1TiebreakScore) >= 2 ) {
                            player1SetScore += 1;
                            player1GameScore = 0;
                            player2GameScore = 0;
                            player1TiebreakScore = 0;
                            player2TiebreakScore = 0;
                            setCurrentPage('ServerName');
                        }
                        else {
                            updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                            updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                            updateActiveRow('tiebreakScore', player1TiebreakScore + '-' + player2TiebreakScore);
                            updateActiveRow('gameScore', data.table[data.table.length - 1]['gameScore']);
                            updateActiveRow('setScore', data.table[data.table.length - 1]['setScore']);
                            updateActiveRow('isPointStart', 1);
                            updateActiveRow('shotInRally', 1);
                            updateActiveRow('side', chooseSide());
                            setCurrentPage('FirstServe');
                        }
                    }   
                    else {
                        updateScore(parseInt(data.table[data.table.length - 1]["shotInRally"]), 
                        data.table[data.table.length - 1]["isWinner"], 
                        data.table[data.table.length - 1]["serverName"]);
                    if (serverScore == 0 && returnerScore == 0) {
                        if (player1GameScore >= 6) {
                         if (player1GameScore - player2GameScore >= 2) {
                            player1SetScore += 1;
                            player1GameScore = 0;
                            player2GameScore = 0;
                         }
                        }
                        else if (player2GameScore >= 6) {
                            if (player2GameScore - player1GameScore >= 2) {
                               player2SetScore += 1;
                               player2GameScore = 0;
                               player1GameScore = 0;
                            }                
                        }
                        setCurrentPage('ServerName');
                    }
                    else {
                        addNewRow();
                    if (serverScore == 40 && returnerScore == 40) {
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName'])
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear'])
                        setCurrentPage('PointScore');
                    }
                    else {
                        updateActiveRow('serverFarNear', data.table[data.table.length - 1]['serverFarNear']);
                        updateActiveRow('serverName', data.table[data.table.length - 1]['serverName']);
                        updateActiveRow('pointScore', serverScore + '-' + returnerScore);
                        updateActiveRow('gameScore', data.table[data.table.length - 1]['gameScore']);
                        updateActiveRow('setScore', data.table[data.table.length - 1]['setScore']);
                        updateActiveRow('isPointStart', 1);
                        updateActiveRow('shotInRally', 1);
                        updateActiveRow('side', chooseSide());
                        setCurrentPage('FirstServe');  
                    }   
                    }
                }
            }
                else 
                {
                    setCurrentPage('GroundstrokeContact');
                }
            
        }
            
        },
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