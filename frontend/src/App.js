import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard/Dashboard';
import Profile from './Pages/Profile/Profile';
import Signin from './Pages/Signin/signin';
import Signout from './Pages/Signout/signout';
import './messaging_init_in_sw';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Define routes */}
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signout" element={<Signout />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

