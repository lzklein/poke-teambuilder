import React, {useEffect, useState} from 'react';
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

  console.log(pokeData);

  return (
    <div>
      <select defaultValue="" onChange={handleSelect}>
        <option value={selectedMon} disabled>
          Select a Pokémon
        </option>
        {pokemon.map((mon) => (
          <option key={mon.id} value={mon.name}>
            {mon}
          </option>
        ))}
      </select>
      <img src={pokeData?pokeData.sprites.front_default:Missingno} style={{maxWidth:'96px', maxHeight:'96px'}}/>
    </div>
  );
};

export default Pokecard;
