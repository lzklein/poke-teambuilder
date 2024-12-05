import React from 'react';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

//! sample chart update later
// TODO dynamic stats from team
const RadarChart = () => {
  const data1 = {
    
    labels: ['HP', 'ATK', 'DEF', 'SPD', 'SPDEF', 'SPATK'], 
    datasets: [
      {
        label: 'total',
        data: [80, 90, 70, 85, 75, 100], 
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Transparent fill
        borderColor: 'rgba(54, 162, 235, 1)', // Border color
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Point color
      },
    ],
  };

  const data2 = {
    
    labels: ['HP', 'ATK', 'DEF', 'SPD', 'SPDEF', 'SPATK'], 
    datasets: [
      {
        label: 'average',
        data: [120, 90, 70, 20, 75, 150],
        backgroundColor: 'rgba(54, 162, 235, 0.2)', 
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: { display: true }, // Show/hide radial lines
        suggestedMin: 0, // Minimum value
        suggestedMax: 100, // Maximum value
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div>
        <h3>Stat Total</h3>
        <Radar data={data1} options={options} />
      </div>
      <div>
        <h3>Average</h3>
        <Radar data={data2} options={options} />
      </div>
    </div>
  );
};

export default RadarChart;