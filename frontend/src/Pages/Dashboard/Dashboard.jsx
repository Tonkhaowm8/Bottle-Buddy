import React from 'react';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <div className="widgets">
        <div className="widget">
          <h2>Widget 1</h2>
          <p>Content for Widget 1</p>
        </div>
        <div className="widget">
          <h2>Widget 2</h2>
          <p>Content for Widget 2</p>
        </div>
        <div className="widget">
          <h2>Widget 3</h2>
          <p>Content for Widget 3</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;