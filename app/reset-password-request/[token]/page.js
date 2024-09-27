"use client"

// my-app/app/reset-password-request/page.js
import React, { useState, useEffect } from 'react';

function ResetPasswordRequestPage({params}) {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
const { token } = params
  useEffect(() => {
    // Call the API route to validate the token
    const validateToken = async () => {
    console.log(token,"token")
      if (token && token.length > 0) { // Check if token is not an empty string
        const response = await fetch(`/api/validateToken/${token}`);
        const data = await response.json();

        if (data.valid) {
          setShowResetForm(true);
        }
      }
    };

    validateToken();
  }, [token]);



  const handleSubmit = async (event) => {
    event.preventDefault();

    // Call the API route to reset the password
    const response = await fetch('/api/resetPasswordConfirm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();

    if (data.error) {
      console.error('Error:', data.error);
    } else {
      console.log('Password reset:', data.message);
    }
  };

  return (
    <div className="mt-[90px]">
      <h1>Reset Password</h1>
      {showResetForm ? (
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            New Password:
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
          </label>
          <button type="submit">Reset Password</button>
        </form>
      ) : (
        <p>Invalid token. Please check your email for the correct reset password link.</p>
      )}
    </div>
  );
}

export default ResetPasswordRequestPage;