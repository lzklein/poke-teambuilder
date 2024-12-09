import React from 'react';

const Checklist = () => {
  const labels = ["Hazards", "Phazer", "Pivot", "Cleric", "Status", "Trapper", "Spinner", "Recovery"];

  const hazards = ['sticky-web', 'stealth-rock', 'spikes', 'toxic-spikes', 'stone-axe', 'ceaseless-edge', 'toxic-debris'];
  const phazers = ['dragon-tail', 'whirlwind', 'roar', 'circle-throw'];
  const pivot = ['u-turn', 'volt-switch', 'flip-turn', 'parting-shot', 'teleport', 'baton-pass'];
  const cleric = ['heal-bell','aromatherapy', 'jungle-healing', 'lunar-blessing', 'purify', 'refresh', 'take-heart'];
  const status = ['will-o-wisp', 'sacred-fire', 'scald', 'ice-burn', 'lava-plume', 'scorching-sands', 'searing-shot',
    'steam-eruption', 'body-slam', 'discharge', 'dragon-breath','force-palm', 'freeze-shot', 'lick', 'spark', 'stun-spore',
    'nuzzle', 'thunder-wave', 'zap-cannon', 'glare', 'grass-whistle', 'hypnosis', 'lovely-kiss', 'relic-song', 'sing',
    'sleep-powder','spore', 'yawn', 'baneful-bunker', 'poison-fang', 'poison-jab', 'poison-sting', 'shell-side-arm',
    'sludge', 'sludge-bomb', 'smog', 'toxic', 'toxic-spikes', 'toxic-thread', 'poison-gas', 'poison-powder', 'mortal-spin'
  ];
  const trapper = ['anchor-shot', 'block', 'fairy-lock', 'jaw-lock', 'octolock', 'mean-look', 'spider-web', 'spirit-shackle', 'pursuit',
    'thousand-waves', 'arena-trap', 'magnet-pull', 'shadow-tag'];
  const spinner = ['mortal_spin', 'court-change', 'tidy-up', 'rapid-spin', 'defog'];
  const recovery = ['aqua-ring','floral-healing','heal-pulse', 'healing-wish', 'ingrain', 'jungle-healing', 'leech-seed',
    'life-dew', 'lunar-dance', 'pain-split', 'pollen-puff', 'present', 'revival-blessing', 'wish'
  ];

  return (
    <div>
      <h4>Teambuilding Checklist</h4>
      <div className="checklist-container">
        {labels.map((label, index) => (
          <div key={index} className="checklist-item">
            <input type="checkbox" id={label} name={label} disabled/>
            <label htmlFor={label}>{label}</label>
          </div>
        ))}
      </div>  
    </div>

  );
};

export default Checklist;
