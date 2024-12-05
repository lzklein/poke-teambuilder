import React from 'react'

import Team from './team.js';
import Overview from './overview.js';
const home = ({pokemon}) => {
  return (
    <div>
        <Team pokemon={pokemon}/>
        <Overview/>
    </div>
  )
}

export default home