import React, { useState } from 'react'

import Header from './header';
import Team from './team';
import Checklist from './checklist';
import Overview from './overview';
import Footer from './footer';

const Home = ({pokemon, url}) => {
  const [selectedCardData, setSelectedCardData] = useState(null);
  const [cardDataButtonPressed, setCardDataButtonPressed]=  useState(false);
  const [teamData, setTeamData] = useState([[],[],[],[],[],[]]);
  const [teamStats, setTeamStats] = useState([[],[],[],[],[],[]]);
  const [typeCounts, setTypeCounts] = useState(['','','','','','']);
  const [moveTypes, setMoveTypes] = useState({
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
  })
  const [checkedState, setCheckedState] = useState({
    Hazards: false,
    Phazer: false,
    Pivot: false,
    Cleric: false,
    Status: false,
    Trapper: false,
    Spinner: false,
    Recovery: false
  });
  
  return (
    <div className="layout">
      <Header />
      <div className="columns">
        <Team pokemon={pokemon}
          url={url} 
          setTeamData={setTeamData} 
          setTeamStats={setTeamStats} 
          setTypeCounts={setTypeCounts}
          setMoveTypes={setMoveTypes}
          selectedCardData={selectedCardData}
          cardDataButtonPressed={cardDataButtonPressed}
        />
        <div className="right-column">
          <Checklist teamData={teamData} setCheckedState={setCheckedState} checkedState={checkedState}/>
          <Overview teamStats={teamStats} 
            teamData={teamData} 
            typeCounts={typeCounts} 
            moveTypes={moveTypes} 
            pokemon={pokemon}
            url={url}
            setSelectedCardData={setSelectedCardData}
            setCardDataButtonPressed={setCardDataButtonPressed}
            checkedState={checkedState}
          />
        </div>
      </div>
      <Footer />  
    </div>
  );
}

export default Home