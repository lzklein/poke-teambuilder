import React, { useEffect } from 'react';

const Checklist = ({ teamData, setCheckedState, checkedState }) => {
  const labels = [
    "Hazards", "Phazer", "Pivot", "Cleric", "Status", "Trapper", "Spinner", "Recovery"
  ];


  // Checking teamData to checkbox
  useEffect(() => {
    const hazards = ['sticky-web', 'stealth-rock', 'spikes', 'toxic-spikes', 'stone-axe', 'ceaseless-edge', 'toxic-debris'];
    const phazers = ['dragon-tail', 'whirlwind', 'roar', 'circle-throw', 'haze', 'clear-smog'];
    const pivot = ['u-turn', 'volt-switch', 'flip-turn', 'parting-shot', 'teleport', 'baton-pass', 'chilly-reception'];
    const cleric = ['heal-bell','aromatherapy', 'jungle-healing', 'lunar-blessing', 'purify', 'refresh', 'take-heart'];
    const status = ['will-o-wisp', 'sacred-fire', 'scald', 'ice-burn', 'lava-plume', 'scorching-sands', 'searing-shot',
      'steam-eruption', 'body-slam', 'discharge', 'dragon-breath','force-palm', 'freeze-shot', 'lick', 'spark', 'stun-spore',
      'nuzzle', 'thunder-wave', 'zap-cannon', 'glare', 'grass-whistle', 'hypnosis', 'lovely-kiss', 'relic-song', 'sing',
      'sleep-powder','spore', 'yawn', 'baneful-bunker', 'poison-fang', 'poison-jab', 'poison-sting', 'shell-side-arm',
      'sludge', 'sludge-bomb', 'smog', 'toxic', 'toxic-spikes', 'toxic-thread', 'poison-gas', 'poison-powder', 'mortal-spin',
      'dark-void', 'inferno', 'static', 'flame-body', 'poison-point', 'effect-spore'
    ];
    const trapper = ['anchor-shot', 'block', 'fairy-lock', 'jaw-lock', 'octolock', 'mean-look', 'spider-web', 'spirit-shackle',
      'pursuit','thousand-waves', 'arena-trap', 'magnet-pull', 'shadow-tag', 'whirlpool', 'fire-spin', 'sand-tomb', 'clamp',
     'wrap',];
    const spinner = ['mortal_spin', 'court-change', 'tidy-up', 'rapid-spin', 'defog'];
    const recovery = ['aqua-ring','floral-healing','heal-pulse', 'healing-wish', 'ingrain', 'jungle-healing', 'leech-seed',
      'life-dew', 'lunar-dance', 'pain-split', 'pollen-puff', 'present', 'revival-blessing', 'wish', 'regenerator', 'milk-drink',
      'moonlight', 'morning-sun', 'slack-off', 'recover' , 'synthesis', 'roost'
    ];
  
    const flattenedTeamData = [].concat(...teamData);
  
    setCheckedState({
      Hazards: flattenedTeamData.some(item => hazards.includes(item)),
      Phazer: flattenedTeamData.some(item => phazers.includes(item)),
      Pivot: flattenedTeamData.some(item => pivot.includes(item)),
      Cleric: flattenedTeamData.some(item => cleric.includes(item)),
      Status: flattenedTeamData.some(item => status.includes(item)),
      Trapper: flattenedTeamData.some(item => trapper.includes(item)),
      Spinner: flattenedTeamData.some(item => spinner.includes(item)),
      Recovery: flattenedTeamData.some(item => recovery.includes(item))
    });
  }, [teamData, setCheckedState]);
  

  return (
    <div style={{marginTop:'20px'}}>
      <h4 className='checkboxLabel'>Teambuilding Checklist</h4>
      <div className="checklist-container">
        {labels.map((label, index) => (
          <div key={index} className="checkbox-wrapper-45">
            <input 
              id={`cbx-${index}`} 
              type="checkbox" 
              checked={checkedState[label]} 
              disabled
            />
            <label className="cbx" htmlFor={`cbx-${index}`}>
              <div className="flip">
                <div className="front"></div>
                <div className="back">
                  <svg width="16" height="14" viewBox="0 0 16 14">
                    <path d="M2 8.5L6 12.5L14 1.5"></path>
                  </svg>
                </div>
              </div>
            </label>
            <label htmlFor={`cbx-${index}`} style={{ marginLeft: '8px' }} className='checkboxLabel'>{label}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Checklist;
