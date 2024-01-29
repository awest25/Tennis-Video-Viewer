/* Usage:
    This is a JSON object that has the names of pages as keys and arrays of buttons as values.
    Each button has a label and an action.
    The labels are displayed on the buttons.
    The actions are provided by the parent component (tag-match.js) and are passed to this component.
        - updateTable: to the last row, adds a value (second argument) to the column name (first argument)
        - setCurrentPage: updates the currentPage to the page specified in the argument

        updateTable('pointScore', '0-0'); // sets the pointScore column to '0-0' for the last row
        setCurrentPage('FirstServeResult'); // sets the currentPage to 'FirstServeResult'
*/

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