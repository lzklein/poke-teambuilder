import React, { useState, useEffect, useMemo } from 'react';
import Stats from './stats';
import Coverage from './coverage';
import Weakness from './weakness';
import Suggestor from './suggestor';

const types = [
  "normal", "fire", "water", "electric", "grass", "ice", 
  "fighting", "poison", "ground", "flying", "psychic", "bug", 
  "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const Overview = ({ teamStats, teamData, typeCounts, moveTypes, pokemon, url, setSelectedCardData, setCardDataButtonPressed, checkedState }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [weaknessMap, setWeaknessMap] = useState({});
  const [coverageCounts, setCoverageCounts] = useState(
    types.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {})
  );

  useEffect(() => {
    const typeEffectiveness = {
      normal: { rock: 0.5, ghost: 0, steel: 0.5 },
      fire: { fire: 0.5, water: 0.5, grass: 2, ice: 2, bug: 2, rock: 0.5, dragon: 0.5, steel: 2 },
      water: { fire: 2, water: 0.5, grass: 0.5, ground: 2, rock: 2, dragon: 0.5 },
      grass: { fire: 0.5, water: 2, grass: 0.5, poison: 0.5, ground: 2, flying: 0.5, bug: 0.5, rock: 2, dragon: 0.5, steel: 0.5 },
      electric: { water: 2, electric: 0.5, grass: 0.5, ground: 0, flying: 2, dragon: 0.5 },
      ice: { fire: 0.5, water: 0.5, ice: 0.5, fighting: 2, rock: 2, steel: 2, dragon: 2 },
      fighting: { normal: 2, ice: 2, rock: 2, bug: 0.5, ghost: 0, steel: 2, fairy: 0.5 },
      poison: { grass: 2, fairy: 2, poison: 0.5, ground: 0.5, rock: 0.5, ghost: 0.5 },
      ground: { fire: 2, electric: 2, poison: 2, rock: 2, steel: 2, grass: 0.5, flying: 0 },
      flying: { grass: 2, fighting: 2, bug: 2, electric: 0.5, rock: 0.5, steel: 0.5 },
      psychic: { fighting: 2, poison: 2, psychic: 0.5, dark: 0 },
      bug: { grass: 2, psychic: 2, dark: 2, fire: 0.5, fighting: 0.5, flying: 0.5, ghost: 0.5, steel: 0.5 },
      rock: { fire: 2, ice: 2, flying: 2, bug: 2, fighting: 0.5, ground: 0.5, steel: 0.5 },
      ghost: { normal: 0, psychic: 2, ghost: 2, dark: 0.5 },
      dragon: { dragon: 2, steel: 0.5, fairy: 0 },
      dark: { psychic: 2, ghost: 2, fighting: 0.5, dark: 0.5, fairy: 2 },
      steel: { rock: 2, ice: 2, fairy: 2, fire: 0.5, water: 0.5, electric: 0.5, steel: 0.5 },
      fairy: { fighting: 2, dragon: 2, dark: 2, fire: 0.5, poison: 0.5, steel: 0.5 },
    };
  
    const newCoverageCounts = types.reduce((acc, type) => {
      acc[type] = 0;
      return acc;
    }, {});
  
    Object.keys(moveTypes).forEach((moveType) => {
      if (moveTypes[moveType] > 0) {
        Object.entries(typeEffectiveness[moveType] || {}).forEach(([targetType, multiplier]) => {
          if (multiplier === 2) {
            newCoverageCounts[targetType] += moveTypes[moveType];
          }
        });
      }
    });
  
    setCoverageCounts(newCoverageCounts);
  }, [moveTypes]);
  
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
  
  const calculateWeaknesses = (typeCounts) => {
    let typesArray = [];

    const isFirstFormat = Object.keys(typeCounts).every(key => !isNaN(key));
    if(isFirstFormat){
      typesArray = Object.values(typeCounts).filter(type => type !== "");
    } else{
      Object.keys(typeCounts).forEach((type) => {
        const count = typeCounts[type];
        for (let i = 0; i < count; i++) {
          typesArray.push(type);
        }
      });
    }
    let weaknessMap = {};
  
    types.forEach((type) => {
      weaknessMap[type] = 0;
    });
  
    typesArray.forEach((pokeTypes) => {  
      if (pokeTypes) {
        const pokeTypeArray = pokeTypes.split(' '); // Split by space for dual types
        const tempWeaknessMap = {};

        pokeTypeArray.forEach((pokeType) => {
          const weaknesses = typeWeakness[pokeType];
  
          if (weaknesses) {
            Object.keys(weaknesses).forEach((weakType) => {
              const effectiveness = weaknesses[weakType];
  
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
  
              if (!tempWeaknessMap[weakType]) {
                tempWeaknessMap[weakType] = effect;
              } else {
                tempWeaknessMap[weakType] += effect;
              }
            });
          }
        });
  
        Object.keys(tempWeaknessMap).forEach((weakType) => {
          const finalEffect = tempWeaknessMap[weakType];
  
          if (finalEffect >= 2) {
            weaknessMap[weakType] += 2;
          } else if (finalEffect === 1) {
            weaknessMap[weakType] += 1;
          }
        });
      }
    });
    return weaknessMap;
  };
  
  useEffect(() => {
    if (!typeCounts || typeof typeCounts !== 'object') {
      console.error('typeCounts is not an object or array:', typeCounts);
      return;
    }
  
    const calculatedWeaknessMap = calculateWeaknesses(typeCounts, typeWeakness);
  
    setWeaknessMap(calculatedWeaknessMap);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typeCounts, typeWeakness]);
  
  const handleNextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="overview-container">
      {currentPage > 0 && (
        <button className="arrow-button left" onClick={handlePrevPage}>
          ←
        </button>
      )}

      <div className={`pages ${currentPage === 0 ? 'show-first' : currentPage === 1 ? 'show-second' : 'show-third'}`}>
        <div className="page">
          <Coverage types={types} coverageCounts={coverageCounts} />
          <Weakness types={types} weaknessMap={weaknessMap} />
        </div>
        <div className="page">
          <Stats teamStats={teamStats} />
        </div>
        <div className="page">
          <Suggestor typeCounts={typeCounts} 
            teamData={teamData} 
            pokemon={pokemon} 
            url={url} 
            setSelectedCardData={setSelectedCardData}
            setCardDataButtonPressed={setCardDataButtonPressed}
            weaknessMap={weaknessMap}
            coverageCounts={coverageCounts}
            calculateWeaknesses={calculateWeaknesses}
            checkedState={checkedState}
          />
        </div>
      </div>

      {currentPage < 2 && (
        <button className="arrow-button right" onClick={handleNextPage}>
          →
        </button>
      )}
    </div>
  );
};

export default Overview;
