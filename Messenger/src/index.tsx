import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'
import './index.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./Redux/Store";
import { BrowserRouter } from 'react-router-dom';
import {Provider} from "react-redux";
import { StrictMode } from 'react';

ReactDOM.render(
  <App/>, document.getElementById('root')
);

reportWebVitals();
