import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './styles/index.scss';
import { MMS } from './components/MMS.js'
import { BrowserRouter as Router } from "react-router-dom"

ReactDOM.render(
  <React.StrictMode>
    <Router forceRefresh={true}>
      <MMS/>
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
