import React from 'react'

import Pokecard from './pokecard.js';

const team = ({pokemon, url}) => {
  return (
    <div className="team-container">
        {pokemon.slice(0, 6).map((index) => (
        <Pokecard key={index} pokemon={pokemon} url={url}/>
        ))}
    </div>
  )
}

export default team