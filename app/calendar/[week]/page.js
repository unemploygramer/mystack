import React from 'react'
import { getServerSession } from 'next-auth'
import authOptions from "../../../utils/authOptions";
import Link from 'next/link'
async function fetchStart(user) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getGoal/${user}`, {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data.userGoal, "the data")
      return data.userGoal.createdDate; // return the createdDate
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
}

async function fetchSubgoals(user, week) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/subgoalTime/${user}/${week}`, {
      method: 'GET',
      cache: 'no-store',
    });
    if (response.ok) {
      const data = await response.json();
      return data.subGoals; // return the subgoals
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
}

async function page({params}) {
  const week = parseInt(params.week, 10) // Parse week to integer

  const session = await getServerSession(authOptions);
  const start = await fetchStart(session.user.email)
  const subgoals = await fetchSubgoals(session.user.email, week)
console.log(subgoals, "the subgoals")
  // Calculate the start date of the week
  const startDate = new Date(start);
  startDate.setDate(startDate.getDate() + (week - 1) * 7);

  // Create an array of 7 dates starting from the start date
  let dates = Array.from({length: 7}, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    return { date: date, goalText: '' };
  });
subgoals.forEach(subgoal => {
  const dueDate = new Date(subgoal.dueDate);
  const index = dates.findIndex(dateObj => dateObj.date.toDateString() === dueDate.toDateString());
  if (index !== -1) {
    dates[index].goalText = subgoal.goalText;
    dates[index].goalOutcome = subgoal.feedbackResult; // Add the goalOutcome of the subgoal
    dates[index].id = subgoal._id; // Add the id of the subgoal
  }
});

return (
  <div className="mt-[90px] w-screen h-screen ">
    {dates.map((dateObj, index) => (
      <div
        key={index}
        className={`border-2 border-gray-300 m-2 p-2 w-1/2 text-center ${
          dateObj.goalOutcome === '' ? 'bg-red-500' :
          dateObj.goalOutcome === 'achieved' ? 'bg-green-500' :
          dateObj.goalOutcome === 'partially_achieved' ? 'bg-yellow-500' :
          dateObj.goalOutcome === 'not_achieved' ? 'bg-red-500' :
          ''}`}
      >
        {dateObj.date.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        {dateObj.goalText && (
          <Link href={`/goalFeedback/${dateObj.id}`}>
            {dateObj.goalText}
          </Link>
        )}
      </div>
    ))}
    <div className="flex justify-between">
      {week > 1 && week <= 12 && <Link href={`/calendar/${week - 1}`}>← Previous Week</Link>}
      {week >= 1 && week < 12 && <Link href={`/calendar/${week + 1}`}>Next Week →</Link>}
    </div>
  </div>
)
}

export default page