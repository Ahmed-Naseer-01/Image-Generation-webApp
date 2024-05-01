import React, { useState } from 'react';

function ChangePasswordForm() {
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/user/change-password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      body: JSON.stringify({
        password,
        password2,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data); // Handle success
    } else {
      const errorData = await response.json();
      console.error(errorData); // Handle errors
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm New Password"
        value={password2}
        onChange={(e) => setPassword2(e.target.value)}
      />
      <button type="submit">Change Password</button>
    </form>
  );
}

export default ChangePasswordForm;
