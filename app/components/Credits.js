import React from 'react'
import {useSession} from "next-auth/react"
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../../utils/authOptions';
import checkAuth from '../../utils/checkAuth';

async function fetchData() {
// checkAuth()
    const session = await getServerSession(authOptions);

    console.log(session,"the session on the server!!")
  const userEmail = await  session.user.email;
  console.log(userEmail,"the user email")
    try {

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
   const session = await getServerSession(authOptions);

   // Check if session or session.user is null
   if (!session || !session.user) {
     return null;
   }

   const userEmail = session.user.email;
   console.log(userEmail,"the user email")
    const  credits = await fetchData();
    console.log(credits,"the credits") ;
  return (
    <div className="flex justify-start items-start mt-6 ml-4    fixed top-0 z-10 ">
      <h1 className="font-3xl text-xl text-stone-100 ">{`credits:${credits}`}</h1>
    </div>
  )
}

export default Credits