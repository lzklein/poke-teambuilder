import React, { useState, useEffect } from 'react';
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

// TODO dynamic stats from team
const RadarChart = ({teamStats}) => {
  useEffect(()=>{
    setStatAverage(getAverage(teamStats));
    setStatTotal(getTotal(teamStats))
  },[teamStats])

  const [statAverage, setStatAverage] = useState([]);
  const [statTotal, setStatTotal] = useState([]);

  const getAverage = (stats) => {
    const numStats = stats.length;
    const numIndices = stats[0]?.length || 0;
  
    const averages = Array(numIndices).fill(0);
  
    stats.forEach(statArray => {
      statArray.forEach((value, index) => {
        averages[index] += value;
      });
    });
  
    return averages.map(sum => sum / numStats);
  };
  
  const getTotal = (stats) => {
    const numIndices = stats[0]?.length || 0;
  
    const totals = Array(numIndices).fill(0); 

    stats.forEach(statArray => {
      statArray.forEach((value, index) => {
        totals[index] += value;
      });
    });
  
    return totals;
  };
  

  const data1 = {
    
    labels: ['HP', 'ATK', 'DEF', 'SPD', 'SPDEF', 'SPATK'], 
    datasets: [
      {
        label: 'total',
        data: statTotal, 
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
        data: statAverage,
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