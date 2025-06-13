import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import our main App component
import './styles/global.css'; // Import global CSS for basic styling

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);