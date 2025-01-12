// src/index.js (React 18 and later)

import React from 'react';
import ReactDOM from 'react-dom/client';  // Correct for React 18+
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // Correct for React 18+
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
