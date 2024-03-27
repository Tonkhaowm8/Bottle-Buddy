import React from 'react';
import './Profile.css';
import topdec2 from '../../img/dectop2.png';
import mrfreshprof from '../../img/mrfreshprof.png';
import logout from '../../img/logout.png';
import preference from '../../img/preference.png';

const Profile = () => {
  return (
    <div className='body'>
        <div className='dec'>
            <img 
                className='topdec2'
                src={topdec2}
                alt="topdec2"
            />
        </div>
        <img 
            className='logout'
            src={logout}
            alt="logout"
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
        <p className="colours"><strong>LED Colours</strong></p>
        <div className="pie-buttons">
            <button className="pie-button red"></button>
            <button className="pie-button blue"></button>
            <button className="pie-button green"></button>
        </div>
    </div>
  );
};

export default Profile;
