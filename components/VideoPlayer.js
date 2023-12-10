// components/VideoPlayer.js

import React from 'react';

function VideoPlayer({ videoURL, videoRef, handleTimeUpdate }) {
  return (
    <video ref={videoRef} onTimeUpdate={handleTimeUpdate} width="100%" controls>
      <source src={videoURL} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

export default VideoPlayer;