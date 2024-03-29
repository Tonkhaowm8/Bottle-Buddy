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
  const [userID, setUserID] = useState(null); // Define userID state
  var userIDv;
  const [redirect, setRedirect] = useState(false); // State to handle redirection
  const [stage, setStage] = useState(1); // State for stages

  useEffect(() => {
    const fetchAndSetData = async () => {
      const result = await fetchData();
      setData(result); 
    };

    fetchAndSetData();
  }, []); // Trigger useEffect when refresh state changes

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
          console.log(idToken)
        }
      });
    
      if (idToken) {
        try {
          const tokenParts = idToken.split('.');
          if (tokenParts.length === 3) {
            const decodedToken = JSON.parse(window.atob(tokenParts[1])); // Decode the payload and parse as JSON
    
            // Assuming the real name is stored as a custom attribute in Cognito
            const realName = decodedToken['custom:name'] || null;
            return { ...decodedToken, realName }; // Add realName to the returned object
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
        setRedirect(true); // Set redirect to true if id_token is not found
        return null; // Return null if id_token not found
      }
    };
    
    const idTokenData = extractAndDecodeIdToken();
    console.log('Decoded id_token:', idTokenData);
    
    // Extracting the username
    const userIDFromToken = idTokenData ? idTokenData['cognito:username'] : null;
    userIDv = userIDFromToken;
    console.log('UserID:', userIDFromToken);
    
    // Extracting the real name
    const realNameFromToken = idTokenData ? idTokenData.realName : null;
    console.log('Real Name:', realNameFromToken);
    setUserID(userIDFromToken); // Set userID state    
  }, []); // Trigger useEffect when refresh state changes

  useEffect(() => {
    const checkStage = async () => {
      try {
        const response = await fetch('https://f88n0wpvx1.execute-api.ap-southeast-1.amazonaws.com/update');
        if (response.ok) {
          setStage(2); // Change stage to 2 if response is successful
          console.log("hello")
        }
      } catch (error) {
        console.error('Error checking stage:', error);
      }
    };

    checkStage();
  }, []); // Trigger useEffect when refresh state changes

  useEffect(() => {

    const socketWeb = `wss://61i9jp0vq6.execute-api.ap-southeast-1.amazonaws.com/production?userID=${userIDv}`
    // Create WebSocket connection
    const socket = new WebSocket(socketWeb);
    
    // Connection opened
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connected');
    });
    
    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log('Message from server:', event.data);
      refreshData();
      // Handle incoming WebSocket messages here
    });
    
    // Error handling
    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
      // Handle WebSocket errors here
    });
    
    // Cleanup function to close WebSocket connection when component unmounts
    return () => {
      console.log('Closing WebSocket connection');
      socket.close();
    };
  }, []); // Trigger once on component mount

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

  const handleGoalSubmit = async () => {
    const data = { "userID": userID, "newGoal": mlPerDay }; // Assuming mlPerDay is defined somewhere

    try {
      const response = await fetch('https://o1v3i2l5tk.execute-api.ap-southeast-1.amazonaws.com/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Goal submitted successfully!');
      toggleEditingGoals(); // Toggle editing mode after submission
    } catch (error) {
      console.error('Error submitting goal:', error);
      // Handle error appropriately (e.g., show error message to the user)
    }
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

  const refreshData = async () => {
    try {
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.error('Error refreshing data:', error);
      // Handle error appropriately (e.g., show error message to the user)
    }
  };

  // Redirect if necessary
  if (redirect) {
    window.location.href = "/signin";
    return null;
  }

  return (
    <div className='body'>
      <img 
        className='topdec'
        src={topdec1}
        alt="topdec"
      />
      <div className='greet'>
        <h1 className='welcome'>Welcome</h1>
        <h1 className='hello-name'>Mr.Fresh</h1>
      </div>
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
