import React from 'react';
import '../styles/StudyMusic.css'; // Optional custom styles

export default function StudyMusic() {
  return (
    <div className="study-music-page">
      <h1>Your Study Playlist Hub</h1>
      <div className="playlist-container">
        <div className="playlist-card">Lo-fi Beats</div>
        <div className="playlist-card">Classical Music</div>
        <div className="playlist-card">Nature Sounds</div>
      </div>
    </div>
  );
}

