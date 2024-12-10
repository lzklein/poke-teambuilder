import React, { useState } from 'react'

import Header from './header';
import Team from './team';
import Checklist from './checklist';
import Overview from './overview';
import Footer from './footer';

const Home = ({pokemon, url}) => {
  const [teamData, setTeamData] = useState([[],[],[],[],[],[]]);

  console.log(teamData)
  return (
    <div className="layout">
      <Header />
      <div className="columns">
        <Team pokemon={pokemon} url={url} setTeamData={setTeamData}/>
        <div className="right-column">
          <Checklist teamData={teamData}/>
          <Overview />
        </div>
      </div>
      <Footer />  
    </div>
  );
}

export default Home