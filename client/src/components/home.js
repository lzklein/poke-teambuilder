import React from 'react'

import Header from './header';
import Team from './team';
import Checklist from './checklist';
import Overview from './overview';
import Footer from './footer';

const home = ({pokemon, url}) => {
  return (
    <div className="layout">
      <Header />
      <div className="columns">
        <Team pokemon={pokemon} url={url}/>
        <div className="right-column">
          <Checklist />
          <Overview />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default home