import React, { useState, useEffect } from 'react';
import Missingno from '../assets/missingno.png';

const SuggestorCard = ({ name, url, renderDisplay }) => {
  const [cardData, setCardData] = useState(null);

  useEffect(() => {
    if(renderDisplay){
        fetch(`${url}pokemon/${name.toLowerCase()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch Pokémon data');
          }
          return response.json();
        })
        .then((data) => {
          setCardData(data);
        })
        .catch((error) => console.error('Error fetching Pokémon data:', error));
    }
  }, [url, name, renderDisplay]);

  return (
    <div className="pokecardContainer">
      <img
        src={cardData && cardData.sprites ? cardData.sprites.front_default : Missingno}
        alt={name || 'Pokémon'}
        className="pokemonImage"
      />
      <h3>
        {cardData && cardData.name
          ? cardData.name.charAt(0).toUpperCase() + cardData.name.slice(1)
          : 'Unknown Pokémon'}
      </h3>
    </div>
  );
};

export default SuggestorCard;
