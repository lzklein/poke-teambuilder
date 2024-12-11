import React, { useState } from 'react'

import Header from './header';
import Team from './team';
import Checklist from './checklist';
import Overview from './overview';
import Footer from './footer';

const Home = ({pokemon, url}) => {
  const [teamData, setTeamData] = useState([[],[],[],[],[],[]]);
  const [teamStats, setTeamStats] = useState([[],[],[],[],[],[]]);
  const [typeCounts, setTypeCounts] = useState({
    normal: 0,
    fire: 0,
    water: 0,
    grass: 0,
    electric: 0,
    ice: 0,
    fighting: 0,
    poison: 0,
    ground: 0,
    flying: 0,
    psychic: 0,
    bug: 0,
    rock: 0,
    ghost: 0,
    dark: 0,
    dragon: 0,
    steel: 0,
    fairy: 0,
  });

  
  return (
    <div className="layout">
      <Header />
      <div className="columns">
        <Team pokemon={pokemon} url={url} setTeamData={setTeamData} setTeamStats={setTeamStats} setTypeCounts={setTypeCounts}/>
        <div className="right-column">
          <Checklist teamData={teamData}/>
          <Overview teamStats={teamStats}/>
        </div>
      </div>
      <Footer />  
    </div>
  );
}

export default Home