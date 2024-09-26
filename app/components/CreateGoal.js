"use client"

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaWindowClose } from "react-icons/fa";
import Link from 'next/link';
export default function CreateGoal() {
  const [goalText, setGoalText] = useState('');
  const [renderedGoal, setRenderedGoal] = useState('');
  const [verbs, setVerbs] = useState([]);
  const [step, setStep] = useState('stateGoal');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [newVerb, setNewVerb] = useState(''); // New state for the input value
const [taskHours, setTaskHours] = useState([]);
const [totalHours, setTotalHours] = useState(null)
;const [availableHours, setAvailableHours] = useState(null);
const [isTotalHoursFormSubmitted, setIsTotalHoursFormSubmitted] = useState(false);
const [currentProgress, setCurrentProgress] = useState('');
const [goalAdvice, setGoalAdvice] = useState(null); // New state for the advice
const [suggestedGoal, setSuggestedGoal] = useState('');
const [goalOfTheDay, setGoalOfTheDay] = useState("");
const [signUpPopup, setSignUpPopup] = useState(true);
//const [goalAdvice, setGoalAdvice] = useState({
//                                               "helpfulAdvice": "Consistency is key. Try to work on your goal a little bit every day.",
//                                               "tip1": "Break down your goal into smaller, manageable tasks.",
//                                               "tip2": "Set specific times during the day to work on your tasks.",
//                                               "tip3": "Track your progress and celebrate small victories along the way."
//                                             }); // New state for the advice


const handleTotalHoursSubmission = (e) => {
  e.preventDefault(); // Prevent the default form submission
  setTotalHours(Number(e.target.totalHours.value)); // Set the total hours to the input value
  setAvailableHours(Number(e.target.totalHours.value)); // Set the available hours to the input value
  setIsTotalHoursFormSubmitted(true); // Set isTotalHoursFormSubmitted to true
};

const getGoalOfTheDay = async () => {
  setIsLoading(true); // Set loading to true

  const response = await fetch('/api/createDailyGoal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      renderedGoal: renderedGoal,
      verbs: verbs,
      totalHours: totalHours,
      currentProgress: currentProgress,
      week1Goal: suggestedGoal
    })
  });

  if (response.ok) {
    const data = await response.json();
    setGoalOfTheDay(data.goalOfTheDay);
    setStep('displayGoal'); // Set the step to 'displayGoal'
  } else {
    // Handle error here
  }

  setIsLoading(false); // Set loading to false
};

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
  const addVerb = (e) => {
    e.preventDefault();
    setVerbs([newVerb,...verbs]);
    setNewVerb('');
  };
