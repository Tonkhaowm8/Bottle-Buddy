import React, { useEffect } from 'react';
import Cookies from 'js-cookie';

const Signin = () => {
  useEffect(() => {
    // Function to parse token from URL
    const parseTokenFromUrl = () => {
        const url = window.location.href;
        const hashIndex = url.indexOf('#');
        if (hashIndex !== -1) {
          const fragment = url.substring(hashIndex + 1);
          const params = new URLSearchParams(fragment);
          const accessToken = params.get('access_token');
          const idToken = params.get('id_token'); // Retrieve ID token
          if (accessToken) {
            // Store access token in cookie
            Cookies.set('access_token', accessToken);
            if (idToken) {
              // Store ID token in another cookie
              Cookies.set('id_token', idToken);
            }
            // Redirect to another page
            window.location.href = 'https://master.d2gzog98ma463h.amplifyapp.com/dashboard';
          }
        }
      };

    // Call the function to parse token when component mounts
    parseTokenFromUrl();
  }, []); // Run once when component mounts

  return (
    <div>
      <h1>Signing In...</h1>
      {/* Add any loading indicator or message here */}
    </div>
  );
};

export default Signin;
