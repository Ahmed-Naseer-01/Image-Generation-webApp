import React, { useState } from 'react';

function ResetPasswordForm({ uid, token }) {
  const [password, setPassword] = useState(''); // Define password state
  const [password2, setPassword2] = useState(''); // Define password2 state

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/reset-password/${uid}/${token}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="New Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="password" placeholder="Confirm New Password" value={password2} onChange={(e) => setPassword2(e.target.value)} />
      <button type="submit">Reset Password</button>
    </form>
  );
}

export default ResetPasswordForm;
