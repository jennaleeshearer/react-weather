import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Weather from './Weather';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Weather />
  </React.StrictMode>
);