
"use client";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"


export default function JournalInput () {
  const [text, setText] = useState('');
  const characterCount = text.length;
  const [data, setData] = useState(null)
    const { data: session } = useSession();
    console.log(session, "session in journal input")
  const [isLoading, setLoading] = useState(false)
    const fetchData = async () => {
      try {
      const makeJournalPayload = {
        "text": text,
        "owner": session.user.email,
        "affirmation": "" }
      const saveJournal = await fetch('/api/makeJournal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(makeJournalPayload)
      });

    const journalEntry = await saveJournal.json();

  const response = await fetch('/api/submitWord', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({affirmation: text})
  });
    const affirmationBody = await response.json();
console.log(affirmationBody,"the affirmation body")
console.log(typeof(affirmationBody),"the type of affirmation body")

 const affirmation = affirmationBody.affirmation;
    const updateAffirmation = await fetch('/api/saveAffirmation', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: journalEntry.journalEntry._id, affirmation: affirmation})
    });
    if (updateAffirmation.ok) {
      setText(''); // Clear the textarea if the request was successful
    }


        setData(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);
      }
    };


  useEffect(() => {



  }, [text]);
  if (!session) {
    return (
      <div className="dark:bg-gray-800 w-4/5 max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
        <h2 className="text-white mb-4">Please sign in to make a journal entry</h2>
        <button onClick={signIn} className="px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none">Sign In</button>
      </div>
    );
  }



  return (
    <div className="dark:bg-gray-800 w-4/5 max-w-2xl mx-auto p-6 rounded-lg shadow-lg">
      <h2 className="text-white mb-4">Journal Entry</h2>
      <textarea
        className="w-full px-3 py-2 h-[400px] mb-3 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        placeholder="Write something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <p className="text-black">{characterCount} characters</p>
      <button onClick={fetchData} className="px-3 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none" disabled={text.length === 0}>Submit</button>
    </div>
  );
}