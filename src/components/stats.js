import React from 'react'

import RadarChart from './radarchart.js';

const stats = ({teamStats}) => {
  return (
    <div style={{maxWidth:'300px'}}>
      <RadarChart teamStats={teamStats}/>
    </div>
  )
}

export default stats