import React, { useEffect, useRef } from 'react';
import { useAudio } from '../context/AudioContext';

const GlobalAudioEngine = () => {
    const { registerControls, updatePlayerState } = useAudio();
    const playerRef = useRef(null);
    const PLAYLIST_ID = 'PLdopaBPe4-jlgTgsolJdF7nwBCJqap4CB';

    useEffect(() => {
        // Check if API script is already loaded
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        }

        // Initialize player when API is ready
        const initPlayer = () => {
            // Avoid re-initialization
            if (playerRef.current) return;

            playerRef.current = new window.YT.Player('global-audio-player', {
                height: '0',
                width: '0',
                playerVars: {
                    listType: 'playlist',
                    list: PLAYLIST_ID,
                    autoplay: 0,
                    controls: 0,
                    disablekb: 1,
                    fs: 0,
                    modestbranding: 1
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        };

        if (window.YT && window.YT.Player) {
            initPlayer();
        } else {
            window.onYouTubeIframeAPIReady = initPlayer;
        }

        return () => {
            // Optional: Cleanup if ever unmounted (unlikely for global engine)
            // window.onYouTubeIframeAPIReady = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onPlayerReady = (event) => {
        // Register controls with context
        // Register controls with context
        registerControls({
            play: () => event.target.playVideo(),
            pause: () => event.target.pauseVideo(),
            next: () => event.target.nextVideo(),
            prev: () => event.target.previousVideo(),
            seek: (seconds) => event.target.seekTo(seconds, true), // seconds
            loadPlaylist: (playlistId) => {
                if (event.target && event.target.loadPlaylist) {
                    event.target.loadPlaylist({
                        list: playlistId,
                        listType: 'playlist'
                    });
                    // Update active playlist in context can be done here or triggered by consumer.
                    // Since context updates are decoupled, consumer (AudioVault) usually updates context state.
                }
            }
        });

        event.target.setVolume(70);

        // Update initial state
        updatePlayerState({ isReady: true });

        const data = event.target.getVideoData();
        if (data && data.title) {
            updatePlayerState({ currentTrack: data.title });
        }
    };

    const onPlayerStateChange = (event) => {
        // YT.PlayerState.PLAYING = 1, PAUSED = 2, ENDED = 0, BUFFERING = 3
        const isPlaying = event.data === window.YT.PlayerState.PLAYING;
        updatePlayerState({ isPlaying });

        if (isPlaying) {
            const data = event.target.getVideoData();
            if (data && data.title) {
                updatePlayerState({ currentTrack: data.title });
            }
        }
    };

    return (
        <div
            id="global-audio-player"
            style={{ position: 'absolute', top: '-9999px', left: '-9999px', visibility: 'hidden' }}
        ></div>
    );
};

export default GlobalAudioEngine;
