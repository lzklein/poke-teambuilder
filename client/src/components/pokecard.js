import React, { useEffect, useState } from 'react';
import Missingno from '../assets/missingno.png';

// todo MAYBE multicolor 50-50 for duo type pokemon (big stretch might be ugly)
const Pokecard = ({ pokemon, url }) => {
  const [selectedMon, setSelectedMon] = useState('');
  const [pokeData, setPokeData] = useState(null);
  const [shiny, setShiny] = useState(false);
  const [selectedMoves, setSelectedMoves] = useState(['', '', '', '']);
  const [selectedAbility, setSelectedAbility] = useState('');
  const [pokemonType, setPokemonType] = useState('');

  useEffect(() => {
    if (!selectedMon) return;
    fetch(`${url}pokemon/${selectedMon.toLowerCase()}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch Pokémon data');
        }
        return response.json();
      })
      .then((data) => {
        setPokeData(data);
        setShiny(false);
        setSelectedMoves(['', '', '', '']);
        setPokemonType(data.types[0]?.type?.name);
      })
      .catch((error) => console.error('Error fetching Pokémon data:', error));
  }, [selectedMon, url]);

  const handleSelect = (e) => {
    setSelectedMon(e.target.value);
  };

  const handleAbility = (e) => {
    setSelectedAbility(e);
  };

  const handleShiny = () => {
    setShiny(!shiny);
  };

  const handleMoveChange = (index, value) => {
    const updatedMoves = [...selectedMoves];
    updatedMoves[index] = value;
    setSelectedMoves(updatedMoves);
  };

  const isMoveDisabled = (moveName) => {
    return selectedMoves.includes(moveName);
  };

  const typeClassName = pokemonType
    ? pokemonType.toLowerCase() // Convert to lowercase to match the class name
    : 'normal';


  console.log(pokeData);
  console.log(pokeData?.types[0].type.name);


if(!pokeData){
  return(
    <div className="pokecardContainer">
      <div className="selectContainer">
        <select
          defaultValue=""
          onChange={handleSelect}
          className="selectDropdown"
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
        <span className="selectArrow">▼</span>
      </div>

      {/* Main Box: Pokémon Details */}
      <div className="detailsContainer">
        {/* Left Column */}
        <div className="left-column">
          <img
            src={
              pokeData
                ? shiny
                  ? pokeData.sprites.front_shiny
                  : pokeData.sprites.front_default
                : Missingno
            }
            alt="Pokémon"
            className="pokemonImage"
            onClick={handleShiny}
          />

          {/* Ability Dropdown */}
            <div className="moveDropdownContainer">
              <div className="moveDropdown">
                <select
                  value={selectedAbility}
                  onChange={(e) => handleAbility(e.target.value)}
                  className="moveSelect"
                  style={{ width: '96px' }}
                >
                  <option value="" disabled>
                    Abilities
                  </option>
                </select>
                <span className="moveArrow">▼</span>
              </div>
            </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="moveBox">
              <div className="moveDropdownContainer">
                {selectedMoves.map((selectedMove, index) => (
                  <div key={index} className="moveDropdown">
                    <select
                      value={selectedMove}
                      onChange={(e) => handleMoveChange(index, e.target.value)}
                      className="moveSelect"
                    >
                      <option value="" disabled>
                        Move {index + 1}
                      </option>
                    </select>
                    <span className="moveArrow">▼</span>
                  </div>
                ))}
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

  return (
    <div className={`pokecardContainer ${typeClassName}`}>
      {/* Pokémon Selector Dropdown */}
      <div className="selectContainer">
        <select
          defaultValue=""
          onChange={handleSelect}
          className={`selectDropdown ${typeClassName}`}
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
        <span className="selectArrow">▼</span>
      </div>

      {/* Main Box: Pokémon Details */}
      <div className="detailsContainer">
        {/* Left Column */}
        <div className="left-column">
          <img
            src={
              pokeData
                ? shiny
                  ? pokeData.sprites.front_shiny
                  : pokeData.sprites.front_default
                : Missingno
            }
            alt="Pokémon"
            className="pokemonImage"
            onClick={handleShiny}
          />

          {/* Ability Dropdown */}
          {pokeData?.abilities && (
            <div className="moveDropdownContainer">
              <div className="moveDropdown">
                <select
                  value={selectedAbility}
                  onChange={(e) => handleAbility(e.target.value)}
                  className="moveSelect"
                  style={{ width: '96px' }}
                >
                  <option value="" disabled>
                    Abilities
                  </option>
                  {pokeData.abilities.map((abilityObj) => {
                    const abilityName = abilityObj.ability.name;
                    return (
                      <option key={abilityName} value={abilityName}>
                        {abilityName}
                      </option>
                    );
                  })}
                </select>
                <span className="moveArrow">▼</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="moveBox">
            {pokeData?.moves && (
              <div className="moveDropdownContainer">
                {selectedMoves.map((selectedMove, index) => (
                  <div key={index} className="moveDropdown">
                    <select
                      value={selectedMove}
                      onChange={(e) => handleMoveChange(index, e.target.value)}
                      className="moveSelect"
                    >
                      <option value="" disabled>
                        Move {index + 1}
                      </option>
                      {pokeData.moves.map((moveObj) => {
                        const moveName = moveObj.move.name;
                        return (
                          <option
                            key={moveName}
                            value={moveName}
                            disabled={
                              isMoveDisabled(moveName) &&
                              selectedMove !== moveName
                            }
                          >
                            {moveName}
                          </option>
                        );
                      })}
                    </select>
                    <span className="moveArrow">▼</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pokecard;
