import React, { useEffect, useState, useMemo } from 'react';

const Weakness = ({ typeCounts }) => {
  const types = useMemo(()=> [
    "normal", "fire", "water", "electric", "grass", "ice", 
    "fighting", "poison", "ground", "flying", "psychic", "bug", 
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ],[]);

  const typeWeakness = useMemo(()=>  ({
    normal: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 0, dragon: 1, dark: 1, steel: 1, fairy: 1 },
    fire: { normal: 1, fire: 0.5, water: 2, electric: 1, grass: 0.5, ice: 0.5, fighting: 1, poison: 1, ground: 2, flying: 1, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 0.5 },
    water: { normal: 1, fire: 0.5, water: 0.5, electric: 2, grass: 2, ice: 0.5, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
    grass: { normal: 1, fire: 2, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, fighting: 1, poison: 2, ground: 0.5, flying: 2, psychic: 1, bug: 2, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1 },
    electric: { normal: 1, fire: 1, water: 0.5, electric: 0.5, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 2, flying: 0.5, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 0.5, fairy: 1 },
    ice: { normal: 1, fire: 2, water: 1, electric: 1, grass: 1, ice: 0.5, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1 },
    fighting: { normal: 0.5, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 1, poison: 1, ground: 1, flying: 2, psychic: 2, bug: 0.5, rock: 0.5, ghost: 1, dragon: 1, dark: 0.5, steel: 0.5, fairy: 2 },
    poison: { normal: 1, fire: 1, water: 1, electric: 1, grass: 0.5, ice: 1, fighting: 0.5, poison: 0.5, ground: 2, flying: 1, psychic: 2, bug: 0.5, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 0.5 },
    ground: { normal: 1, fire: 1, water: 2, electric: 0, grass: 2, ice: 2, fighting: 1, poison: 0.5, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 0.5, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1 },
    flying: { normal: 1, fire: 1, water: 1, electric: 2, grass: 0.5, ice: 2, fighting: 0.5, poison: 1, ground: 0, flying: 1, psychic: 1, bug: 0.5, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1 },
    psychic: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 1, ground: 1, flying: 1, psychic: 0.5, bug: 2, rock: 1, ghost: 2, dragon: 1, dark: 2, steel: 1, fairy: 1 },
    bug: { normal: 1, fire: 2, water: 1, electric: 1, grass: 0.5, ice: 1, fighting: 0.5, poison: 1, ground: 0.5, flying: 2, psychic: 1, bug: 1, rock: 2, ghost: 1, dragon: 1, dark: 1, steel: 1, fairy: 1 },
    rock: { normal: 0.5, fire: 0.5, water: 2, electric: 1, grass: 2, ice: 1, fighting: 2, poison: 0.5, ground: 2, flying: 0.5, psychic: 1, bug: 0.5, rock: 1, ghost: 1, dragon: 1, dark: 1, steel: 2, fairy: 1 },
    ghost: { normal: 0, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 2, dragon: 1, dark: 2, steel: 1, fairy: 1 },
    dragon: { normal: 1, fire: 0.5, water: 0.5, electric: 0.5, grass: 0.5, ice: 2, fighting: 1, poison: 1, ground: 1, flying: 1, psychic: 1, bug: 1, rock: 1, ghost: 1, dragon: 2, dark: 1, steel: 0.5, fairy: 2 },
    dark: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 2, poison: 1, ground: 1, flying: 1, psychic: 0, bug: 2, rock: 1, ghost: 0.5, dragon: 1, dark: 0.5, steel: 1, fairy: 2 },
    steel: { normal: 0.5, fire: 2, water: 1, electric: 1, grass: 0.5, ice: 0.5, fighting: 2, poison: 0, ground: 2, flying: 0.5, psychic: 0.5, bug: 0.5, rock: 0.5, ghost: 1, dragon: 0.5, dark: 1, steel: 0.5, fairy: 0.5 },
    fairy: { normal: 1, fire: 1, water: 1, electric: 1, grass: 1, ice: 1, fighting: 0.5, poison: 2, ground: 1, flying: 1, psychic: 1, bug: 0.5, rock: 1, ghost: 1, dragon: 0, dark: 0.5, steel: 2, fairy: 1 },
  }),[]);
  
  const [weaknessMap, setWeaknessMap] = useState({});

  useEffect(() => {
    if (!typeCounts || typeof typeCounts !== 'object') {
      console.error('typeCounts is not an object or array:', typeCounts);
      return;
    }
  
    const typesArray = Object.values(typeCounts); // Convert object to an array of type strings
  
    let initialWeaknessMap = {};
    types.forEach((type) => {
      initialWeaknessMap[type] = 0;
    });
  
    // Loop through each Pokémon in typeCounts (now as an array)
    typesArray.forEach((pokeTypes, pokeIndex) => {  
      if (pokeTypes) {
        const pokeTypeArray = pokeTypes.split(' '); // Split by space for dual types
        const tempWeaknessMap = {}; // Temporarily store weaknesses to avoid overcounting
  
  
        // Loop through each type to calculate the weaknesses for dual-types
        pokeTypeArray.forEach((pokeType) => {
          const weaknesses = typeWeakness[pokeType];
  
  
          if (weaknesses) {
            Object.keys(weaknesses).forEach((weakType) => {
              const effectiveness = weaknesses[weakType];
  
              // Track the weaknesses, resistances, and immunities
              let effect = 0;
              if (effectiveness === 2) {
                effect = 1;  // Weakness
              } else if (effectiveness === 0.5) {
                effect = -1;  // Resistance
              } else if (effectiveness === 0) {
                effect = -2;  // Immunity
              } else {
                effect = 0;  // Neutral
              }
    
              // Only update the map if the type isn't already counted for the current Pokémon
              if (!tempWeaknessMap[weakType]) {
                tempWeaknessMap[weakType] = effect;
              } else {
                tempWeaknessMap[weakType] += effect; // Accumulate the effect for dual-types
              }
            });
          }
        });
    
        // Now update the main weakness map based on the temporary one
        Object.keys(tempWeaknessMap).forEach((weakType) => {
          const finalEffect = tempWeaknessMap[weakType];
  
          // Apply the rules to update the weakness map
          if (finalEffect >= 2) {
            initialWeaknessMap[weakType] += 2;
          } else if (finalEffect === 1) {
            initialWeaknessMap[weakType] += 1;
          }
        });
      }
    });
  
    setWeaknessMap(initialWeaknessMap);
  }, [typeCounts, typeWeakness, types]);
  
  

  return (
    <div>
      <h4 className="chartLabel">Weakness</h4>
      <div className="coverage-container">
        <div className="coverage-grid">
          {types.map((type) => (
            <div className="coverage-item" key={type}>
              <div className={`type-box ${type}`}>
                {type}
              </div>
              <div className="coverage-count">
                {weaknessMap[type] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weakness;
