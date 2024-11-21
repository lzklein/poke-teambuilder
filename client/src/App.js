import './App.css';
import React, { useState, useEffect } from 'react';

// import components
import Home from './components/home.js';

const API_URL = 'https://pokeapi.co/api/v2/';

function App() {
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
