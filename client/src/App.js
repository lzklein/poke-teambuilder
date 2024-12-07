import './App.css';
import React, { useState, useEffect } from 'react';

// import components
import Home from './components/home.js';

const API_BASE_URL = 'https://pokeapi.co/api/v2/';

function App() {
  useEffect(() => {
    fetch(`${API_BASE_URL}/pokemon?limit=10000&offset=0`)
      .then(r => r.json())
      .then(data => {
        const names = data.results.map(mon => mon.name); // Extract only the names
        setPokemon(names); // Store the names in the state
      })      
      .catch(err => console.error("Error fetching Pokemon data:", err)); // Handle errors
  }, []);

  const [pokemon, setPokemon] = useState([]);

  console.log(pokemon);

  return (
    <div className="App">
      <Home pokemon={pokemon} url={API_BASE_URL}/>
    </div>
  );
}

export default App;
