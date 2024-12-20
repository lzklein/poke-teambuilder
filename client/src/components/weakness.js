import React from 'react';

const Weakness = ({ types, weaknessMap }) => {

  return (
    <div>
      <h4 className="chartLabel">Weakness</h4>
      <div className="coverage-container">
        <div className="coverage-grid">
          {types.map((type) => (
            <div className="coverage-item" key={type}>
              <div className={`type-box ${type}`}>
                {type}
              </div>
              <div className="coverage-count">
                {weaknessMap[type] || 0}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weakness;
