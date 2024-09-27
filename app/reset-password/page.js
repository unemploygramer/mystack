"use client"
// my-app/app/reset-password-request/page.js
import React, { useState } from 'react';

function page() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the API route to send the reset password email
    const response = await fetch('/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Error:', data.error);
    } else {
      console.log('Reset password email sent:', data.message);
    }
  };

  return (
    <div className="mt-[90px]">
      <h1>Reset Password</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">Send Reset Password Email</button>
      </form>
    </div>
  );
}

export default page;