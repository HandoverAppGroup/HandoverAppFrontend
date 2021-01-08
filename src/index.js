import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './axiosConfig';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';


// Render App component
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

