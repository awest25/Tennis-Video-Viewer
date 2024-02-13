import React, { useState, useEffect } from 'react';

const TennisButtons = ({buttonVal,buttonName,onClick}) => {
    const [val, setVal] = useState(buttonVal);
    
    const handleClick = () => {
        onClick(buttonVal);
    };
    


    // Style object for the buttons
    const buttonStyle = {
        backgroundColor: '#0FADF7', // Cerulean blue color
        color: 'white', // White text color
        borderRadius: '10px', // Rounded corners
        padding: '10px 20px', // Some padding
        margin: '5px', // Margin between buttons
        border: 'none', // No border
        cursor: 'pointer', // Cursor pointer on hover
        fontSize: '16px' // Font size
    };

    return (
        <div>
            <button style={buttonStyle} onClick={handleClick}>{buttonName}</button>
        </div>
    );
}

export default TennisButtons;
