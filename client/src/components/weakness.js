import React from 'react'

const weakness = () => {
  const types = [
    "normal", "fire", "water", "electric", "grass", "ice", 
    "fighting", "poison", "ground", "flying", "psychic", "bug", 
    "rock", "ghost", "dragon", "dark", "steel", "fairy"
  ];

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
              <div className="coverage-count">0</div>
            </div>
          ))}
        </div>
      </div>
    </div>

  );
};

export default weakness