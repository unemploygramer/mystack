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

    const subgoalPromises = data.userGoal.subgoals.map(id =>
      fetch(`${process.env.NEXTAUTH_URL}/api/subgoal/${id}`)
    );
    const subgoalResponses = await Promise.all(subgoalPromises);
    const subgoals = await Promise.all(subgoalResponses.map(res => res.json()));
    data.userGoal.subgoals = subgoals;
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
  const data = await fetchData(session.user.email)
  const { goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, owner, subgoals } = data.userGoal;
  console.log("subgoals", subgoals);
  return (
    <div className="flex justify-center overflow-x-hidden mt-[130px]  ">
      <div className="bg-orange-200 p-4 w-[90vw] max-w-[800px] rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 pb-2">Goal: {goalText}</h2>
        {/* ...existing code... */}
        <h3 className="text-xl font-semibold mt-4 mb-2 border-b-2 border-gray-200 pb-2">Subgoals:</h3>
    <ul>
      {subgoals.map((subgoalWrapper, index) => {
        const subgoal = subgoalWrapper.subGoal;
        return (
          <li key={index}>
            <h4>Goal Text: {subgoal.goalText}</h4>
            <p>Week Number: {subgoal.weekNumber}</p>
            <p>Advice: {subgoal.advice}</p>
            <p>Progress: {subgoal.progress}</p>
            <p>Goal Type: {subgoal.goalType}</p>
            <p>Due Date: {new Date(subgoal.dueDate).toLocaleDateString()}</p>
            <p>Time Spent: {subgoal.timeSpent}</p>
            <p>Completion Status: {subgoal.completionStatus ? "Completed" : "Not Completed"}</p>
            <p>User Notes: {subgoal.userNotes}</p>
            <p>Goal Outcome: {subgoal.goalOutcome}</p>
          </li>
        )
      })}
    </ul>
      </div>
    </div>
  )
}

export default page

//      <div className="bg-orange-200 p-4 w-[90vw] max-w-[800px] rounded-lg shadow-lg">
//        <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 pb-2">Goal: {goalText}</h2>
//        {/* ...existing code... */}
//        <h3 className="text-xl font-semibold mt-4 mb-2 border-b-2 border-gray-200 pb-2">Subgoals:</h3>
//        <ul>
//          {subgoals.map((subgoal, index) => (
//            <li key={index}>
//              {subgoal.goalText}
//              {/* Render other subgoal properties as needed */}
//            </li>
//          ))}
//        </ul>
//      </div>




//<h3 className="text-xl font-semibold mt-4 mb-2 border-b-2 border-gray-200 pb-2"><span className="font-bold">Goal Advice:</span></h3>  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">{goalAdvice.helpfulAdvice}</p>
//  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">{goalAdvice.tip1}</p>
//  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">{goalAdvice.tip2}</p>
//  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2">{goalAdvice.tip3}</p>



//<div className="bg-orange-200 p-4 w-[90vw] max-w-[800px] rounded-lg shadow-lg">
//  <h2 className="text-2xl font-bold mb-4 border-b-2 border-gray-200 pb-2">Goal: {goalText}</h2>
//
//<p className="text-lg mb-2 border-b-2 border-gray-200 pb-2"><span className="font-bold">Verbs:</span> {verbs.join(', ')}</p>
//<p className="text-lg mb-2 border-b-2 border-gray-200 pb-2"><span className="font-bold">Total Hours:</span> {totalHours}</p>
// <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2"><span className="font-bold">Current Progress:</span> {currentProgress}</p>
//
//  <p className="text-lg mb-2 border-b-2 border-gray-200 pb-2"><span className="font-bold">Week 1 Goal: </span> {goalAdvice.week1Goal}</p>
//</div>
