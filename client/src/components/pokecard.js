import React, { useEffect, useState } from 'react';
import Missingno from '../assets/missingno.png';

const Pokecard = ({ pokemon, url }) => {
  const [selectedMon, setSelectedMon] = useState('');
  const [pokeData, setPokeData] = useState(null);
  const [shiny, setShiny] = useState(false);
  const [selectedMoves, setSelectedMoves] = useState(['', '', '', '']);
  const [selectedAbility, setSelectedAbility] = useState('');

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
        setSelectedMoves(['', '', '', '']);
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

  console.log(pokeData);

  return (
    <div className="pokecardContainer">
      {/* Pokémon Selector Dropdown */}
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

      {/* Pokémon Image and Ability (Left Column) */}
      <div className="columns">
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

          {/* Ability Dropdown with same class names as Moves */}
          {pokeData?.abilities && (
            <div className="moveDropdownContainer">
              <h4 className="moveDropdownTitle">Ability:</h4>
              <div className="moveDropdown">
                <select
                  value={selectedAbility}
                  onChange={(e) => handleAbility(e.target.value)}
                  className="moveSelect"
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

        {/* Moves (Right Column) */}
        <div className="right-column">
          {pokeData?.moves && (
            <div className="moveDropdownContainer">
              <h4 className="moveDropdownTitle">Moves:</h4>
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
                            isMoveDisabled(moveName) && selectedMove !== moveName
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
  );
};

export default Pokecard;
