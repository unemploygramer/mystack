"use client"
import React, { useState, useEffect } from 'react';

import { signIn, useSession } from 'next-auth/react';

const MakeGoal= () => {
  const [chat, setChat] = useState([

  {role: 'system', content: 'What is an area in your life that you would like to improve or change?'},
  {role: 'user', content: 'im not sure yet? i am working on my programming projects and trying to make money from them'},

  ]);
  const [inputValue, setInputValue] = useState(''); // Add this line

const fetchData = async () => {
  const aiResponse = await fetch('/api/findGoal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
     body: JSON.stringify({chat: chat})
  });

  if (aiResponse.ok) { // check if HTTP status is 2xx
    const text = await aiResponse.text();
    if (text) { // check if the response body is not empty
      const AiText = JSON.parse(text);
      console.log(AiText, "the AiText");
        setChat([...chat, {role: "system", content: AiText.question}]);
    } else {
      console.log("Empty response");
    }
  } else {
    console.log(`HTTP error! status: ${aiResponse.status}`);
  }
};
console.log(chat,"the chat")
  const handleSubmit = (event) => {
    event.preventDefault();
    setChat([...chat, {role: 'user', content: inputValue}]);
    setInputValue('');
  };
return (
    <div className="mt-32 w-screen">
      <h1 className="text-4xl font-bold mb-4">Make a Goal</h1>
      <div className="bg-red-500 w-full justify-center flex">
        <button className="bg-orange-400 p-4 " onClick={fetchData}>Don't know my goal yet</button>
      </div>
      <div className="mt-4 flex flex-col  w-screen items-center">
        <div className="w-[90%] max-w-[400px]">
          {chat.map((message, index) => (
            <div key={index} className={`p-2 border-b border-gray-200 ${message.role === 'system' ? '  text-right' : ''}`}>
              <p className={`${message.role === 'system' ? ' text-white text-right' : ''}`}>{message.role}:</p>
              <p className={`${message.role === 'system' ? 'bg-blue-500 text-white text-right py-2 rounded-full px-8' : message.role === 'user' ? 'bg-orange-500 text-white py-2 rounded-full px-8' : ''}`}>{message.content}</p>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}> {/* Add this form */}
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            className="mt-4 bg-white border border-gray-300 rounded py-2 px-4"
          />
          <button type="submit" className="mt-2 bg-blue-500 text-white rounded py-2 px-4">
            Submit
          </button>
        </form>
      </div>
    </div>
)

}

export default MakeGoal;