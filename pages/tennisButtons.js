import React from 'react';

function TennisButtons() {
    // Functions to handle button clicks (you can customize these)
    const handleMensTennisClick = () => {
        console.log('UCLA Men\'s Tennis button clicked');
        // Add your logic here
    };

    const handleWomensTennisClick = () => {
        console.log('UCLA Women\'s Tennis button clicked');
        // Add your logic here
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
            <button style={buttonStyle} onClick={handleMensTennisClick}>UCLA Men's Tennis</button>
            <button style={buttonStyle} onClick={handleWomensTennisClick}>UCLA Women's Tennis</button>
        </div>
    );
}

export default TennisButtons;
