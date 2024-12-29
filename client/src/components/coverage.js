import React from 'react';

const Coverage = ({ types, coverageCounts }) => {

  return (
    <div>
      <h4 className="chartLabel">Coverage</h4>
      <div className="coverage-container">
        <div className="coverage-grid">
          {types.map((type) => (
            <div className="coverage-item" key={type}>
              <div className={`type-box ${type}`}>
                {type}
              </div>
              <div className="coverage-count"
                style={{color: coverageCounts[type] >= 3 ? 'green' : 'black'}}
              >
                {coverageCounts[type]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coverage;
