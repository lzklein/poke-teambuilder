import React, { useEffect, useState } from 'react';
import Missingno from '../assets/missingno.png';

const Pokecard = ({ pokemon, url, setTeamData, ind, setTeamStats, setTypeCounts, setMoveTypes, selectedCardData, cardDataButtonPressed }) => {
  const [selectedMon, setSelectedMon] = useState('');
  const [pokeData, setPokeData] = useState(null);
  const [shiny, setShiny] = useState(false);
  const [selectedMoves, setSelectedMoves] = useState(['', '', '', '']);
  const [selectedMoveTypes, setSelectedMoveTypes] = useState(['','','','']);
  const [selectedAbility, setSelectedAbility] = useState('');
  const [pokemonType, setPokemonType] = useState('');

  // ! pokemon forms and regionals show as "bulbasaur" something to do with " " and "-" in the name
  useEffect(()=>{
    if(cardDataButtonPressed && ind===selectedCardData.index){
      if(!!selectedCardData){
        setSelectedMon(selectedCardData.name.replace(/\b\w/g, char => char.toUpperCase()));
      }
    }
  },[selectedCardData, ind, cardDataButtonPressed])

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
        setSelectedMoveTypes(['', '', '', '']);
        setPokemonType(data.types[0]?.type?.name);
        setMoveTypes((prevMoveTypes) => {
          const updatedTypes = { ...prevMoveTypes };
          selectedMoveTypes.forEach((moveType) => {
            if (moveType) {
              updatedTypes[moveType] = Math.max(0, (updatedTypes[moveType] || 0) - 1);
            }
          });
          return updatedTypes;
        });
      })
      .catch((error) => console.error('Error fetching Pokémon data:', error));
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMon, url]);

  useEffect(() => {
    setTeamData(prevData => {
      const dataCopy = [...prevData]; 
      dataCopy[ind] = [selectedAbility, ...selectedMoves];
      return dataCopy;
    });
  }, [selectedAbility, selectedMoves, ind, setTeamData]);
  
  useEffect(() => {
    if (!pokeData) return;
  
    const updateTypeCounts = () => {
      setTypeCounts((prevCounts) => {
        const newCounts = { ...prevCounts };
    
        // dual type check
        if (pokeData.types.length === 2) {
          newCounts[ind] = `${pokeData.types[0].type.name} ${pokeData.types[1].type.name}`;
        } else {
          newCounts[ind] = pokeData.types[0].type.name;
        }
    
        return newCounts;
      });
    };
    
    setTeamStats(prevData => {
      const dataCopy = [...prevData];
      dataCopy[ind] = pokeData.stats.map(stat => stat.base_stat);
      return dataCopy;
    });
  
    updateTypeCounts(pokeData.types.map(mon => mon.type.name));
  
  }, [pokeData, ind, setTeamStats, setTypeCounts]); 

  const handleSelect = (e) => {
    setSelectedMon(e.target.value);
  };

  const handleAbility = (ability) => {
    setSelectedAbility(ability);
  };

  const handleShiny = () => {
    setShiny(!shiny);
  };

  const handleMoveChange = async (index, newMove) => {
    const previousMove = selectedMoves[index];
    if (previousMove) {
      // Remove the previous move's type from moveTypes
      updateMoveTypes(previousMove, "remove");
    }
  
    try {
      const response = await fetch(`${url}move/${newMove.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch move data");
      }
      const data = await response.json();
      const moveType = data.type.name;
      const moveCategory = data.damage_class.name;
  
      // Handle status moves (ignore their types)
      if (moveCategory === "status") {
        const updatedTypes = [...selectedMoveTypes];
        updatedTypes[index] = '';
        setSelectedMoveTypes(updatedTypes);
      } else {
        const updatedTypes = [...selectedMoveTypes];
        updatedTypes[index] = moveType;
        setSelectedMoveTypes(updatedTypes);
  
        // Add the new move's type to moveTypes (only if it's not already present)
        updateMoveTypes(newMove, "add");
      }
    } catch (error) {
      console.error("Error fetching move data:", error);
    }
  
    const updatedMoves = [...selectedMoves];
    updatedMoves[index] = newMove;
    setSelectedMoves(updatedMoves);
  };

  const formatMoveName = (moveName) => {
    const exceptionMoves = ["u-turn", "double-edge", "will-o-wisp", "x-scissor", "v-create", "soft-boiled"];
    
    // only move using both hyphen and space
    if (moveName === "wake-up-slap") return "Wake-Up Slap";

    // actual hypen names
    if (exceptionMoves.includes(moveName)) {
      return moveName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('-');
    }

    // replace - with space for normal move names
    return moveName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const isMoveDisabled = (moveName) => {
    return selectedMoves.includes(moveName);
  };

  const updateMoveTypes = async (moveName, action) => {
    if (!moveName) return;
  
    try {
      const response = await fetch(`${url}move/${moveName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error("Failed to fetch move data");
      }
      const data = await response.json();
      const moveType = data.type.name;
      const moveCategory = data.damage_class.name;
  
      // Ignore status moves as we only care about attacking moves' types
      if (moveCategory === "status") {
        return;
      }
  
      // Prevent adding duplicate move types
      setMoveTypes((prevMoveTypes) => {
        const updatedTypes = { ...prevMoveTypes };
  
        // Check if the type is already in selectedMoveTypes
        if (selectedMoveTypes.includes(moveType)) {
          return prevMoveTypes; // Return the previous state without updating
        }
  
        if (action === "add") {
          updatedTypes[moveType] = (updatedTypes[moveType] || 0) + 1;
        } else if (action === "remove") {
          updatedTypes[moveType] = Math.max(0, updatedTypes[moveType] - 1);
        }
        return updatedTypes;
      });
  
    } catch (error) {
      console.error("Error fetching move data:", error);
    }
  };
  

  const typeClassName = pokemonType ? pokemonType.toLowerCase() : 'normal';

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
                    disabled
                  >
                    <option value="" disabled>
                      Abilities
                    </option>
                  </select>
                  {/* <span className="moveArrow">▼</span> */}
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
                        disabled
                      >
                        <option value="" disabled>
                          Move {index + 1}
                        </option>
                      </select>
                      {/* <span className="moveArrow">▼</span> */}
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
          value={selectedMon || ""}
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
        {/* <span className="selectArrow">▼</span> */}
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
                {/* <span className="moveArrow">▼</span> */}
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
                            disabled={isMoveDisabled(moveName) && selectedMove !== moveName}
                          >
                            {formatMoveName(moveName)}
                          </option>
                        );
                      })}
                    </select>
                    {/* <span className="moveArrow">▼</span> */}
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
