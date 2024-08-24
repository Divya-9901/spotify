import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SongList.css';

// Import images from the assets/icons directory
import songImage1 from '../assets/icons/song1.png';
import songImage2 from '../assets/icons/song2.png';
import songImage3 from '../assets/icons/song3.png';
import songImage4 from '../assets/icons/song4.png';
import songImage5 from '../assets/icons/song5.png';
import songImage6 from '../assets/icons/song6.png';
import songImage7 from '../assets/icons/song7.png';
import songImage8 from '../assets/icons/song8.png';

function SongList({ onSongSelect }) {
  const [songs, setSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#282828'); // Default background color

  // Define the songImages array here, within the component scope
  const songImages = [
    songImage1, songImage2, songImage3, 
    songImage4, songImage5, songImage6, 
    songImage7, songImage8
  ];

  useEffect(() => {
    axios.get('https://cms.samespace.com/items/songs')
      .then(response => {
        setSongs(response.data.data); // Access the 'data' property from the response
        setFilteredSongs(response.data.data); // Initialize filtered songs with all songs
      })
      .catch(error => {
        console.error('Error fetching songs:', error);
      });
  }, []);

  // Function to format duration from seconds to mm:ss
  const formatDuration = (duration) => {
    if (isNaN(duration) || duration === null) {
      return '00:00'; // Return a default value if duration is invalid
    }

    const durationInSeconds = Number(duration); // Ensure it's a number
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  // Function to handle song selection
  const handleSongSelect = (song, image) => {
    onSongSelect({ ...song, image }); // Pass the song details along with the image to the Player component
    setBackgroundColor(song.accent || '#282828'); // Change background color based on song accent
  };

  // Function to handle search
  const handleSearch = () => {
    const results = songs.filter(song =>
      song.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSongs(results);
  };

  // Function to handle pressing Enter in the search box
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="song-list" style={{ backgroundColor }}>
      <div className="header">
        <h3 className="for-you">For You</h3>
        <h3 className="top-tracks">Top Tracks</h3>
      </div>
      <div className="search-container">
        <div className="search-box-wrapper">
          <input
            type="text"
            placeholder="Search song, artist"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress} // Call search when Enter is pressed
            className="search-box"
          />
          <i 
            className="fas fa-search search-icon" 
            onClick={handleSearch} // Call search when the icon is clicked
          ></i>
        </div>
      </div>
      {Array.isArray(filteredSongs) && filteredSongs.length > 0 ? (
        filteredSongs.map((song, index) => (
          <div 
            key={song.id} 
            onClick={() => handleSongSelect(song, songImages[index % songImages.length])} // Pass the image when a song is selected
            className="song-item"
          >
            <img 
              src={songImages[index % songImages.length]} // Map the song to its respective image
              alt={song.name}
              className="song-image"
            />
            <div className="song-info">
              <div className="song-name">{song.name}</div>
              <div className="song-artist">{song.artist}</div>
            </div>
            <div className="song-duration">
              {formatDuration(song.duration)} {/* Display the formatted duration */}
            </div>
          </div>
        ))
      ) : (
        <p>No songs available</p>
      )}
    </div>
  );
}

export default SongList;
