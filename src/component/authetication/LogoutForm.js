import React, { useState } from 'react';

function LogoutButton() {
  const [message, setMessage] = useState('');

  const handleLogout = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/user/signout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming you have stored the refresh token in localStorage
          // Replace 'your_refresh_token' with the actual token
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        },
        body: JSON.stringify({ refresh: localStorage.getItem('refresh_token') }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || 'Logout successful.');
        // Clear tokens from localStorage upon successful logout
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      } else {
        setMessage(data.error || 'Logout failed.');
      }
    } catch (error) {
      console.error('Logout failed:', error);
      setMessage('Logout failed. Please try again later.');
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <p>{message}</p>
    </div>
  );
}

export default LogoutButton;
