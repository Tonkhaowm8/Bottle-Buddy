import React, { useEffect } from 'react';

const Signout = () => {
  useEffect(() => {
    // Clear all cookies
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;`; // Clearing cookie by setting expiry to past
    }
  }, []);

  return (
    <div>
      <h1>Signout Page</h1>
      <p>All cookies have been cleared.</p>
    </div>
  );
};

export default Signout;
