import React from 'react'
import MakeGoal from "../components/MakeGoal"
import { getServerSession } from 'next-auth'
import authOptions from "../../utils/authOptions";
import GoalDisplay from "../components/GoalDisplay";

async function fetchData(email) {


  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getGoal/${email}`, {
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

async function page() {
  const session = await getServerSession(authOptions);
console.log(session,"session")
const data = await fetchData(session.user.email)
console.log(data,"the data")
  const { goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, owner } = data.userGoal;

  return (
<div className="flex justify-center overflow-x-hidden mt-[130px]  ">
<div className="bg-orange-200 p-4 w-[90vw] rounded-lg shadow-lg">
  <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 pb-2">Goal: {goalText}</h2>

<p className="text-lg mb-2 border-b-2 border-gray-200 pb-2"><span className="font-bold">Verbs:</span> {verbs.join(', ')}</p>
<p className="text-lg mb-2 border-b-2 border-gray-200 pb-2"><span className="font-bold">Total Hours:</span> {totalHours}</p>  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">Current Progress: {currentProgress}</p>

  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">Week 1 Goal: {goalAdvice.week1Goal}</p>
  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">Suggested Goal: {suggestedGoal}</p>
</div>

    </div>
  )
}

export default page
//<h3 className="text-xl font-semibold mt-4 mb-2 border-b-2 border-gray-200 pb-2"><span className="font-bold">Goal Advice:</span></h3>  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">{goalAdvice.helpfulAdvice}</p>
//  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">{goalAdvice.tip1}</p>
//  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">{goalAdvice.tip2}</p>
//  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">{goalAdvice.tip3}</p>