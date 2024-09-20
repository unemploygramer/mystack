"use client"

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';

export default function CreateGoal() {
  const [goalText, setGoalText] = useState('');
  const [renderedGoal, setRenderedGoal] = useState('');
  const [verbs, setVerbs] = useState([]);
  const [step, setStep] = useState('stateGoal');
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const fetchData = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading to true when starting fetch
    setRenderedGoal(goalText);
    setGoalText('');
    const aiResponse = await fetch('/api/goalVerbs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({goal: goalText})
    });

    if (aiResponse.ok) {
      const data = await aiResponse.json();
      setVerbs(data.verbs);
      setStep('verb');
    }
    setIsLoading(false); // Set loading to false when fetch is done
  };

  const deleteVerb = (index) => {
    setVerbs(verbs.filter((_, i) => i !== index));
  };

  return(
    <div className="flex justify-center flex-col items-center">
      <h1 className="text-3xl">Create 12 Month Goal</h1>

      {isLoading ? ( // Conditionally render LoadingSpinner
        <LoadingSpinner/>
      ) : (
        <>
          {step === 'stateGoal' ? (
            <>
              <div className="text-xl text-center mt-12">{renderedGoal}</div>
              <form onSubmit={fetchData}>
                <textarea
                  className=" flex flex-col w-[90vw] max-w-[400px] mt-8 h-24 p-2 bg-orange-300 mt-4 "
                  value={goalText}
                  onChange={(e) => setGoalText(e.target.value)}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white rounded p-2 px-4 mt-4">Submit</button>
              </form>
            </>
          ) : (
            <ul className="bg-gray-800 w-[90vw] max-w-[300px] h-[270px] overflow-auto rounded-xl ">
              {verbs.map((verb, index) => (
                <li key={index} className="bg-orange-400 p-2 m-2 rounded-md">
                  <button className="bg-red-500 text-white px-1 mr-3" onClick={() => deleteVerb(index)}>x</button>
                  {verb}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  )
}