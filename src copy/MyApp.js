
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StudyMusic from './components/StudyMusic';
import StudyRoom from './components/StudyRoom';
import ToDoList from './components/ToDoList';
import './MyApp.css';

export default function MyApp() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
            <Routes>
            <Route
              path="/"
              element={
                <div>
                  <ToDoList /> 
                </div>
              }
            />
              <Route path="/playlists" element={<StudyMusic />} />
              <Route path="/rooms" element={<StudyRoom />} />
            </Routes>
          {/* </div> */}
        </div>
      </div>
    </Router>
  );
}




