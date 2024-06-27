
"use client";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';



export default function JournalInput () {
  const router = useRouter();

  const [text, setText] = useState('');
  const characterCount = text.length;
  const [data, setData] = useState(null)
    const { data: session } = useSession();
    console.log(session, "session in journal input")
  const [isLoading, setLoading] = useState(false)
    const fetchData = async () => {
        setLoading(true); // Set loading state to true when fetching starts

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
          router.replace(`/journal/${journalEntry.journalEntry._id}` );


    }


        setData(data);
      } catch (error) {
        console.error('Failed to fetch profile data:', error);

            setLoading(false); // Set loading state back to false when fetching is complete
      }
    };


  useEffect(() => {



  }, [text]);
  if (!session) {
    redirect('/login')
  }



  return (
    <div className="dark:bg-gray-400 w-4/5 max-w-2xl mx-auto mt-24 bg-violet-500 p-6 rounded-lg shadow-lg">
      <h2 className="text-white mb-4">Journal Entry</h2>
          {isLoading ? (
          <div className="flex justify-center h-24 items-center">
            <p className="text-2xl text-black-700 font-bold">Loading...</p>
            </div>
            // Display loading message when isLoading is true
          ) : (
            <>
              <textarea
                className="w-full placeholder-violet-800 px-3 py-2 h-[400px] mb-3 text-white bg-violet-400 rounded-md focus:outline-none"
                placeholder="Write something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              ></textarea>
              <p className="text-black">{characterCount} characters</p>
              <button onClick={fetchData} className="px-3 py-2 bg-violet-800 text-white bg--500 rounded-md hover:bg-violet-600 focus:outline-none" disabled={text.length === 0}>Submit</button>
            </>
          )}
    </div>
  );
}