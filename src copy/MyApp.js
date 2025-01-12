
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import StudyMusic from './components/StudyMusic';

import StudyRoom from './components/StudyRoom';
import ToDoList from './components/ToDoList';
import './MyApp.css';
import PomodoroTimer from './components/PomodoroTimer';
import { SpotifyMusic } from './components/StudyMusic';  // Import SpotifyMusic
import FlowtimeTimer from './components/FlowtimeTimer';
import SpotifyConnect from './components/SpotifyConnect';  // Import from the new file



export default function MyApp() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
            <Routes>
              <Route path="/" element={<div><ToDoList className ="todo-list-main" /></div>}/>
              <Route path="/playlists" element={<div><ToDoList className ="right-aligned-todo" /> <StudyMusic /></div>} />
              <Route path = "/pomodoro" element ={<div><ToDoList className ="right-aligned-todo" /> <PomodoroTimer /></div>}/>
              <Route path = "/flowtime" element ={<div><ToDoList className ="right-aligned-todo" /> <FlowtimeTimer /></div>}/>
              <Route path = "/rooms" element ={<div><ToDoList className ="right-aligned-todo" /> <StudyRoom /></div>}/>
              <Route path="/tasks" element={<ToDoList />} />
              <Route path="/spotify-connect" element={<SpotifyConnect />} />


            </Routes>
          {/* </div> */}
        </div>
      </div>
    </Router>
  );
}




