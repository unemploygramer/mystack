
"use client";
import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation';



export default function JournalInput () {
  const router = useRouter();
let userId;
let FreeCredits;
if (typeof window !== 'undefined') {
  userId = window.localStorage.getItem("userId");
          FreeCredits = localStorage.getItem("guestCredits");


}
  const [text, setText] = useState('');
  const characterCount = text.length;
  const [data, setData] = useState(null)
    const { data: session } = useSession();
  const [isLoading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null); // Add this line
  const maxCharacterCount = 3900; // Set the maximum character count
  const [affirmation, setAffirmation] = useState(''); // Add this line
  const [journalEntry, setJournalEntry] = useState(''); // Add this line

    const fetchData = async () => {
        setLoading(true); // Set loading state to true when fetching starts

      try {


    let credits;
if (session && session.user) {
  const creditsResponse = await fetch(`/api/getCredits/${session.user.email}`);
  credits = await creditsResponse.json();
} else {
      credits = FreeCredits;
      if (credits > 0) {
        credits--;
        window.localStorage.setItem("guestCredits", credits);
      }
    }
    if (credits < 1) {
      console.error('Not enough credits');
      setErrorMessage('Not enough credits'); // Set the error message
      if (!session.user) {
        alert("You are out of credits");
      }
      setLoading(false);
      return;
    }






let makeJournalPayload;
if(session && session.user) {

console.log(session,"the if statement ran in session")
       makeJournalPayload = {
        "text": text,
   "owner": session && session.user ? session.user.email : userId,
        "affirmation": "" }
        } else {
            console.log(session,"the else statement ran in session")
        makeJournalPayload= {
        "text": text,
        "owner": userId,
        "affirmation": ""
        }


        }

console.log(makeJournalPayload,"the makeJournalPayload")
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

    // Subtract one credit
    if(session!==null && session.user!==null) {
   const tookCreds = await  fetch(`/api/takeCredits/${session.user.email}`, { method: 'POST' });
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
        };
 const affirmation = affirmationBody.affirmation;
    const updateAffirmation = await fetch('/api/saveAffirmation', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: journalEntry.journalEntry._id, affirmation: affirmation})
    });
    if (updateAffirmation.ok) {
          router.replace(`/newJournal/${journalEntry.journalEntry._id}` );


    }
      } catch (error) {
        console.error('Failed to fetch profile data:', error);

            setLoading(false); // Set loading state back to false when fetching is complete
      }
    };


  useEffect(() => {



  }, [text]);
    //  if (!session) {
    //    redirect('/login')
    //  }



  return (
    <div className="dark:bg-gray-400 w-full flex justify-center flex-col max-w-2xl mx-auto  p-6 rounded-lg ">

          {isLoading ? (
          <div className="flex justify-center h-24 items-center">
            <p className="text-2xl text-black-700 font-bold">Loading...</p>
            </div>
            // Display loading message when isLoading is true
          ) : (
            <div className=" flex items-center flex-col">

<textarea
  className="w-full p-2 placeholder-orange-800 px-3 h-[300px] mb-3  bg-orange-200 rounded-md focus:outline-none shadow-lg"
  placeholder="What's on your mind?"
  value={text}
  onChange={(e) => {
    if (e.target.value.length <= maxCharacterCount) {
      setText(e.target.value);
      setErrorMessage(null); // Clear the error message when the text length is within the limit
    } else {
      setErrorMessage('You have reached the maximum character limit.'); // Set the error message when the text length exceeds the limit
    }
  }}
></textarea>
<div className="w-full  flex flex-col justify-center items-center">
              <p className="text-black">{characterCount} characters</p>
              <button onClick={fetchData} className="px-3 py-2 bg-amber-500  bg--500 rounded-md hover:bg-amber-600 focus:outline-none" disabled={text.length === 0}>Get Affirmation</button>
                    {errorMessage && <p className="text-red-700 font-bold">{errorMessage}</p>} {/* Render the error message in red if it exists */}
</div>
            </div>
          )}
    </div>
  );
}