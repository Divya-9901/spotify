import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import SongList from './components/SongList';
import './App.css';

function App() {
  const [currentSong, setCurrentSong] = useState(null);
  const [backgroundColor, setBackgroundColor] = useState('#282828');

  const handleSongSelect = (song) => {
    setCurrentSong(song); // Update the current song
    setBackgroundColor(song.accent || '#282828'); // Change background color based on song accent
  };

  return (
    <Router>
      <div className="app" style={{ backgroundColor }}>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={<SongList onSongSelect={handleSongSelect} />} 
            />
          </Routes>
        </div>
        <Player currentSong={currentSong} />
      </div>
    </Router>
  );
}

export default App;
