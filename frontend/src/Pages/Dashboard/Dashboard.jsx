import React, { useState, useEffect } from 'react';
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
          <h1>ML to Time</h1>
          <div className="widgets">
            <div className="widget">
              <h2>Graph</h2>
              {data && (
                <div>
                  {/* Render the retrieved data */}
                  <p>Water Consumed: {data[0].waterConsumed} ml</p>
                  <p>Time Recorded: {new Date(data[0].timeRecorded * 1000).toLocaleString()}</p>
                  <p>User ID: {data[0].userID}</p>
                  {/* Add more fields as needed */}
                </div>
              )}
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
