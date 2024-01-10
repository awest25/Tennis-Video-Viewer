import React, { useEffect, useRef } from 'react';

function VideoPlayer({ videoId, setVideoObject }) {
    const playerRef = useRef(null);

    useEffect(() => {
        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName('script')[0];
        if (!window.YT) { // Check if YT is already loaded
            // Load the script
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }        

        const onPlayerReady = (event) => {
            // Player is ready
        };

        const initializePlayer = () => {
            playerRef.current = new window.YT.Player('player', {
                videoId: videoId,
                events: {
                    'onReady': onPlayerReady
                }
            });
            setVideoObject(playerRef.current);
        };

        // Only set this once
        if (!window.onYouTubeIframeAPIReady) {
            window.onYouTubeIframeAPIReady = initializePlayer;
        }

        return () => {
            // Clean up the player
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        if (playerRef.current && playerRef.current.loadVideoById) {
            playerRef.current.loadVideoById(videoId);
        }
    }, [videoId]);

    return <div id="player"></div>;
}

export default VideoPlayer;
