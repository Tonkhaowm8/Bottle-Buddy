import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Profile/Profile';
import Signin from './Pages/Signin/signin';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

