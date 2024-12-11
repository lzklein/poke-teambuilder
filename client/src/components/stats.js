import React from 'react'

import RadarChart from './radarchart.js';

const stats = ({teamStats}) => {
  return (
    <div style={{maxWidth:'300px'}}>
      <RadarChart/>
    </div>
  )
}

export default stats