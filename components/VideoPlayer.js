// components/VideoPlayer.js

import React from 'react';

function VideoPlayer({ videoURL, videoRef }) {
    if (videoURL === '') {
        return null;
    }

    return (
        <iframe 
                ref={videoRef} 
                width="560" 
                height="315" 
                src={videoURL + '?enablejsapi=1'} 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen>
        </iframe>
    );
}

export default VideoPlayer;