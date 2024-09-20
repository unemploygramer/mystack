"use client"

import { useState, useEffect } from 'react';
import LoadingSpinner from './LoadingSpinner';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
export default function CreateGoal() {
  const [goalText, setGoalText] = useState('');
  const [renderedGoal, setRenderedGoal] = useState('');
  const [verbs, setVerbs] = useState([]);
  const [step, setStep] = useState('stateGoal');
  const [isLoading, setIsLoading] = useState(false); // New state for loading
  const [newVerb, setNewVerb] = useState(''); // New state for the input value
const [taskHours, setTaskHours] = useState([]);
const [totalHours, setTotalHours] = useState(0);
const [availableHours, setAvailableHours] = useState(null);

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
  return(
  <div className="flex justify-center flex-col items-center">
    <h1 className="text-3xl">Create 12 Month Goal</h1>

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
                  <form onSubmit={fetchData}>
                    <textarea
                      className=" flex flex-col w-[90vw] max-w-[400px] mt-8 h-24 p-2 bg-orange-300 mt-4 "
                      value={goalText}
                      onChange={(e) => setGoalText(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 text-white rounded p-2 px-4 mt-4"
                    >
                      Submit
                    </button>
                  </form>
                </>
              );
            case 'verb':
              return (
                   <div className="">
                     <h2 className="text-xl text-center mt-4">{renderedGoal}</h2>
                     <h2 className="text-xl text-center mt-4">Add all the actions needed to make the goal.</h2>
                     <div className=" w-screen flex justify-center  flex-col items-center">
                       <ul className="bg-gray-800 w-[90vw] max-w-[300px] h-[270px] mt-12 overflow-auto rounded-xl ">
                         {verbs.map((verb, index) => (
                           <li key={index} className="bg-orange-400 p-2 m-2 rounded-md">
                             <button
                               className="bg-red-600 text-gray-300  p-2 rounded mr-3"
                               onClick={() => deleteVerb(index)}
                             >
                               <FaRegTrashAlt />

                             </button>

                             {verb}
                           </li>
                         ))}
                       </ul>
<div className=" flex justify-center items-center mt-4 p-4 bg-gray-500 w-screen-[90vw] p-2 rounded-xl">
                       <form onSubmit={addVerb}>
<div className="flex justify-center items-center">
    <input
        className="p-2 mb-2 bg-orange-200 rounded"
        type="text"
        value={newVerb}
        onChange={(e) => setNewVerb(e.target.value)}
    />
</div>
                         <div className=" flex justify-center">
                         <button className="bg-orange-400 p-1 font-bold rounded-md p-2" type="submit">Add Action</button>
                            </div>
                       </form>
</div>
// Add onClick event handler to the button
<button
  className="bg-orange-600 mt-4 text-black  font-bold w-24 rounded flex justify-center items-center"
  onClick={() => setStep('timeAllocation')}
>
  <FaLongArrowAltRight  className="text-4xl"/>
</button>

                     </div>
                   </div>
              );
case 'timeAllocation':
  return (
    <>
            <label htmlFor="totalHours" className="text-xl text-center mt-4">
              Total hours:
            </label>
<form onSubmit={(e) => {
  e.preventDefault(); // Prevent the default form submission
  setTotalHours(Number(e.target.totalHours.value)); // Set the total hours to the input value
}}>
  <input
    id="totalHours"
    type="number"
    min="0"
    value={totalHours}
    onChange={(e) => setTotalHours(Number(e.target.value))}
    className="p-2 mb-2 bg-orange-200 rounded"
  />
  <button type="submit">Submit</button>
</form>

      <div className="mt-4">
        {taskHours.map((taskHour, index) => (
          <div key={index} className="bg-orange-200 p-2 rounded mt-2">
            <span>{taskHour.task}: </span>
            <span>{taskHour.hours} hours</span>
          </div>
        ))}
      </div>
    </>
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