import React from 'react'

import Stats from './stats';
import Coverage from './coverage';
import Weakness from './weakness';

const overview = () => {
  return (
    <div>
      <Coverage/>
      <Weakness/>
      <Stats/>
    </div>
  )
}

export default overview