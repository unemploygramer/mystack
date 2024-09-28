"use client"
import LoadingSpinner from '../../components/LoadingSpinner';
// my-app/app/reset-password-request/page.js
import React, { useState, useEffect } from 'react';

function ResetPasswordRequestPage({params}) {
const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
const { token } = params
useEffect(() => {
  // Call the API route to validate the token
  const validateToken = async () => {
    console.log(token,"token")
    if (token && token.length > 0) { // Check if token is not an empty string
      setIsLoading(true); // Start loading
      const response = await fetch(`/api/validateToken/${token}`);
      const data = await response.json();

      if (data.valid) {
        setShowResetForm(true);
        setIsLoading(false); // Stop loading
      } else {
        setShowResetForm(false);
        setIsLoading(false); // Stop loading
      }
    }
  }; // This was missing

  validateToken();
}, [token]);



  const handleSubmit = async (event) => {
    event.preventDefault();
  setIsLoading(true); // Start loading

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
<div className="mt-[200px] w-full flex-col items-center   flex justify-center mt-4">
  <h1 className="text-3xl font-semibold  text-center ">Reset Password</h1>
  {isLoading ? (
    <div className="w-[90%] max-w-[350px]">
      <LoadingSpinner />
    </div>
  ) : (
    showResetForm ? (
      <form onSubmit={handleSubmit} className="w-[80%] ">
        <div className="mb-4 flex flex-col items-center mt-2 ">
          <label htmlFor="email" className="text-sm text-white-300 ">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border w-[300px] rounded-md bg-orange-300  focus:outline-none focus:border-blue-500 "
            required
          />
        </div>
        <div className="mb-4 flex flex-col items-center mt-2">
          <label htmlFor="password" className="text-sm ">
            New Password:
          </label>
          <input
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-[300px]  mt-1 p-2  border rounded-md bg-orange-300  focus:outline-none focus:border-blue-500 w-full"
            required
          />
        </div>
        <div className="mb-6 flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 font-bold w-24  p-2 rounded hover:bg-orange-700 focus:outline-none focus:shadow-outline-blue"
          >
            Reset Password
          </button>
        </div>
      </form>
    ) : (
      <p>Invalid token. Please check your email for the correct reset password link.</p>
    )
  )}
</div>
  );
}

export default ResetPasswordRequestPage;