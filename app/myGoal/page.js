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
<div className=" overflow-x-hidden mt-[130px]  bg-orange-200">
    <div>
      <h2>Goal: {goalText}</h2>
      <p>Verbs: {verbs.join(', ')}</p>
      <p>Total Hours: {totalHours}</p>
      <p>Current Progress: {currentProgress}</p>
      <h3>Goal Advice:</h3>
      <p>{goalAdvice.helpfulAdvice}</p>
      <p>{goalAdvice.tip1}</p>
      <p>{goalAdvice.tip2}</p>
      <p>{goalAdvice.tip3}</p>
      <p>Week 1 Goal: {goalAdvice.week1Goal}</p>
      <p>Suggested Goal: {suggestedGoal}</p>
    </div>

    </div>
  )
}

export default page