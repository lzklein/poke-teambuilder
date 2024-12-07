import React, { useEffect, useState } from 'react';
import Missingno from '../assets/missingno.png';

// todo hover select change color dynamically to pokemon main type
const Pokecard = ({ pokemon, url }) => {
  const [selectedMon, setSelectedMon] = useState('');
  const [pokeData, setPokeData] = useState(null);
  const [shiny, setShiny] = useState(false);
  
  useEffect(() => {
    if (!selectedMon) return;
    fetch(`${url}/pokemon/${selectedMon}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        return response.json();
      })
      .then((data) => {
        setPokeData(data);
        setShiny(false);
      })
      .catch((error) => console.error('Error fetching Pokémon data:', error));
  }, [selectedMon, url]);

  const handleSelect = (e) => {
    setSelectedMon(e.target.value);
  };

  const handleShiny = () => {
    setShiny(!shiny);
  }

  console.log(pokeData);

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
      <div className='columns'>
        <img
          src={pokeData ? shiny ? pokeData.sprites.front_shiny: pokeData.sprites.front_default : Missingno}
          alt={Missingno}
          className='pokemonImage'
          onClick={handleShiny}
        />
      </div>

    </div>
  );
};

export default Pokecard;
