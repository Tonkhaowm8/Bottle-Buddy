import React, { useState, useEffect } from 'react';
import Chart from "chart.js/auto"; // Importing the Chart.js library
import { Line } from 'react-chartjs-2';
import './Dashboard.css';
import topdec1 from '../../img/topdec1.png';
import mrfresh from '../../img/mrfresh.png';
import { fetchData } from '../../db'; // Import fetchData function
import { atob } from 'atob'; // Import atob for decoding base64
import { Link } from 'react-router-dom'; // Import Link from React Router


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [editingGoals, setEditingGoals] = useState(false);
  const [mlPerDay, setMlPerDay] = useState(2000);
  const [drinkFreq, setDrinkFreq] = useState(9);
  const [currDrinkFreq, setCurrDrinkFreq] = useState(0);
  const [totalWaterDrank, setTotalWaterDrank] = useState(0);
  
  useEffect(() => {
    const fetchAndSetData = async () => {
      const result = await fetchData();
      setData(result); 
    };

    fetchAndSetData();
  }, []);

  useEffect(() => {
    if (data) {
      // Calculate total water drank
      const total = data.reduce((acc, item) => acc + item.waterConsumed, 0);
      setTotalWaterDrank(total);

      // Set current drink frequency
      setCurrDrinkFreq(data.length);
    }
  }, [data]);

  useEffect(() => {
    const extractAndDecodeIdToken = () => {
      const cookies = document.cookie.split(';');
      let idToken = null;
    
      // Iterate through each cookie to find the one containing the id_token
      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'id_token') { // Assuming 'id_token' is the name of the cookie
          idToken = value; // Assign the token value to idToken
        }
      });
    
      if (idToken) {
        try {
          const tokenParts = idToken.split('.');
          if (tokenParts.length === 3) {
            const decodedToken = JSON.parse(window.atob(tokenParts[1])); // Decode the payload and parse as JSON
            return decodedToken;
          } else {
            console.error('Invalid JWT format:', idToken);
            return null; // Return null if JWT has invalid format
          }
        } catch (error) {
          console.error('Error decoding JWT:', error);
          return null; // Return null if decoding fails
        }
      } else {
        console.error('id_token not found in cookies');
        return null; // Return null if id_token not found
      }
    };
  
    const idTokenData = extractAndDecodeIdToken();
    console.log('Decoded id_token:', idTokenData);
  
    // Extracting the username
    const userID = idTokenData ? idTokenData['cognito:username'] : null;
    console.log('UserID:', userID);
  }, [data]);

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

  const toggleEditingGoals = () => {
    setEditingGoals(!editingGoals);
  };

  const handleMlPerDayChange = (event) => {
    setMlPerDay(parseInt(event.target.value));
  };

  const handleDrinkFreqChange = (event) => {
    setDrinkFreq(parseInt(event.target.value));
  };

  const handleGoalSubmit = () => {
    // Handle goal submission logic here (e.g., update backend with new goals)
    console.log("Updated goals - ml per day:", mlPerDay, "Drink freq:", drinkFreq);
    toggleEditingGoals(); // Toggle editing mode after submission
  };

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
      <Link to="/profile">
      <img 
        className='mrfresh'
        src={mrfresh}
        alt="mrfresh"
      />
      </Link>
      <div className="dashboard">
        <div className="graph">
          <h1 className='graphtitle'>ML to Time</h1>
          <div className="widgets">
          <h3>{date}</h3>
            <div className="widget">
              <div className='graph'>
                {data && <Line data={chartData} options={options} />} {/* Display the line chart with time at bottom */}
              </div>
            </div>
          </div>
        </div>
        <p className="heading">Personal Goals</p>
        <div className="widget-container">
        <div className="widget goal">
          <h2>Goals</h2>
          {editingGoals ? (
            <>
              <label htmlFor="mlPerDay">ML per Day:</label>
              <input type="number" id="mlPerDay" value={mlPerDay} onChange={handleMlPerDayChange} />
              <br />
              <label htmlFor="drinkFreq">Drink Frequency:</label>
              <input type="number" id="drinkFreq" value={drinkFreq} onChange={handleDrinkFreqChange} />
              <br />
              <button onClick={handleGoalSubmit}>Submit</button>
            </>
          ) : (
            <>
              <p><strong>{mlPerDay} ml</strong> ml Per Day</p>
              <p><strong>{drinkFreq}</strong> Drink Freq</p>
              <button onClick={toggleEditingGoals}>Edit</button>
            </>
          )}
          </div>
          <div className="widget current">
            <h2>Current</h2>
            <p><strong>{totalWaterDrank} ml</strong> ml Drank Today</p>
            <p><strong>{currDrinkFreq}</strong> Drink Freq</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
