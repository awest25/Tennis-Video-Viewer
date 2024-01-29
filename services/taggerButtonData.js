/* ======== Usage: =========

The 'getTaggerButtonData' function generates a JSON object used for creating a dynamic user interface with buttons. This object maps page names to arrays of button objects, each defined with specific properties and actions.

Structure:
- Each button object has a 'label' property, which specifies the text to be displayed on the button.
- The 'action' property of each button is a function that handles all logic for the button and can call the following functions (passed from tag-match.js) in any amount/order:
  - 'updateTable': This action adds a value to a specified column in the last row of the table. The column name is the first argument, and the value to add is the second argument.
  - 'setCurrentPage': This action updates the 'currentPage' state with the name of the page passed as an argument.

For images it's a little different:
    - To bring in a court image, the following property must be set: { courtImage: true }
    - The label sits above the image
    - The action takes a data argument
    - The x coordinate is stored in: data.x
    - The y coordinate is sotred in: data.y
You can then use this x and y coordinate to update the table.

For example, if the coordinates are really high, you know the serve was long, and you write the logic to record it:
if (data.y > 800) {
    updateTable('isErrorLong', '1'); // sets the isErrorLong column to '1' for the last row
}

Other examples:
updateTable('pointScore', '0-0'); // sets the pointScore column to '0-0' for the last row
setCurrentPage('FirstServeResult'); // sets the currentPage to 'FirstServeResult'

======== Developed by Alex West ======== */

export const getTaggerButtonData = (updateTable, setCurrentPage) => ({
    'PointScore': [
        {
            label: '0-0',
            action: () => {
                updateTable('pointScore', '0-0');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-0',
            action: () => {
                updateTable('pointScore', '15-0');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-0',
            action: () => {
                updateTable('pointScore', '30-0');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-0',
            action: () => {
                updateTable('pointScore', '40-0');
                setCurrentPage('FirstServeResult');
            }
        },
        // Add additional buttons based on the image
        {
            label: '0-15',
            action: () => {
                updateTable('pointScore', '0-15');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-15',
            action: () => {
                updateTable('pointScore', '15-15');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-15',
            action: () => {
                updateTable('pointScore', '30-15');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-15',
            action: () => {
                updateTable('pointScore', '40-15');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '0-30',
            action: () => {
                updateTable('pointScore', '0-30');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-30',
            action: () => {
                updateTable('pointScore', '15-30');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-30',
            action: () => {
                updateTable('pointScore', '30-30');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-30',
            action: () => {
                updateTable('pointScore', '40-30');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '0-40',
            action: () => {
                updateTable('pointScore', '0-40');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '15-40',
            action: () => {
                updateTable('pointScore', '15-40');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '30-40',
            action: () => {
                updateTable('pointScore', '30-40');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-40 (Ad Side)',
            action: () => {
                updateTable('pointScore', 'Ad');
                setCurrentPage('FirstServeResult');
            }
        },
        {
            label: '40-40 (Deuce Side)',
            action: () => {
                updateTable('pointScore', 'Deuce');
                setCurrentPage('CourtImage');
            }
        },
    ],

    'CourtImage': [
        {
            courtImage: true,
            label: 'Select First Serve Position',
            action: (data) => {
                updateTable('firstServeXCoord', data.x);
                updateTable('firstServeYCoord', data.y);
                setCurrentPage('FirstServeResult');
            }
        },
    ],

    'FirstServeResult': [
        {
            label: 'In',
            action: () => {
                updateTable('firstServeIn', '1');
                setCurrentPage('FirstServeZone');
            }
        },
        {
            label: 'Fault',
            action: () => {
                updateTable('firstServeIn', '0');
                setCurrentPage('FirstServeZone');
            }
        },
    ],

    'FirstServeZone': [
        {
            label: 'T',
            action: () => {
                updateTable('firstServeZone', 'T');
                // setCurrentPage('SecondServeResult');
            }
        },
        {
            label: 'Wide',
            action: () => {
                updateTable('firstServeZone', 'Wide');
                // setCurrentPage('SecondServeResult');
            }
        },
        {
            label: 'Body',
            action: () => {
                updateTable('firstServeZone', 'Body');
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