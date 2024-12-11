import React, { useState } from 'react';
import Stats from './stats';
import Coverage from './coverage';
import Weakness from './weakness';

const Overview = ({teamStats, types}) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    setCurrentPage(1); // Navigate to the second page
  };

  const handlePrevPage = () => {
    setCurrentPage(0); // Navigate back to the first page
  };

  return (
    <div className="overview-container">
      {currentPage === 1 && (
        <button className="arrow-button left" onClick={handlePrevPage}>
          ←
        </button>
      )}
      <div className={`pages ${currentPage === 0 ? 'show-first' : 'show-second'}`}>
        <div className="page">
          <Coverage/>
          <Weakness types={types}/>
        </div>
        <div className="page">
          <Stats teamStats={teamStats}/>
        </div>
      </div>
      {currentPage === 0 && (
        <button className="arrow-button right" onClick={handleNextPage}>
          →
        </button>
      )}
    </div>
  );
};

export default Overview;
