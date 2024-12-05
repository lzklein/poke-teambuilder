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

const RadarChart = () => {
  const data = {
    labels: ['HP', 'ATK', 'DEF', 'SPATK', 'SPDEF', 'SPD'], 
    datasets: [
      {
        data: [80, 90, 70, 85, 75, 100], // Data points
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Transparent fill
        borderColor: 'rgba(54, 162, 235, 1)', // Border color
        borderWidth: 2,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Point color
      },
    ],
  };

  // Optional customization
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

  return <Radar data={data} options={options} />;
};

export default RadarChart;