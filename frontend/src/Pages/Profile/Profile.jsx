import React, { useEffect, useState } from 'react';
import './Profile.css';
import topdec2 from '../../img/dectop2.png';
import mrfreshprof from '../../img/mrfreshprof.png';
import logoutIcon from '../../img/logout.png';
import preference from '../../img/preference.png';
import backarrow from '../../img/backarrow.png';
import speaker_off from '../../img/speaker_off.png';
import speaker_on from '../../img/speaker_on.png';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Profile = () => {
  const [userID, setUserID] = useState(null); // State to hold userID

  // Logout handler function
  const handleLogout = () => {
    // Your logout logic here
  };

  // Check for and extract user information from id_token on component mount
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

            // Extracting the username from the decoded token
            const userIDFromToken = decodedToken ? decodedToken['cognito:username'] : null;
            setUserID(userIDFromToken); // Set userID state with the username from Cognito
          } else {
            console.error('Invalid JWT format:', idToken);
          }
        } catch (error) {
          console.error('Error decoding JWT:', error);
        }
      } else {
        console.error('id_token not found in cookies');
      }
    };

    extractAndDecodeIdToken();
  }, []); // Empty dependency array to run only once on mount

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
        <p className="mrFreshText"><strong>{userID}</strong></p> {/* Display userID */}
      </div>
      <img 
        className='preference'
        src={preference}
        alt="preference"
      />
      <div className= 'speakercontain'>
      <img 
        className='speaker_on'
        src={speaker_on}
        alt="speaker_on"
      />
      <img 
        className='speaker_off'
        src={speaker_off}
        alt="speaker_off"
      />
      </div>
    </div>
  );
};

export default Profile;
