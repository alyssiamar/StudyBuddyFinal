// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import MyApp from './MyApp';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <MyApp />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client'; // Make sure you’re using createRoot
import MyApp from './MyApp';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyApp />
  </React.StrictMode>
);

