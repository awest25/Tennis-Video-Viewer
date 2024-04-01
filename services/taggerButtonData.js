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

export const getTaggerButtonData = (updateLastRow, addNewRow, setCurrentPage) => ({
    //added SetScore
    'SetScore': [
        {
            label: '0-0',
            action: () => {
                addNewRow();
                updateTable('setScore', '0-0');
                setCurrentPage('GameScore');
            }
        },
        {
            label: '0-1',
            action: () => {
                addNewRow();
                updateTable('setScore', '0-1');
                setCurrentPage('GameScore');
            }
        },
        {
            label: '0-2',
            action: () => {
                addNewRow();
                updateTable('setScore', '0-2');
                setCurrentPage('GameScore');
            }
        },
        {
            label: '1-0',
            action: () => {
                addNewRow();
                updateTable('setScore', '1-0');
                setCurrentPage('GameScore');
            }
        },
        {
            label: '1-1',
            action: () => {
                addNewRow();
                updateTable('setScore', '1-1');
                setCurrentPage('GameScore');
            }
        },
        {
            label: '1-2',
            action: () => {
                addNewRow();
                updateTable('setScore', '1-2');
                setCurrentPage('GameScore');
            }
        },
        {
            label: '2-0',
            action: () => {
                addNewRow();
                updateTable('setScore', '2-0');
                setCurrentPage('GameScore');
            }
        },
        {
            label: '2-1',
            action: () => {
                addNewRow();
                updateTable('setScore', '2-1');
                setCurrentPage('GameScore');
            }
        },
        ],
    // added GameScore
    'GameScore': [
        {
            label: '0-0',
            action: () => {
                updateTable('gameScore', '0-0');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '0-1',
            action: () => {
                updateTable('gameScore', '0-1');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '0-2',
            action: () => {
                updateTable('gameScore', '0-2');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '0-3',
            action: () => {
                updateTable('gameScore', '0-3');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '0-4',
            action: () => {
                updateTable('gameScore', '0-4');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '0-5',
            action: () => {
                updateTable('gameScore', '0-5');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '0-6',
            action: () => {
                updateTable('gameScore', '0-6');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '1-0',
            action: () => {
                updateTable('gameScore', '1-0');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '1-1',
            action: () => {
                updateTable('gameScore', '1-1');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '1-2',
            action: () => {
                updateTable('gameScore', '1-2');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '1-3',
            action: () => {
                updateTable('gameScore', '1-3');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '1-4',
            action: () => {
                updateTable('gameScore', '1-4');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '1-5',
            action: () => {
                updateTable('gameScore', '1-5');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '1-6',
            action: () => {
                updateTable('gameScore', '1-6');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '2-0',
            action: () => {
                updateTable('gameScore', '2-0');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '2-1',
            action: () => {
                updateTable('gameScore', '2-1');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '2-2',
            action: () => {
                updateTable('gameScore', '2-2');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '2-3',
            action: () => {
                updateTable('gameScore', '2-3');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '2-4',
            action: () => {
                updateTable('gameScore', '2-4');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '2-5',
            action: () => {
                updateTable('gameScore', '2-5');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '2-6',
            action: () => {
                updateTable('gameScore', '2-6');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '3-0',
            action: () => {
                updateTable('gameScore', '3-0');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '3-1',
            action: () => {
                updateTable('gameScore', '3-1');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '3-2',
            action: () => {
                updateTable('gameScore', '3-2');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '3-3',
            action: () => {
                updateTable('gameScore', '3-3');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '3-4',
            action: () => {
                updateTable('gameScore', '3-4');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '3-5',
            action: () => {
                updateTable('gameScore', '3-5');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '3-6',
            action: () => {
                updateTable('gameScore', '3-6');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '4-0',
            action: () => {
                updateTable('gameScore', '4-0');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '4-1',
            action: () => {
                updateTable('gameScore', '4-1');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '4-2',
            action: () => {
                updateTable('gameScore', '4-2');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '4-3',
            action: () => {
                updateTable('gameScore', '4-3');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '4-4',
            action: () => {
                updateTable('gameScore', '4-4');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '4-5',
            action: () => {
                updateTable('gameScore', '4-5');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '4-6',
            action: () => {
                updateTable('gameScore', '4-6');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '5-0',
            action: () => {
                updateTable('gameScore', '5-0');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '5-1',
            action: () => {
                updateTable('gameScore', '5-1');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '5-2',
            action: () => {
                updateTable('gameScore', '5-2');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '5-3',
            action: () => {
                updateTable('gameScore', '5-3');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '5-4',
            action: () => {
                updateTable('gameScore', '5-4');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '5-5',
            action: () => {
                updateTable('gameScore', '5-5');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '5-6',
            action: () => {
                updateTable('gameScore', '5-6');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '5-7',
            action: () => {
                updateTable('gameScore', '5-7');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '6-0',
            action: () => {
                updateTable('gameScore', '6-0');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '6-1',
            action: () => {
                updateTable('gameScore', '6-1');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '6-2',
            action: () => {
                updateTable('gameScore', '6-2');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '6-3',
            action: () => {
                updateTable('gameScore', '6-3');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '6-4',
            action: () => {
                updateTable('gameScore', '6-4');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '6-5',
            action: () => {
                updateTable('gameScore', '6-5');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '6-6',
            action: () => {
                updateTable('gameScore', '6-6');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '6-7',
            action: () => {
                updateTable('gameScore', '6-7');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '7-5',
            action: () => {
                updateTable('gameScore', '7-5');
                setCurrentPage('ServerName');
            }
        },
        {
            label: '7-6',
            action: () => {
                updateTable('gameScore', '7-6');
                setCurrentPage('ServerName');
            }
        },
        
    ],
    'serverName': [
        {
            label: 'Player1',
            action: () => {
                updateTable('serverName', 'Player1');
                setCurrentPage('pointScore')
            }
        },
        {
            label: 'Player2',
            action: () => {
                updateTable('serverName', 'Player2');
                setCurrentPage('pointScore')
            }
        },
    ],
    'PointScore': [
        {
            label: '0-0',
            action: (data) => {
                updateLastRow('pointScore', '0-0');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Deuce');
                setCurrentPage('FirstServeResult');
                console.log(data.table[data.table.length - 1]); // logs the last row of the table
            }
        },
        {
            label: '15-0',
            action: () => {
                updateLastRow('pointScore', '15-0');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-0',
            action: () => {
                updateLastRow('pointScore', '30-0');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Deuce');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-0',
            action: () => {
                updateLastRow('pointScore', '40-0');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                setCurrentPage('FirstServeResult');
            }
        },
        // Add additional buttons based on the image
        {
            label: '0-15',
            action: () => {
                updateLastRow('pointScore', '0-15');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-15',
            action: () => {
                updateLastRow('pointScore', '15-15');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Deuce');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-15',
            action: () => {
                updateLastRow('pointScore', '30-15');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-15',
            action: () => {
                updateLastRow('pointScore', '40-15');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Deuce');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '0-30',
            action: () => {
                updateLastRow('pointScore', '0-30');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Deuce');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-30',
            action: () => {
                updateLastRow('pointScore', '15-30');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-30',
            action: () => {
                updateLastRow('pointScore', '30-30');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Deuce');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-30',
            action: () => {
                updateLastRow('pointScore', '40-30');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '0-40',
            action: () => {
                updateLastRow('pointScore', '0-40');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                updateTable('isBreakPoint', 1);
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-40',
            action: () => {
                updateLastRow('pointScore', '15-40');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Deuce');
                updateTable('isBreakPoint', 1);
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-40',
            action: () => {
                updateLastRow('pointScore', '30-40');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                updateTable('isBreakPoint', 1);
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-40 (Ad Side)',
            action: () => {
                updateLastRow('pointScore', 'Ad');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Ad');
                updateTable('isBreakPoint', 1);
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-40 (Deuce Side)',
            action: () => {
                updateLastRow('pointScore', 'Deuce');
                updateTable('isPointStart', 1);
                updateTable('shotInRally', 1);
                updateTable('Side', 'Deuce');
                updateTable('isBreakPoint', 1);
                setCurrentPage('CourtImage');
            }
        },
    ],

    'CourtImage': [
        {
            courtImage: true,
            label: 'Select First Serve Position',
            action: (data) => {
                updateLastRow('firstServeXCoord', data.x);
                updateLastRow('firstServeYCoord', data.y);
                setCurrentPage('FirstServeResult');
            }
        },
    ],

    'FirstServeResult': [
        {
            label: 'In',
            action: () => {
                updateLastRow('firstServeIn', '1');
                setCurrentPage('FirstServeZone');
            }
        },
        {
            label: 'Fault',
            action: () => {
                updateLastRow('firstServeIn', '0');
                setCurrentPage('FirstServeZone');
            }
        },
    ],

    'FirstServeZone': [
        {
            label: 'T',
            action: () => {
                updateLastRow('firstServeZone', 'T');
                // setCurrentPage('SecondServeResult');
            }
        },
        {
            label: 'Wide',
            action: () => {
                updateLastRow('firstServeZone', 'Wide');
                // setCurrentPage('SecondServeResult');
            }
        },
        {
            label: 'Body',
            action: () => {
                updateLastRow('firstServeZone', 'Body');
                // setCurrentPage('SecondServeResult');
            }
        },
    ],
    // ...other pages
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
    'firstServeIn',
    'firstServeZone',
    'firstServeXCoord',
    'firstServeYCoord',
    'secondServeIn',
    'secondServeZone',
    'secondServeXCoord',
    'secondServeYCoord',
    'isAce',
    'returnContactX',
    'returnContactY',
    'returnPlacementX',
    'returnPlacementY',
    'shotContactX',
    'shotContactY',
    'shotDirection',
    'shotFhBh',
    'shotType',
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
    'opponentTeam',
    'player1Name',
    'player2Name',
    'player1Hand',
    'player2Hand',
    'Round',
    'Surface',
    'Notes',
];