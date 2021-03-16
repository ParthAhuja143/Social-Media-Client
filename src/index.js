import React from 'react';
import ReactDOM from 'react-dom';
import Apolloprovider from './Apolloprovider.js';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './utils/context.js';

ReactDOM.render(
  <AuthProvider>
    <Apolloprovider/> 
    </AuthProvider>   ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
