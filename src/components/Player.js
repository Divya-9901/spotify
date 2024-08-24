import React, { useEffect, useRef, useState } from 'react';
import './Player.css';
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaVolumeUp, FaVolumeMute, FaEllipsisH } from 'react-icons/fa';

// Import images from the images folder
import cover from '../assets/Cover (1).png';
import cover1 from '../assets/Cover.png';
import defaultCoverImage from '../assets/Cover.png';

function Player({ currentSong, onNext, onPrevious }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  // Map song names to images
  const songImageMap = {
    'Song Name 1': cover,
    'Song Name 2': cover1,
    // Add more mappings as needed
  };

  useEffect(() => {
    if (currentSong) {
      const audio = audioRef.current;
      audio.load(); 
      audio.play(); 
      setIsPlaying(true);
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const newVolume = e.target.value;
    audio.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (isMuted) {
      audio.volume = volume;
    } else {
      audio.volume = 0;
    }
    setIsMuted(!isMuted);
  };

  return (
    <div className="player">
      {currentSong ? (
        <>
          <div className='info'>
            <p className='name'>{currentSong.name}</p>
            <p className='artist'>{currentSong.artist}</p>
          </div>
          <img 
            // src={songImageMap[currentSong.name] || currentSong.image || defaultCoverImage} 
            src={defaultCoverImage}
            className="player-image" 
            alt={currentSong.name}
          />
          <audio id="audio-player" ref={audioRef}>
            <source src={currentSong.url} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <div className="controls">
            <button className="more-options-btn">
              <FaEllipsisH />
            </button>
            <button onClick={onPrevious} className="control-btn">
              <FaStepBackward />
            </button>
            <button onClick={handlePlayPause} className="control-btn">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={onNext} className="control-btn">
              <FaStepForward />
            </button>
            <div className="volume-container">
              <button onClick={toggleMute} className="volume-btn">
                {isMuted ? <FaVolumeMute className="volume-icon" /> : <FaVolumeUp className="volume-icon" />}
              </button>
            </div>
          </div>
        </>
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
}

export default Player;
