import React, { useEffect, useState } from 'react';
import Missingno from '../assets/missingno.png';

const Pokecard = ({ pokemon, url }) => {
  const [selectedMon, setSelectedMon] = useState('');
  const [pokeData, setPokeData] = useState(null);

  useEffect(() => {
    if (!selectedMon) return;
    fetch(`${url}/pokemon/${selectedMon}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        return response.json();
      })
      .then((data) => setPokeData(data))
      .catch((error) => console.error('Error fetching Pokémon data:', error));
  }, [selectedMon, url]);

  const handleSelect = (e) => {
    setSelectedMon(e.target.value);
  };

  return (
    <div className='pokecardContainer'>
      <div className='selectContainer'>
        <select
          defaultValue=""
          onChange={handleSelect}
          className='selectDropdown'
        >
          <option value="" disabled>
            Select a Pokémon
          </option>
          {pokemon.map((mon) => (
            <option key={mon} value={mon}>
              {mon}
            </option>
          ))}
        </select>
        <span className='selectArrow'>▼</span>
      </div>
      <img
        src={pokeData ? pokeData.sprites.front_default : Missingno}
        alt={Missingno}
        className='pokemonImage'
      />
    </div>
  );
};

export default Pokecard;