const submitProgress = async (e) => {
  e.preventDefault();
  setIsLoading(true); // Show loading spinner
  handleTotalHoursSubmission(e);
  const aiResponse = await fetch('/api/submitGoalParams', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      renderedGoal: renderedGoal,
      verbs: verbs,
      totalHours: totalHours,
      currentProgress: currentProgress
    })
  });

  if (aiResponse.ok) {
    const data = await aiResponse.json();
    setGoalAdvice(data); // Set the goalAdvice state with the received data
    setSuggestedGoal(data.week1Goal); // Set the suggestedGoal state with the week1Goal from the received data
    setStep('advice'); // Change the step to 'advice'
  }
  setIsLoading(false); // Hide loading spinner
};
  return(
  <div className="flex justify-center flex-col items-center">
    <h1 className="text-3xl">12 Week Goal</h1>
    {signUpPopup && (
      <div className="mt-[350px] fixed w-screen h-screen bg-gray-500 opacity-70 transition duration-1000 ease-in-out">
        {/* Rest of your code */}
      </div>
    )}
{signUpPopup && (
<div className=" mt-[350px] flex justify-center items-center w-screen h-screen fixed">
<div className="animate-slideIn bg-orange-200 flex flex-col justify-between p-5 rounded-md  w-[90vw] relative shadow-lg">
   <button onClick={()=> setSignUpPopup(false)} className="absolute top-0 right-0 m-2">
      <FaWindowClose className="text-[40px] text-red-500" />
    </button>
    <h2 className="text-gray-700 m-6 text-3xl font-bold text-center">Sign Up to Track Your Progress</h2>
    <p className="text-gray-600 m-b-4 text-lg text-center mb-4">Join us and start tracking your progress towards your goals.</p>
    <Link className="bg-orange-500 text-white p-4 rounded-xl w-full font-bold text-lg" href="/SignUp">Sign Up</Link>
  </div>
</div>
)}
    {isLoading ? (
      <LoadingSpinner />
    ) : (
      <>
        {(() => {
          switch (step) {
            case 'stateGoal':
              return (
                <>
                  <div className="text-xl text-center mt-12">{renderedGoal}</div>
                    <h2 className="text-2xl text-center ">What is your goal?</h2>
                    <h2 className="text-xl text-center mt-4">Make sure it is specific, measurable, achievable, relevant, and time-bound</h2>
                  <form onSubmit={fetchData}>
       <textarea
         className="focus:border-orange-700 border-orange-500 focus:outline-none border-2 rounded-xl border-orange-500 flex flex-col w-[90vw] max-w-[400px] mt-8 h-24 p-2 bg-orange-300 mt-4 shadow"
         value={goalText}
         onChange={(e) => setGoalText(e.target.value)}
       />
                    <button
                      type="submit"
                      className="bg-orange-500 font-bold text-white rounded p-2 px-4 mt-4"
                    >
                      Submit
                    </button>
                  </form>
                </>
              );
            case 'verb':
              return (
                   <div className="">
                   <div className="flex  justify-center">

<h2 className="text-xl text-center mt-4 bg-orange-300 p-2 font-bold rounded-xl border-2 border-orange-500">
                     {renderedGoal
                     }</h2>
                     </div>
                                          <div className=" w-screen flex justify-center  flex-col items-center  p-4">
<div className="bg-gray-300 flex flex-col items-center p-4 rounded-xl w-[90vw] max-w-[500px] border-2 border-gray-400 shadow-lg">
                     <h2 className="text-xl text-center mt-4 font-bold">Add all the actions needed to make the goal.</h2>
                       <ul className="bg-gray-800 w-[90%]  h-[270px] mt-4 overflow-auto rounded-xl ">
                         {verbs.map((verb, index) => (
                           <li key={index} className="bg-orange-300 p-2 m-2 rounded-md">
                             <button
                               className="bg-red-500 text-white  p-2 rounded mr-3"
                               onClick={() => deleteVerb(index)}
                             >
                               <FaRegTrashAlt />

                             </button>

                             {verb}
                           </li>
                         ))}
                       </ul>
<div className=" border-2 border-orange-400 flex justify-center items-center mt-4 p-4 bg-orange-300 w-screen-[90vw] p-2 rounded-xl">
                       <form onSubmit={addVerb}>
<div className="flex justify-center items-center ">
    <input
        className="p-2 mb-2 bg-orange-200 rounded border-2 border-orange-400"
        type="text"
        value={newVerb}
        onChange={(e) => setNewVerb(e.target.value)}
    />
</div>
                         <div className=" flex justify-center">
                         <button className="bg-orange-500 p-1 font-bold rounded-md p-2" type="submit">Add Action</button>
                            </div>
                       </form>
</div>
<button
  className="bg-orange-500 mt-4 text-black  font-bold w-24 rounded flex justify-center items-center"
  onClick={() => setStep('currentProgress')}
>
  <FaLongArrowAltRight  className="text-4xl"/>
</button>
</div>
                     </div>
                   </div>
              );
case 'advice':
  return (
    <div className="bg-orange-200 p-5 rounded-md">
      <h2 className="text-gray-700 mb-2">Goal Advice</h2>
      <p className="mb-2"><strong>Advice:</strong> {goalAdvice.helpfulAdvice}</p>
      <p className="mb-2"><strong>Tip 1:</strong> {goalAdvice.tip1}</p>
      <p className="mb-2"><strong>Tip 2:</strong> {goalAdvice.tip2}</p>
      <p className="mb-2"><strong>Tip 3:</strong> {goalAdvice.tip3}</p>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log(suggestedGoal);
      }}>
        <label htmlFor="week1Goal" className="text-xl text-center mt-4">
          Week 1 Goal:
        </label>
        <textarea
          id="week1Goal"
          value={goalAdvice.week1Goal}
          onChange={(e) => setSuggestedGoal(e.target.value)}
          className="p-2 mb-2 bg-orange-100 rounded w-full h-24"
        />
        <button type="submit">Submit</button>
      </form>
<button
  className="bg-blue-500 text-white rounded p-2 px-4 mt-4"
  onClick={getGoalOfTheDay}
  disabled={isLoading} // Disable the button while loading
>
  {isLoading ? 'Loading...' : 'Proceed to Task Allocation'}
</button>
    </div>
  );
case 'currentProgress':
return (
  <>
    <form
    onSubmit={submitProgress}
className="bg-orange-300 border-2 border-orange-500 flex flex-col p-4 mt-4"


    >
                  <label htmlFor="totalHours" className="text-xl text-center mt-4">
                    Total hours you would like to commit to your goal goal:
                  </label>
                  <input
                    id="totalHours"
                    type="number"
                    min="0"
                    value={totalHours || ''}
                    onChange={(e) => setTotalHours(Number(e.target.value))}
                    className="p-2 mb-2 bg-orange-200 rounded mt-2"
                  />

      <label htmlFor="currentProgress" className="text-xl text-center mt-2">
        Current progress towards your goal:
      </label>
      <textarea
        id="currentProgress"
        value={currentProgress || ''}
        onChange={(e) => setCurrentProgress(e.target.value)}
        className="p-2 mb-2 bg-orange-200 rounded mt-4"
      />
<div className="flex justify-center items-center">
  <button className="bg-orange-500 p-2 w-24 rounded-xl  font-bold flex justify-center items-center" type="submit">
    <FaLongArrowAltRight className="text-4xl"/>
  </button>
</div>  </form>
{goalAdvice && (
  <div className="bg-orange-200 p-5 rounded-md">
    <h2 className="text-gray-700 mb-2">Goal Advice</h2>
    <p className="mb-2"><strong>Advice:</strong> {goalAdvice.helpfulAdvice}</p>
    <p className="mb-2"><strong>Tip 1:</strong> {goalAdvice.tip1}</p>
    <p className="mb-2"><strong>Tip 2:</strong> {goalAdvice.tip2}</p>
    <p className="mb-2"><strong>Tip 3:</strong> {goalAdvice.tip3}</p>
  </div>
)}


  </>
);
    case 'taskAllocation':
      return (
        <div className="mt-4">
              <label htmlFor="totalHours" className="text-xl text-center mt-4">
                Total hours you would like to commit to your goal goal:
              </label>
              <input
                id="totalHours"
                type="number"
                min="0"
                value={totalHours || ''}
                onChange={(e) => setTotalHours(Number(e.target.value))}
                className="p-2 mb-2 bg-orange-200 rounded"
              />

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const hours = Array.from(e.target.elements)
                .filter((element) => element.name === 'taskHours')
                .map((input) => Number(input.value));
              const total = hours.reduce((a, b) => a + b, 0);
              setStep("currentProgress")
              if (total > totalHours) {
                alert('The sum of the allocated hours cannot exceed the total hours.');
                return;
              }
              setTaskHours(
                verbs.map((verb, index) => ({
                  task: verb,
                  hours: hours[index],
                }))
              );
            }}
            className="flex flex-col items-center w-[90vw] max-w-[400px] mt-8 p-2 bg-orange-300 mt-4"
          >
            <label htmlFor="hoursPerWeek" className="text-xl text-center mt-4">
              Allocate hours to each task:
            </label>
            {verbs.map((verb, index) => (
              <div key={index} className="flex justify-between items-center w-full mt-2">
                <span>{verb}</span>
                <input
                  name="taskHours"
                  type="number"
                  min="0"
                  className="p-2 mb-2 bg-orange-200 rounded"
                />
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white rounded p-2 px-4 mt-4">
              Submit
            </button>
          </form>
        </div>
      );
          case 'displayGoal':
            return (
              <div className="text-xl text-center mt-12">
<h2>{'Create Tomorrow\'s Goal'}</h2>
<div className=" w-[90vw] ">
                  <textarea
                    className=" border-2 border-orange-500 rounded-xl text-xl text-center mt-12 w-full bg-orange-200 h-[200px] p-2 mt-4"
                    value={goalOfTheDay}
                    onChange={(e) => setGoalOfTheDay(e.target.value)}
                  />
</div>
<div className="mt-4">
<Link className="bg-orange-500 font-bold text-white p-4 rounded-xl  " href="/Login">Sign Up to to Track</Link>
</div>
              </div>
            );
            // Add more cases for additional steps here
            default:
              return null;
          }
        })()}
      </>
    )}
  </div>
  )
}

