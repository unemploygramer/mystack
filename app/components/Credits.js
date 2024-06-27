import React from 'react'
import {useSession} from "next-auth/react"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../utils/authOptions';
import checkAuth from '../../utils/checkAuth';

async function fetchData() {
// checkAuth()
    const session = await getServerSession(authOptions);

    console.log(session,"the session on the server!!")
  // await console.log(data,"all script data ")
  const userEmail = await  session.user.email;
  console.log(userEmail,"the user email")
    try {
      // const response = await fetch(`${process.env.NEXTAUTH_URL}/api/[killme@gmail.com]/getScript`, {
      const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getCredits/${session.user.email}`, {
  cache: "no-cache",   
     method: 'GET',
     
      });
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      return [];
    }
  }
 async function Credits() {
    const  credits = await fetchData(); 
  return (
<h1  className="ml-4 z-90 fixed top-0 left-0 text-xl text-stone-100 bg-red-500">{`credits:${credits}`}</h1>
  )
}

export default Credits