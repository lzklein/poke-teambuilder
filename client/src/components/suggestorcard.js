import React, {useState, useEffect} from 'react'
import Missingno from '../assets/missingno.png';

const SuggestorCard = ({name, url}) => {
    const [cardData, setCardData] = useState({});
    useEffect(() => {
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
      }, [url, name]);
    
      console.log(cardData);

  return (
    <div className="pokecardContainer">
        <img
              src={
                cardData
                  ? cardData.sprites.front_default
                  : Missingno
              }
              alt="Pokémon"
              className="pokemonImage"
        />
        <h3>{cardData.name.charAt(0).toUpperCase() + cardData.name.slice(1)}</h3>
    </div>
  )
}

export default SuggestorCard