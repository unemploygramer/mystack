
"use client"
import React, { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"

function FeedbackInput({subgoalId}) {
  const [difficulty, setDifficulty] = useState(null);
  const [additionalComments, setAdditionalComments] = useState('');
  const [result, setResult] = useState('');
  const { data: session } = useSession();
  const [aiFeedback, setAiFeedback] = useState(null); // New state for AI feedback
  const [nextGoal, setNextGoal] = useState(''); // New state for next goal input

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

  const handleNextGoalSubmit = async () => {
    console.log('Next Goal:', nextGoal);
    await saveNextGoal();
  }

  const saveNextGoal = async () => {
    if (!session || !session.user || !session.user.email) {
      console.error('User is not authenticated');
      return;
    }

const subgoalData = {
  goalText: nextGoal,
  weekNumber: 1,
  advice: aiFeedback.dailyGoalAdvice,
  feedback: '',
  progress: '',
  timeSpent: 0,
  completionStatus: false,
  userNotes: '',
  goalOutcome: '',
  goalType: 'daily',
  owner: session.user.email,
  dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Due date is 24 hours from now
};

try {
  const response = await fetch('/api/createDailyGoal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(subgoalData),
  });

      if (!response.ok) {
        throw new Error('Failed to save the next goal');
      }

      console.log('Next goal saved successfully');
    } catch (error) {
      console.error('Error saving next goal:', error);
    }
  }

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
            body: JSON.stringify({mainGoal: mainGoal, subGoals: data.subGoals, currentGoal: subgoalId}),
          });
          if (AiFeedback.ok) {
            const aiData = await AiFeedback.json();
            setAiFeedback(aiData); // Store AI feedback in state
            setNextGoal(aiData.nextGoalOfTheDay); // Set default value for next goal
          }
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <div className="flex justify-center">
      <form onSubmit={handleSubmit} className="max-w-[800px] rounded-xl mt-4 w-[90%] p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mb-4">
          <label className="p-2 text-2xl">Result:</label>
          <select value={result} onChange={e => setResult(e.target.value)} className="w-full h-10 bg-orange-300 rounded">
            <option value="">--Please choose an option--</option>
            <option value="achieved">Achieved</option>
            <option value="partially_achieved">Partially Achieved</option>
            <option value="not_achieved">Not Achieved</option>
          </select>
        </div>
        <div className="flex flex-col items-center mb-2">
          <label className="text-xl p-2">Difficulty:</label>
          <input type="range" min="1" max="5" value={difficulty || ''} onChange={e => setDifficulty(e.target.value)} list="tickmarks" />
          <datalist id="tickmarks">
            <option value="1" label="1"></option>
            <option value="2" label="2"></option>
            <option value="3" label="3"></option>
            <option value="4" label="4"></option>
            <option value="5" label="5"></option>
          </datalist>
          {difficulty && <div>{difficulty}</div>}
        </div>
        <div className="flex flex-col items-center mb-4 w-[100%]">
          <label className="text-xl p-2">Explain how it went</label>
          <textarea className="w-[90%] h-32 bg-orange-300" value={additionalComments} onChange={e => setAdditionalComments(e.target.value)} />
        </div>
        <button onClick={() => fetchAllSubgoals(session.user.email)} type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          Submit
        </button>
      </form>
      {aiFeedback && (
        <div className="bg-black bg-opacity-75 fixed h-screen w-screen top-0 flex justify-center items-center">
          <div className="mt-4 p-4 bg-gray-200 rounded w-[80vw]">
            <h2 className="text-xl font-bold">AI Feedback</h2>
            <p><strong>Goal Analysis:</strong> {aiFeedback.goalAnalysis}</p>
            <p><strong>What to Keep in Mind:</strong> {aiFeedback.whatToKeepInMind}</p>
            <p><strong>Daily Goal Advice:</strong> {aiFeedback.dailyGoalAdvice}</p>
            <div className="flex flex-col items-center mb-4 w-[100%]">
              <label className="text-xl p-2">Next Goal of the Day:</label>
              <textarea type="text" className="h-32 text-xl w-[90%] bg-orange-300" value={nextGoal} onChange={e => setNextGoal(e.target.value)} />
            </div>
            <button onClick={handleNextGoalSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit Next Goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedbackInput;