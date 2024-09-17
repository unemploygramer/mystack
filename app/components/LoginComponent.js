"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const LoginComponent = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === 'authenticated') {
      router.replace('/');
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError('Email is invalid');
      return;
    }

    if (!password || password.length < 8) {
      setError('Password is invalid');
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError('Invalid email or password');
    } else {
      if (res?.url) router.replace('/dashboard');
      setError('');
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError("")
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setError("")
  };

  return (
    <div className="w-full   flex justify-center mt-4 ">
    <div className="w-[90%]  max-w-[350px]">
      <h2 className="text-3xl font-semibold mb-6 text-center text-black ">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex flex-col items-center mt-2">
          <label htmlFor="email" className="text-sm  text-black">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            className="mt-1 p-2 w-full border rounded-md bg-orange-400  focus:outline-none focus:border-blue-500 w-[75%]"
            required
          />
        </div>
        <div className="mb-4 flex flex-col items-center mt-2">
          <label htmlFor="password" className="text-sm text-black ">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className="mt-1 p-2 w-full border rounded-md bg-orange-400  focus:outline-none focus:border-blue-500 w-[75%]"
            required
          />
        </div>
        <div className="mb-6  flex justify-center">
          <button
            type="submit"
            className="bg-orange-500 w-24 font-bold  p-3 rounded  hover:bg-orange-300 focus:outline-none focus:shadow-outline-blue"
          >
            Log In
          </button>
        </div>
      </form>
      <div className='w-full  flex justify-center'>
        <h2 className='text-red-800 text-2xl font-bold'>
          {error}
        </h2>
      </div>
      <div className="text-center h-24 ">
        <p className="mb-4 text-black">Don't have an account?</p>
        <Link href="/SignUp" className=" bg-orange-400 rounded p-2 m-4 text-black hover:underline">
          Sign Up
        </Link>
      </div>
      </div>
    </div>
  );
};

export default LoginComponent;
