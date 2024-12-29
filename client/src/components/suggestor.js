import React, { useState, useEffect } from 'react';
import SuggestorCard from './suggestorcard';
const hazards = ['sticky-web', 'stealth-rock', 'spikes', 'toxic-spikes', 'stone-axe', 'ceaseless-edge', 'toxic-debris'];
const phazers = ['dragon-tail', 'whirlwind', 'roar', 'circle-throw', 'haze', 'clear-smog'];
const pivot = ['u-turn', 'volt-switch', 'flip-turn', 'parting-shot', 'teleport', 'baton-pass', 'chilly-reception'];
const cleric = ['heal-bell','aromatherapy', 'jungle-healing', 'lunar-blessing', 'purify', 'refresh', 'take-heart'];
const status = ['will-o-wisp', 'sacred-fire', 'scald', 'ice-burn', 'lava-plume', 'scorching-sands', 'searing-shot',
  'steam-eruption', 'body-slam', 'discharge', 'dragon-breath','force-palm', 'freeze-shot', 'lick', 'spark', 'stun-spore',
  'nuzzle', 'thunder-wave', 'zap-cannon', 'glare', 'grass-whistle', 'hypnosis', 'lovely-kiss', 'relic-song', 'sing',
  'sleep-powder','spore', 'yawn', 'baneful-bunker', 'poison-fang', 'poison-jab', 'poison-sting', 'shell-side-arm',
  'sludge', 'sludge-bomb', 'smog', 'toxic', 'toxic-spikes', 'toxic-thread', 'poison-gas', 'poison-powder', 'mortal-spin',
  'dark-void', 'inferno', 'static', 'flame-body', 'poison-point', 'effect-spore'
];
const trapper = ['anchor-shot', 'block', 'fairy-lock', 'jaw-lock', 'octolock', 'mean-look', 'spider-web', 'spirit-shackle',
  'pursuit','thousand-waves', 'arena-trap', 'magnet-pull', 'shadow-tag', 'whirlpool', 'fire-spin', 'sand-tomb', 'clamp',
 'wrap',];
const spinner = ['mortal_spin', 'court-change', 'tidy-up', 'rapid-spin', 'defog'];
const recovery = ['aqua-ring','floral-healing','heal-pulse', 'healing-wish', 'ingrain', 'jungle-healing', 'leech-seed',
  'life-dew', 'lunar-dance', 'pain-split', 'pollen-puff', 'present', 'revival-blessing', 'wish', 'regenerator', 'milk-drink',
  'moonlight', 'morning-sun', 'slack-off', 'recover' , 'synthesis', 'roost'
];
const fetchPokemonDetails = async (pokemonName) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await res.json();

  const moves = data.moves.map(m => m.move.name);
  const types = data.types.map(t => t.type.name);
  const stats = data.stats.reduce((total, stat) => total + stat.base_stat, 0);
  const abilities = data.abilities.map(ability => ability.ability.name);

  return {
    name: data.name,
    moves,
    types,
    abilities,
    baseStatTotal: stats,
  };
};

const Suggestor = ({ teamData, typeCounts, pokemon, url, setSelectedCardData, setCardDataButtonPressed, weaknessMap, coverageCounts, calculateWeaknesses, checkedState }) => {
  const [loading, setLoading] = useState(false);
  const [displayCards, setDisplayCards] = useState([{},{},{}]);
  const [renderDisplay, setRenderDisplay] = useState(false);
  const [typeWeightMons, setTypeWeightMons] = useState([]);
  const [excludingLegendary, setExcludingLegendary] = useState(true);
  
  useEffect(()=>{
    const top3Pokemons = typeWeightMons
    .sort((a, b) => b.baseStatTotal - a.baseStatTotal) 
    .slice(0, 3);
    console.log(top3Pokemons.map(mon=>mon.fulfilledRolesList))

    if (top3Pokemons.length > 0) {
      setDisplayCards(top3Pokemons.map(pokemon => ({ name: pokemon.name })));
      setRenderDisplay(true);
    }
  },[typeWeightMons])

  const fulfilledRolesWeight = (moves) => {
    let fulfilledRoles = 0;
    const fulfilledRolesList = [];
    
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
  
    roles.forEach((role) => {
      if (!!checkedState[role.name]){
        return;
      }
      if (moves.some((move) => role.moves.includes(move))) {
        fulfilledRoles += 1;
        fulfilledRolesList.push(role.name);
      }
    });
  
    return { fulfilledRoles, fulfilledRolesList };
  };
  

  const calculateTypeWeights = () => {
    const typeWeights = {};

    Object.entries(calculateWeaknesses(weaknessMap)).forEach(([type, weakness]) => {
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

    return Object.entries(typeWeights)
      .sort(([, weightA], [, weightB]) => weightB - weightA)
      .slice(0, 3)
      .map(([type]) => type);
  };

  const handleTypeWeightCalculation = async () => {
    setLoading(true);
    try {
      const topTypes = calculateTypeWeights();  
      const allPokemons = [];
      const batchSize = 10; 
  
      for (let type of topTypes) {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
  
        const pokemonNames = data.pokemon.map(p => p.pokemon.name);
  
        for (let i = 0; i < pokemonNames.length; i += batchSize) {
          const batch = pokemonNames.slice(i, i + batchSize);
          const batchPromises = batch.map(fetchPokemonDetails);
  
          const batchResults = await Promise.all(batchPromises);
  
          for (let pokemonDetails of batchResults) {
            if (excludingLegendary && pokemonDetails.baseStatTotal >= 600) {
              continue;
            }
  
            const { fulfilledRoles, fulfilledRolesList } = fulfilledRolesWeight(pokemonDetails.moves);
  
            allPokemons.push({
              ...pokemonDetails,
              fulfilledRoles,
              fulfilledRolesList,
              score: pokemonDetails.baseStatTotal + fulfilledRoles * 10,
            });
          }
        }
      }
    
      const top20Pokemons = allPokemons
        .sort((a, b) => b.fulfilledRoles - a.fulfilledRoles)
        .slice(0, 20);
  
      setTypeWeightMons(top20Pokemons);
    } catch (error) {
      console.error("Error calculating type-weighted Pokémon:", error);
    } finally {
      setLoading(false);
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

  const toggleLegendary = () => {
    setExcludingLegendary(!excludingLegendary);
  }

  return (
    <div>
      <h3>Pokémon Suggestor</h3>
      <div style={{ display: 'flex', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ marginBottom: '5px' }}>Randomizer</label>
          <button onClick={handleRandomClick} disabled={loading || pokemon.length === 0}>
            Generate 3 Random Pokémon
          </button>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label style={{ marginBottom: '5px' }}>Suggestor</label>
          <button 
            onClick={handleRecommendClick} 
            disabled={Object.values(typeCounts).filter(type => type === '').length > 3 || loading}
          >
            Recommend Pokémon
          </button>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={excludingLegendary}
              onChange={toggleLegendary}
              style={{ marginRight: '5px' }}
            />
            <p style={{ margin: 0 }}>Exclude Legendaries</p>
          </div>
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
    </div>
  );
};

export default Suggestor;
