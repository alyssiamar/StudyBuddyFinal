// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
// import Chatbot from './components/Chatbot';
// import StudyMusic from './components/StudyMusic';
// import StudyRoom from './components/StudyRoom';
// import './MyApp.css';

// export default function MyApp() {
//   return (
//     <Router>
//       <div className="app-container">
//         <Sidebar />
//         <div className="main-content">
//           <Routes>
//             <Route path="/" element={<h1>Home Page</h1>} />
//             <Route path="/playlists" element={<StudyMusic />} />
//             <Route path="/rooms" element={<StudyRoom />} />
//           </Routes>
//         </div>
//         <Chatbot />
//       </div>
//     </Router>
//   );
// }
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chatbot from './components/Chatbot'; // Only for the homepage
import StudyMusic from './components/StudyMusic';
import StudyRoom from './components/StudyRoom';
import HomePage from './components/HomePage'; // Default homepage
import './MyApp.css';

export default function MyApp() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            {/* Default homepage with chatbot and original content */}
            <Route
              path="/"
              element={
                <div>
                  <HomePage />
                  <Chatbot />
                </div>
              }
            />
            {/* Study Music page with a unique layout */}
            <Route path="/playlists" element={<StudyMusic />} />
            {/* Study Room page with a unique layout */}
            <Route path="/rooms" element={<StudyRoom />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}



