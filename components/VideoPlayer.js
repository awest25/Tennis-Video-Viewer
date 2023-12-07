// components/VideoPlayer.js

import React from 'react';

const VideoPlayer = ({ videoSrc }) => {
    return (
        <div>
            <video width="100%" controls>
                <source src={videoSrc} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}

export default VideoPlayer;
