import React from 'react';
import './Sidebar.css';
import logo from '../assets/Logo (1).png'; 

function Sidebar({ backgroundColor }) {
  return (
    <div className="sidebar" style={{ backgroundColor }}>
      <div className="logo">
      <img src={logo} alt="Logo" />
        {/* <h2>Spotify</h2> */}
      </div>
      <div className="profile">
        <img src="https://images.ctfassets.net/hrltx12pl8hq/2ppk3Ug2z6oFMZY5z8WXnx/75af41f13939954c93de0ff8c1972612/shutterstock_1922207966.jpg?fit=fill&w=120&h=120&fm=webp" alt="Profile" className="profile-image" />
      </div>
    </div>
  );
}

export default Sidebar;
