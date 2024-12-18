import React, { useState, useEffect } from 'react';
import Missingno from '../assets/missingno.png';

const SuggestorCard = ({ name, url, renderDisplay }) => {
  const [cardData, setCardData] = useState(null);
  const [pokemonType, setPokemonType] = useState('normal'); 

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
        })
        .catch((error) => console.error('Error fetching Pokémon data:', error));
    }
  }, [url, name, renderDisplay]);

  const typeClassName = pokemonType.toLowerCase();

  return (
    <div className={`suggestorCard ${typeClassName}`}>
      <img
        src={cardData && cardData.sprites ? cardData.sprites.front_default : Missingno}
        alt={name || 'Pokémon'}
        className="pokemonImage"
      />
      <h3 className="suggestorName">
        {cardData && cardData.name
          ? cardData.name.charAt(0).toUpperCase() + cardData.name.slice(1)
          : 'Unknown Pokémon'}
      </h3>
    </div>
  );
};

export default SuggestorCard;
