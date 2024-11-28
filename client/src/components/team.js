import React from 'react'

import Pokecard from './pokecard.js';

const team = ({pokemon}) => {
  return (
    <div>
        {pokemon.slice(0, 6).map((name, index) => (
        <Pokecard key={index} name={name} />
        ))}
    </div>
  )
}

export default team