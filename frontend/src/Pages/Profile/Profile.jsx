import React, { useEffect } from 'react';
import './Profile.css';
import topdec2 from '../../img/dectop2.png';
import mrfreshprof from '../../img/mrfreshprof.png';
import logoutIcon from '../../img/logout.png';
import preference from '../../img/preference.png';
import backarrow from '../../img/backarrow.png';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Profile = () => {
  
  // Logout handler function
  const handleLogout = () => {
    const clientId = '7o199gv9aniv573gaa1fofb30h'; // Replace this with your actual client ID
    const logoutUri = encodeURIComponent('http://localhost:3000/signout');
  
    const logoutUrl = `https://hydrobuduser.auth.ap-southeast-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  
    // Redirecting the user to the logout URL
    window.location.href = logoutUrl;
    console.log("signed out")
  };
  
  // Check for cookie on component mount
  useEffect(() => {
    const cookieExists = checkCookie(); // Implement checkCookie function to check if the cookie exists

    // If cookie does not exist, redirect to Cognito login
    if (!cookieExists) {
      redirectToLogin();
    }
  }, []);

  // Function to check if cookie exists
  const checkCookie = () => {
    // Implement logic to check if the cookie exists
    // Return true if cookie exists, false otherwise
  };

  // Function to redirect to Cognito login
  const redirectToLogin = () => {
    const loginUrl = `https://hydrobuduser.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=7o199gv9aniv573gaa1fofb30h&response_type=token&scope=email+openid+phone&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fsignin%2F`;
    window.location.href = loginUrl;
  };

  return (
    <div className='body'>
      <div className='dec'>
        <img 
          className='topdec2'
          src={topdec2}
          alt="topdec2"
        />
        <Link to="/dashboard">
          <img 
            className='backarrow'
            src={backarrow}
            alt="backarrow"
          />
        </Link>
      </div>
      {/* Logout button */}
      <img 
        className='logout'
        src={logoutIcon}
        alt="logout"
        onClick={handleLogout} // Attach the logout handler to the onClick event
      />
      <div className="profilecontainer">
        <img 
          className='mrfreshprof'
          src={mrfreshprof}
          alt="mrfreshprof"
        />
        <p className="mrFreshText"><strong>Mr. Fresh</strong></p>
      </div>
      <img 
        className='preference'
        src={preference}
        alt="preference"
      />
    </div>
  );
};

export default Profile;
