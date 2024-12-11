import React from 'react'

import Pokecard from './pokecard.js';

const Team = ({pokemon, url, setTeamData, setTeamStats, setTypeCounts}) => {
  return (
    <div className="team-container">
        {pokemon.slice(0, 6).map((mon, index) => (
        <Pokecard key={index} pokemon={pokemon} url={url} setTeamData={setTeamData} ind={index} setTeamStats={setTeamStats} setTypeCounts={setTypeCounts}/>
        ))}
    </div>
  )
}

export default Team