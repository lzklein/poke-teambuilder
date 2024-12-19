import React, { useState } from 'react';
import Stats from './stats';
import Coverage from './coverage';
import Weakness from './weakness';
import Suggestor from './suggestor';

const Overview = ({ teamStats, teamData, typeCounts, moveTypes, pokemon, url, setSelectedCardData, setCardDataButtonPressed }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNextPage = () => {
    if (currentPage < 2) {
      setCurrentPage(currentPage + 1); // Navigate to the next page
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1); // Navigate back to the previous page
    }
  };

  return (
    <div className="overview-container">
      {currentPage > 0 && (
        <button className="arrow-button left" onClick={handlePrevPage}>
          ←
        </button>
      )}

      <div className={`pages ${currentPage === 0 ? 'show-first' : currentPage === 1 ? 'show-second' : 'show-third'}`}>
        <div className="page">
          <Coverage moveTypes={moveTypes} />
          <Weakness typeCounts={typeCounts} />
        </div>
        <div className="page">
          <Stats teamStats={teamStats} />
        </div>
        <div className="page">
          <Suggestor typeCounts={typeCounts} 
          teamData={teamData} 
          moveTypes={moveTypes} 
          pokemon={pokemon} 
          url={url} 
          setSelectedCardData={setSelectedCardData}
          setCardDataButtonPressed={setCardDataButtonPressed}
          />
        </div>
      </div>

      {currentPage < 2 && (
        <button className="arrow-button right" onClick={handleNextPage}>
          →
        </button>
      )}
    </div>
  );
};

export default Overview;
