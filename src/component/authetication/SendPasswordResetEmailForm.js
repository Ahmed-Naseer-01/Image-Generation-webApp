import React, { useState } from 'react';

function SendPasswordResetEmailForm() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch('/api/user/send-password-reset-email/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
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
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button type="submit">Send Password Reset Email</button>
    </form>
  );
}

export default SendPasswordResetEmailForm;
