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

export const getTaggerButtonData = (updateActiveRow, addNewRow, setCurrentPage) => ({
    'PointScore': [
        {
            label: '0-0',
            action: (data) => {
                updateActiveRow('pointScore', '0-0');
                setCurrentPage('FirstServeResult');
                console.log(data.table[data.table.length - 1]); // logs the last row of the table
            }
        },
        {
            label: 'add new row',
            action: (data) => {
                addNewRow();
                setCurrentPage('PointScore');
                console.log(data.table[data.table.length - 1]);
            }
        },
        {
            label: '15-0',
            action: () => {
                updateActiveRow('pointScore', '15-0');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-0',
            action: () => {
                updateActiveRow('pointScore', '30-0');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-0',
            action: () => {
                updateActiveRow('pointScore', '40-0');
                setCurrentPage('FirstServeResult');
            }
        },
        // Add additional buttons based on the image
        {
            label: '0-15',
            action: () => {
                updateActiveRow('pointScore', '0-15');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-15',
            action: () => {
                updateActiveRow('pointScore', '15-15');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-15',
            action: () => {
                updateActiveRow('pointScore', '30-15');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-15',
            action: () => {
                updateActiveRow('pointScore', '40-15');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '0-30',
            action: () => {
                updateActiveRow('pointScore', '0-30');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-30',
            action: () => {
                updateActiveRow('pointScore', '15-30');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-30',
            action: () => {
                updateActiveRow('pointScore', '30-30');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-30',
            action: () => {
                updateActiveRow('pointScore', '40-30');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '0-40',
            action: () => {
                updateActiveRow('pointScore', '0-40');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-40',
            action: () => {
                updateActiveRow('pointScore', '15-40');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-40',
            action: () => {
                updateActiveRow('pointScore', '30-40');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-40 (Ad Side)',
            action: () => {
                updateActiveRow('pointScore', 'Ad');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-40 (Deuce Side)',
            action: () => {
                updateActiveRow('pointScore', 'Deuce');
                setCurrentPage('CourtImage');
            }
        },
    ],

    'CourtImage': [
        {
            courtImage: true,
            label: 'Select First Serve Position',
            action: (data) => {
                updateActiveRow('firstServeXCoord', data.x);
                updateActiveRow('firstServeYCoord', data.y);
                setCurrentPage('FirstServeResult');
            }
        },
    ],

    'FirstServeResult': [
        {
            label: 'In',
            action: () => {
                updateActiveRow('firstServeIn', '1');
                setCurrentPage('FirstServeZone');
            }
        },
        {
            label: 'Fault',
            action: () => {
                updateActiveRow('firstServeIn', '0');
                setCurrentPage('FirstServeZone');
            }
        },
    ],

    'FirstServeZone': [
        {
            label: 'T',
            action: () => {
                updateActiveRow('firstServeZone', 'T');
                // setCurrentPage('SecondServeResult');
            }
        },
        {
            label: 'Wide',
            action: () => {
                updateActiveRow('firstServeZone', 'Wide');
                // setCurrentPage('SecondServeResult');
            }
        },
        {
            label: 'Body',
            action: () => {
                updateActiveRow('firstServeZone', 'Body');
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
    'shotTime',
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
    'shotType',
    'isSlice',
    'isVolley',
    'isOverhead',
    'isApproach',
    'isDropshot',
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
    'Round',
    'Surface',
    'Notes',
];