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

  const handleLogout = () => {
    // Replace this with your actual client ID
    const clientId = '7o199gv9aniv573gaa1fofb30h'; 
    const logoutUri = encodeURIComponent('https://master.d2gzog98ma463h.amplifyapp.com/signout');
  
    const logoutUrl = `https://hydrobuduser.auth.ap-southeast-1.amazoncognito.com/logout?client_id=${clientId}&logout_uri=${logoutUri}`;
  
    // Redirecting the user to the logout URL
    window.location.href = logoutUrl;
    console.log("signed out");
  };
  

  // Function to check if cookie exists
  const checkCookie = () => {
    return document.cookie !== '';
  };

  // Function to redirect to Cognito login
  const redirectToLogin = () => {
    const loginUrl = `https://hydrobuduser.auth.ap-southeast-1.amazoncognito.com/oauth2/authorize?client_id=7o199gv9aniv573gaa1fofb30h&response_type=token&scope=email+openid+phone&redirect_uri=https%3A%2F%2Fmaster.d2gzog98ma463h.amplifyapp.com%2Fsignin%2F`;
    window.location.href = loginUrl;
  };

  // Check for and extract user information from id_token on component mount
  useEffect(() => {
    const cookieExists = checkCookie(); 
    if (!cookieExists) {
      redirectToLogin();
    } else {
      const cookies = document.cookie.split(';');
      let idToken = null;

      cookies.forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name === 'id_token') {
          idToken = value;
        }
      });

      if (idToken) {
        try {
          const tokenParts = idToken.split('.');
          if (tokenParts.length === 3) {
            const decodedToken = JSON.parse(window.atob(tokenParts[1]));
            const userIDFromToken = decodedToken ? decodedToken['cognito:username'] : null;
            setUserID(userIDFromToken);
          } else {
            console.error('Invalid JWT format:', idToken);
          }
        } catch (error) {
          console.error('Error decoding JWT:', error);
        }
      } else {
        console.error('id_token not found in cookies');
      }
    }
  }, []);

  const handleSoundOn = async () => {
    const data = { "sound": "On" };
    try {
      const response = await fetch('https://tr7zuzh1o1.execute-api.ap-southeast-1.amazonaws.com/sound', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Sound turned on successfully!');
    } catch (error) {
      console.error('Error turning sound on:', error);
    }
  };

  const handleSoundOff = async () => {
    const data = { "sound": "Off" };
    try {
      const response = await fetch('https://tr7zuzh1o1.execute-api.ap-southeast-1.amazonaws.com/sound', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Sound turned off successfully!');
    } catch (error) {
      console.error('Error turning sound off:', error);
    }
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
      <img 
        className='logout'
        src={logoutIcon}
        alt="logout"
        onClick={handleLogout}
      />
      <div className="profilecontainer">
        <img 
          className='mrfreshprof'
          src={mrfreshprof}
          alt="mrfreshprof"
        />
        <p className="mrFreshText"><strong>{userID}</strong></p>
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
          onClick={handleSoundOn}
        />
        <img 
          className='speaker_off'
          src={speaker_off}
          alt="speaker_off"
          onClick={handleSoundOff}
        />
      </div>
    </div>
  );
};

export default Profile;
