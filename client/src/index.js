import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import './App.css';

ReactDOM.render(<AuthProvider><App /></AuthProvider>,document.getElementById('root'));

//Wrapping the AuthProvider around the children which is App
