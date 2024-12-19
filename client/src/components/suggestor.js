import React, { useState } from 'react';
import SuggestorCard from './suggestorcard';

const hazards = ['sticky-web', 'stealth-rock', 'spikes', 'toxic-spikes', 'stone-axe', 'ceaseless-edge', 'toxic-debris'];
const phazers = ['dragon-tail', 'whirlwind', 'roar', 'circle-throw', 'haze', 'clear-smog'];
const pivot = ['u-turn', 'volt-switch', 'flip-turn', 'parting-shot', 'teleport', 'baton-pass', 'chilly-reception'];
const cleric = ['heal-bell', 'aromatherapy', 'jungle-healing', 'lunar-blessing', 'purify', 'refresh', 'take-heart'];
const status = [
  'will-o-wisp', 'scald', 'lava-plume', 'thunder-wave', 'toxic', 'spore', 'hypnosis', 'stun-spore',
  'yawn', 'poison-jab', 'sludge-bomb', 'nuzzle', 'glare'
];
const trapper = ['mean-look', 'spider-web', 'spirit-shackle', 'block', 'jaw-lock', 'arena-trap', 'shadow-tag'];
const spinner = ['rapid-spin', 'defog', 'mortal-spin', 'tidy-up', 'court-change'];
const recovery = ['slack-off', 'roost', 'recover', 'wish', 'leech-seed', 'regenerator', 'life-dew'];

const fetchPokemonDetails = async (pokemonName) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await res.json();

  const moves = data.moves.map(m => m.move.name);
  const types = data.types.map(t => t.type.name);
  const stats = data.stats.reduce((total, stat) => total + stat.base_stat, 0);

  return {
    name: data.name,
    moves,
    types,
    baseStatTotal: stats,
    imageUrl: data.sprites.front_default,
  };
};

const Suggestor = ({ teamData, typeCounts, moveTypes, pokemon, url, setSelectedCardData, setCardDataButtonPressed, weaknessMap, coverageCounts }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState([{},{},{}]);
  const [renderDisplay, setRenderDisplay] = useState(false);
  const [typeWeightMons, setTypeWeightMons] = useState([]);

  const countFulfilledRoles = (moves) => {
    let fulfilledRoles = 0;
    const roles = [
      { name: "Hazards", moves: hazards },
      { name: "Phazers", moves: phazers },
      { name: "Pivot", moves: pivot },
      { name: "Cleric", moves: cleric },
      { name: "Status", moves: status },
      { name: "Trapper", moves: trapper },
      { name: "Spinner", moves: spinner },
      { name: "Recovery", moves: recovery }
    ];
    roles.forEach(role => {
      if (moves.some(move => role.moves.includes(move))) {
        fulfilledRoles += 1;
      }
    });
    return fulfilledRoles;
  };

  const calculateTypeWeights = () => {
    const typeWeights = {};

    Object.entries(weaknessMap).forEach(([type, weakness]) => {
      if (weakness > 2) {
        typeWeights[type] = (typeWeights[type] || 0) + (weakness - 2);
      } else {
        typeWeights[type] = (typeWeights[type] || 0) - (2 - weakness);
      }
    });

    Object.entries(coverageCounts).forEach(([type, coverage]) => {
      if (coverage < 2) {
        typeWeights[type] = (typeWeights[type] || 0) + (2 - coverage);
      } else {
        typeWeights[type] = (typeWeights[type] || 0) - (coverage - 2);
      }
    });

    console.log(typeWeights)

    return Object.entries(typeWeights)
      .sort(([, weightA], [, weightB]) => weightB - weightA)
      .slice(0, 3)
      .map(([type]) => type);
  };

  const handleTypeWeightCalculation = async () => {
    setLoading(true);
    try {
      const topTypes = calculateTypeWeights(); 
      console.log(topTypes);
  
      const allPokemons = new Set();
  
      for (let type of topTypes) {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
  
        data.pokemon.forEach(p => allPokemons.add(p.pokemon.name));
      }
  
      setTypeWeightMons(Array.from(allPokemons)); 
      console.log(Array.from(allPokemons));
    } catch (error) {
      console.error("Error calculating type-weighted Pokémon:", error);
    } finally {
      setLoading(false);
      console.log(typeWeightMons);
    }
  };
  
  

  const handleRandomClick = () => {
    if (!pokemon || pokemon.length === 0) return;

    const randomPokemonList = [];
    const selectedIndexes = new Set();

    while (randomPokemonList.length < 3) {
      const randomIndex = Math.floor(Math.random() * pokemon.length);
      if (!selectedIndexes.has(randomIndex)) {
        selectedIndexes.add(randomIndex);
        const selectedPokemon = pokemon[randomIndex];
        randomPokemonList.push(selectedPokemon);
      }
    }

    setDisplayCards(randomPokemonList.map((pokemon) => ({ name: pokemon })));
    setRenderDisplay(true); 
  };

  const handleRecommendClick = async () => {
    if (teamData.length < 3) return;
    handleTypeWeightCalculation()
  };

  return (
    <div>
      <h3>Pokémon Suggestor</h3>

      {/* Layout for cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {displayCards.map((card, index) => (
          <SuggestorCard 
            key={index} 
            name={card.name} 
            url={url}
            renderDisplay={renderDisplay}
            setSelectedCardData={setSelectedCardData}
            setCardDataButtonPressed={setCardDataButtonPressed}
          />
        ))}
      </div>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <label>Randomizer</label>
          <button onClick={handleRandomClick} disabled={loading || pokemon.length === 0}>
            Generate 3 Random Pokémon
          </button>
        </div>

        <div style={{ flex: 1 }}>
          <label>Suggestor</label>
          <button 
            onClick={handleRecommendClick} 
            disabled={Object.values(typeCounts).filter(type => type === '').length > 3 || loading}>
            Recommend Pokémon
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loader-wrapper">
          <div className="loader" style={{ '--size': '100px' }}>
            <div className="top-half"></div>
            <div className="bottom-half"></div>
            <div className="center-circle"></div>
            <div className="inner-circle"></div>
          </div>
        </div>
      ) : (
        <p>Suggestions will appear below...</p>
      )}

      <div style={{ marginTop: '20px' }}>
        {suggestions.length > 0 ? (
          <ul>
            {suggestions.map((pokemon, index) => (
              <li key={index}>
                <strong>{pokemon.name.toUpperCase()}</strong> - Roles: {pokemon.fulfilledRoles}, Typing Weight: {pokemon.typingWeight}, Score: {pokemon.score.toFixed(2)}
              </li>
            ))}
          </ul>
        ) : (
          renderDisplay && <p>No suggestions available. Try a different approach!</p>
        )}
      </div>
    </div>
  );
};

export default Suggestor;
