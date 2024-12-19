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

const Suggestor = ({ teamData, typeCounts, moveTypes, pokemon, url, setSelectedCardData, setCardDataButtonPressed }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState([{},{},{}]);
  const [renderDisplay, setRenderDisplay] = useState(false);

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

  const calculateTypingWeight = (pokemonTypes) => {
    return pokemonTypes.reduce((weight, type) => {
      return weight + (typeCounts[type] || 0);
    }, 0);
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

    setLoading(true);
    try {
      let pokemonList = [];
      Object.keys(typeCounts).forEach(type => {
        if (typeCounts[type] > 0) {
          pokemonList.push(...pokemon.filter(p => p.types.includes(type)).map(p => p.name));
        }
      });

      pokemonList = [...new Set(pokemonList)];

      const pokemonDetails = [];
      for (const pokemonName of pokemonList) {
        const details = await fetchPokemonDetails(pokemonName);
        const fulfilledRoles = countFulfilledRoles(details.moves);
        const typingWeight = calculateTypingWeight(details.types);

        if (fulfilledRoles >= 3) {
          const score = fulfilledRoles * 2 + typingWeight + details.baseStatTotal / 100;
          pokemonDetails.push({
            ...details,
            fulfilledRoles,
            typingWeight,
            score,
          });
        }
        await new Promise(resolve => setTimeout(resolve, 50));
      }

      pokemonDetails.sort((a, b) => b.score - a.score);
      setSuggestions(pokemonDetails.slice(0, 3));
      console.log("Suggested Pokémon:", pokemonDetails.slice(0, 3));
    } catch (error) {
      console.error("Error fetching Pokémon suggestions:", error);
    } finally {
      setLoading(false);
      setRenderDisplay(true);
    }
  };

  return (
    <div>
      <h3>Pokémon Suggestor</h3>

      {/* Layout for cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {displayCards.map((card, index) => (
          <SuggestorCard key={index} 
          name={card.name} 
          url={url}
          renderDisplay={renderDisplay}
          setSelectedCardData={setSelectedCardData}
          setCardDataButtonPressed={setCardDataButtonPressed}/>
        ))}
      </div>

      <div style={{ display: 'flex', marginTop: '20px' }}>
        {/* Left column for Randomizer */}
        <div style={{ flex: 1 }}>
          <label>Randomizer</label>
          <button onClick={handleRandomClick} disabled={loading || pokemon.length === 0}>
            Generate 3 Random Pokémon
          </button>
        </div>

        {/* Right column for Suggestor */}
        <div style={{ flex: 1 }}>
          <label>Suggestor</label>
          <button onClick={handleRecommendClick} disabled={teamData.length < 3 || loading}>
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
          !loading && <p>No suggestions available.</p>
        )}
      </div>
    </div>
  );
};

export default Suggestor;
