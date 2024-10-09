"use client"
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

function FeedbackInput({subgoalId}) {
  const [difficulty, setDifficulty] = useState(null);
  const [additionalComments, setAdditionalComments] = useState('');
  const [result, setResult] = useState('');
      const { data: session } = useSession();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const feedback = {
      difficulty,
      result,
      additionalComments,
    };
    console.log('Feedback data:', feedback);
    try {
      const response = await fetch(`/api/updateSubgoalFeedback/${subgoalId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedback),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Feedback submitted successfully');
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

const fetchAllSubgoals = async (user) => {
  try {
    const response = await fetch(`/api/getAllSubgoals/${user}`, {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      console.log(data,"!!!!!!! the subgoals"); // This will log all subgoals
      const getMainGoal = await fetch(`/api/getGoal/${session.user.email}`, {
        method: 'GET',
      });
      if (getMainGoal.ok) {
        const mainGoal = await getMainGoal.json();
        console.log(mainGoal,"the main goal")
        const AiFeedback = await fetch(`/api/AIGoalFeedback`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({mainGoal: mainGoal, subGoals: data.subGoals}),
        });
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}
  return (
    <div className=" flex justify-center">
      <form onSubmit={handleSubmit} className="max-w-[800px] bg-orange-200 rounded-xl  mt-12   w-[90%] p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-4">
          <label>Result:</label>
<select value={result} onChange={e => setResult(e.target.value)} className="w-[90%] h-10 bg-orange-300 rounded">
  <option value="">--Please choose an option--</option>
  <option value="achieved">Achieved</option>
  <option value="partially_achieved">Partially Achieved</option>
  <option value="not_achieved">Not Achieved</option>
</select>
        </div>
        <div className="flex flex-col items-center mb-4">
          <label>Difficulty:</label>
          <input type="range" min="1" max="5" value={difficulty || ''} onChange={e => setDifficulty(e.target.value)} list="tickmarks" />
          <datalist id="tickmarks">
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
            <option value="3" label="3"></option>
            <option value="4" label="4"></option>
            <option value="5" label="5"></option>
          </datalist>
          {difficulty && <div> {difficulty}</div>}
        </div>
        <div className="flex flex-col items-center mb-4 w-[100%]">
          <label>Write some insight on how it went</label>
          <textarea className="w-[90%] h-32 bg-orange-300  " value={additionalComments} onChange={e => setAdditionalComments(e.target.value)} />
        </div>
<button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
  Submit
</button>
 </form>
 <div>
 <button onClick={()=> fetchAllSubgoals(session.user.email)}>
 Click the Button for Feedback</button></div>
    </div>
  );
}

export default FeedbackInput;