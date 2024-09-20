"use client"
import React, { useState, useEffect ,useRef} from 'react';

import { signIn, useSession } from 'next-auth/react';

const MakeGoal= () => {
  const [chat, setChat] = useState([

  {role: 'assistant', content: 'What is an area in your life that you would like to improve or change?'},

  ]);
  const [inputValue, setInputValue] = useState(''); // Add this line
  const [inputValue, setInputValue] = useState(''); // Add this line
  const divRef = useRef(null);

  useEffect(() => {
    if (chat[chat.length - 1]?.role === 'user') {
      fetchData();
    }
          divRef.current.scrollTop = divRef.current.scrollHeight;

  }, [chat]);

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
      if(AiText.question) {
              setChat([...chat, {role: "assistant", content: AiText.question}]);

      } else if(AiText.advice && AiText.goalSuggestion) {
          setChat([...chat, {role: "assistant", content: `${AiText.advice} ${AiText.goalSuggestion}`}]);
        }
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
    console.log(chat,"the chat in handleSubmit")
//    fetchData();
  };
return (
    <div className="mt-[100px] w-screen">
      <h1 className="text-2xl font-bold  text-center">Find a Goal</h1>

      <div className="mt-4 flex flex-col  w-screen items-center">
        <div ref={divRef}  className="w-[90%] max-w-[400px] bg-gray-300 h-[400px] overflow-auto">
{chat.map((message, index) => (
  <div key={index} className={`p-2 border-b border-gray-200 ${message.role === 'assistant' ? '  text-right' : ''} ${index === chat.length - 1 ? 'mb-8' : ''}`}>
    <p className={`${message.role === 'assistant' ? '  mr-8 p-1 text-right' : ''}`}>{message.role}:</p>
    <p className={`${message.role === 'assistant' ? 'bg-blue-500 text-white text-right py-2 rounded-xl px-8' : message.role === 'user' ? 'bg-orange-500 text-white py-2 rounded-full px-8' : ''}`}>{message.content}</p>
  </div>
))}
        </div>

      </div>
      <div className=" justify-center flex ">
              <form className="flex flex-col" onSubmit={handleSubmit}> {/* Add this form */}
  <textArea
    type="text"
    value={inputValue}
    onChange={e => setInputValue(e.target.value)}
    className="bg-orange-200 h-16 text-wrap w-[90vw] max-w-[400px] mt-2  border border-gray-300 rounded py-2 px-4  whitespace-normal"
  />
                <button type="submit" className="mt-1 bg-blue-500 text-white rounded p-2 px-4 w-24">
                  Submit
                </button>

              </form>
        </div>
    </div>
)

}

export default MakeGoal;

//      <div className="bg-red-500 w-full justify-center flex">
//        <button className="bg-orange-400 p-4 " onClick={fetchData}>Don't know my goal yet</button>
//      </div>