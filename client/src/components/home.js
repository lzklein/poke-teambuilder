import React, { useState } from 'react'

import Header from './header';
import Team from './team';
import Checklist from './checklist';
import Overview from './overview';
import Footer from './footer';

const Home = ({pokemon, url}) => {
  const [teamData, setTeamData] = useState([[],[],[],[],[],[]]);
  const [teamStats, setTeamStats] = useState([[],[],[],[],[],[]]);
  const [typeCounts, setTypeCounts] = useState(['','','','','','']);
  console.log(typeCounts)
  
  return (
    <div className="layout">
      <Header />
      <div className="columns">
        <Team pokemon={pokemon} url={url} setTeamData={setTeamData} setTeamStats={setTeamStats} setTypeCounts={setTypeCounts}/>
        <div className="right-column">
          <Checklist teamData={teamData}/>
          <Overview teamStats={teamStats} types={typeCounts}/>
        </div>
      </div>
      <Footer />  
    </div>
  );
}

export default Home