"use client"
import React, { useEffect } from 'react';

async function page({params}) {
  const token = params.token

  useEffect(() => {
    // Call the API route to confirm the email
    fetch('/api/confirmEmailToken', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        console.error('Error:', data.error);
      } else {
        console.log('Email confirmed:', data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, []);

  return (
    <div className="mt-[90px] h-screen w-screen bg-red-500">
      <h1>Confirm Email</h1>
    </div>
  );
}

export default page;