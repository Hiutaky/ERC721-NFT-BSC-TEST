import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Drizzle } from "@drizzle/store";
import NFTmint from "./contracts/NFTmint.json";

const options = {
  contracts: [NFTmint],
  web: {
    fallback: {
      type: "ws",
      url: "https://data-seed-prebsc-1-s1.binance.org:8545"
    }
  }
}

const drizzle = new Drizzle(options);

/*ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);*/

ReactDOM.render(
  <App drizzle={drizzle} />, document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
