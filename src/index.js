import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Router
} from 'react-router-dom';
import './css/index.css';
import reportWebVitals from './pubjs/reportWebVitals';
import MainRouter from './router.js';

ReactDOM.render(
  <MainRouter />,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();