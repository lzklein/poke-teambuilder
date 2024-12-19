import React, { useState, useEffect } from 'react';
import Missingno from '../assets/missingno.png';

const SuggestorCard = ({ name, url, renderDisplay, setSelectedCardData, setCardDataButtonPressed }) => {
  const [cardData, setCardData] = useState(null);
  const [pokemonType, setPokemonType] = useState('normal');
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    if (renderDisplay) {
      fetch(`${url}pokemon/${name.toLowerCase()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch Pokémon data');
          }
          return response.json();
        })
        .then((data) => {
          setCardData(data);

          const primaryType = data.types[0].type.name;
          setPokemonType(primaryType);
          setIsGridView(false);
        })
        .catch((error) => console.error('Error fetching Pokémon data:', error));
    }
  }, [url, name, renderDisplay]);

  const typeClassName = pokemonType.toLowerCase();

  const formatPokemonName = (pokemonName) => {
    const exceptionPokemons = [
      "Ho-Oh", "Porygon-Z", "Jangmo-o", "Hakamo-o", "Kommo-o", 
      "Ting-Lu", "Chien-Pao", "Wo-Chien", "Chi-Yu"
    ];
  
    const suffixExceptions = ['-alola', '-galar', '-mega', '-gmax', '-paldea', '-hisui'];
  
    if (exceptionPokemons.includes(pokemonName) || suffixExceptions.some(suffix => pokemonName.endsWith(suffix))) {
      return pokemonName
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join('-');
    }
  
    return pokemonName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  

  const handleCardClick = () => {
    setIsGridView(true); 
  };

  const handleBackClick = (e) => {
    e.stopPropagation();
    setIsGridView(false);
  };

  const handleNumberClick = (e, buttonNumber) => {
    e.stopPropagation();
    
    if (cardData) {
      setSelectedCardData({ index: buttonNumber - 1, name: cardData.name });
    }
    setCardDataButtonPressed(true);
    handleBackClick(e); 
  };
  
  return (
    <div className={`suggestorCard ${typeClassName}`} onClick={handleCardClick}>
      {isGridView ? (
        <div className="buttonGridView">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <button
              key={num}
              className="buttonGrid"
              onClick={(e) => handleNumberClick(e, num)}
            >
              {num}
            </button>
          ))}
          <button className="backButton" onClick={handleBackClick}>X</button>
        </div>
      ) : (
        <>
          <img
            src={cardData && cardData.sprites ? cardData.sprites.front_default : Missingno}
            alt={name || 'Pokémon'}
            className="pokemonImage"
          />
          <h3 className="suggestorName">
            {cardData && cardData.name
              ? formatPokemonName(cardData.name)
              : 'Unknown Pokémon'}
          </h3>
        </>
      )}
    </div>
  );
};

export default SuggestorCard;