import './App.css';
import React, { useState, useEffect } from 'react';

// import components
import Home from './components/home.js';

const API_BASE_URL = 'https://pokeapi.co/api/v2/';

function App() {
  useEffect(() => {
    fetch(`${API_BASE_URL}/pokemon?limit=10000&offset=0`)
      .then(r => r.json())
      .then(data => setPokemon(data.results)) // Correctly handle the data structure
      .catch(err => console.error("Error fetching Pokemon data:", err)); // Handle errors
  }, []);

  const [pokemon, setPokemon] = useState([]);

  pokemon.map((mon)=>{console.log(mon.name)});
  
  return (
    <div className="App">
      <Home/>
    </div>
  );
}

export default App;
