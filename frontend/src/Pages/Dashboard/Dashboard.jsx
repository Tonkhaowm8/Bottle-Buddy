import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto"; // Importing the Chart.js library
import { Line } from 'react-chartjs-2';
import './Dashboard.css';
import topdec1 from '../../img/topdec1.png';
import mrfresh from '../../img/mrfresh.png';
import { fetchData } from '../../routes'; // Import fetchData function

const Dashboard = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const result = await fetchData();
      setData(result);
    };

    fetchAndSetData();
  }, []);

  // Prepare data for chart
  const chartData = {
    labels: data ? data.map(item => new Date(item.timeRecorded * 1000).toLocaleDateString()) : [], // Display only date
    datasets: [
      {
        label: 'Water Consumed (ml)',
        data: data ? data.map(item => item.waterConsumed) : [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  // Extract time for display on the graph
  const times = data ? data.map(item => new Date(item.timeRecorded * 1000).toLocaleTimeString()) : [];

  // Get the date
  const date = data ? new Date(data[0].timeRecorded * 1000).toLocaleDateString() : '';

  // Chart options to display time at bottom
  const options = {
    scales: {
      x: {
        type: 'category',
        labels: times
      }
    }
  };

  return (
    <div className='body'>
      <img 
        className='topdec'
        src={topdec1}
        alt="topdec"
      />
      <img 
        className='mrfresh'
        src={mrfresh}
        alt="mrfresh"
      />
      <div className="dashboard">
        <div className="graph">
          <h1 className='graphtitle'>ML to Time</h1>
          <div className="widgets">
            <div className="widget">
              <h3>{date}</h3>
              {data && <Line data={chartData} options={options} />} {/* Display the line chart with time at bottom */}
            </div>
          </div>
        </div>
        <p className="heading">Personal Goals</p>
        <div className="widget-container">
          <div className="widget goal">
            <h2>Goals</h2>
            <p><strong>2000 ml</strong> ml Per Day</p>
            <p><strong>9</strong> Drink Freq</p>
          </div>
          <div className="widget current">
            <h2>Current</h2>
            <p><strong>1000 ml</strong> ml Per Day</p>
            <p><strong>4</strong> Drink Freq</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
