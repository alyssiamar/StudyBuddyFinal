// src/index.js (React 18+)
import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct for React 18+
import './index.css'; // Make sure you have the correct path for your styles
import App from './App';

// Create root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root')); // Create a root with 'root' element
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);