//      <form
//        onSubmit={(e) => {
//          e.preventDefault();
//          const hours = Array.from(e.target.elements)
//            .filter((element) => element.name === 'taskHours')
//            .map((input) => Number(input.value));
//          const total = hours.reduce((a, b) => a + b, 0);
//          if (total > totalHours) {
//            alert('The sum of the allocated hours cannot exceed the total hours.');
//            return;
//          }
//          setTaskHours(
//            verbs.map((verb, index) => ({
//              task: verb,
//              hours: hours[index],
//            }))
//          );
//        }}
//        className="flex flex-col items-center w-[90vw] max-w-[400px] mt-8 p-2 bg-orange-300 mt-4"
//      >
//
//        <label htmlFor="hoursPerWeek" className="text-xl text-center mt-4">
//          Allocate hours to each task:
//        </label>
//        {verbs.map((verb, index) => (
//          <div key={index} className="flex justify-between items-center w-full mt-2">
//            <span>{verb}</span>
//            <input
//              name="taskHours"
//              type="number"
//              min="0"
//              className="p-2 mb-2 bg-orange-200 rounded"
//            />
//          </div>
//        ))}
//        <button type="submit" className="bg-blue-500 text-white rounded p-2 px-4 mt-4">
//          Submit
//        </button>
//      </form>