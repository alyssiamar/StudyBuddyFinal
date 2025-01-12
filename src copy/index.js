import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you’re using createRoot
import MyApp from './MyApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);

