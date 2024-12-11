import React, { useEffect, useState } from 'react';
import Missingno from '../assets/missingno.png';

const Pokecard = ({ pokemon, url, setTeamData, ind, setTeamStats, setTypeCounts }) => {
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

  useEffect(() => {
    setTeamData(prevData => {
      const dataCopy = [...prevData]; 
      dataCopy[ind] = [selectedAbility, ...selectedMoves];
      return dataCopy;
    });
  }, [selectedAbility, selectedMoves]);
  
  useEffect(() => {
    if (!pokeData) return;
  
    setTeamStats(prevData => {
      const dataCopy = [...prevData];
      dataCopy[ind] = pokeData.stats.map(stat => stat.base_stat);
      return dataCopy;
    });

    updateTypeCounts(pokeData.types.map(mon => mon.type.name));

  }, [pokeData]);

  const handleSelect = (e) => {
    setSelectedMon(e.target.value);
  };

  const handleAbility = (ability) => {
    setSelectedAbility(ability);
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

  const updateTypeCounts = (pokemonTypes, increment = true) => {
    setTypeCounts((prevCounts) => {
      const newCounts = { ...prevCounts };
      for (const type of pokemonTypes) {
        newCounts[type] = increment
          ? (newCounts[type] || 0) + 1
          : Math.max(0, (newCounts[type] || 0) - 1);
      }
      return newCounts;
    });
  };
  

  const typeClassName = pokemonType ? pokemonType.toLowerCase() : 'normal';

  console.log(pokeData)
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
