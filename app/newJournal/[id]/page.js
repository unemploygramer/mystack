

import { getServerSession } from 'next-auth'
//import { authOptions } from "../../api/auth/[...nextauth]/route"
import authOptions from "../../../utils/authOptions";
import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation'
import GenerateVoice from "../../components/GenerateVoice"




async function fetchData(id) {


  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/journalEntry/${id}`, {
      method: 'GET',

    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function page({params}) {
  const id = params.id
  const data = await fetchData(id)
  console.log(data,"the data")
  console.log(params, "the params")
  const journal = data.userJournals[0];
  console.log(journal, "the journal")
    const session = await getServerSession(authOptions);
    console.log(session, "the session");
   let userId;

   if (typeof window !== 'undefined') {
     userId = window.localStorage.getItem("userId");


   }
   console.log(userId,"the userId")
if (journal.owner.includes('@')) {
 redirect('/login')
}
//      <GenerateVoice affirmation={journal.affirmation} />
  return (
<div className="container mx-auto px-4 py-8 mt-24">
  <div className="flex justify-center items-center flex-wrap gap-6">
    <div key={journal._id} className="overflow-hidden sm:rounded-lg p-6 bg-orange-300 ">
      <div className="shadow bg-orange-400 p-2 rounded mt-4 mb-4 rounded-xl">
        <p className="text-white text-2xl text-center p-5">{journal.affirmation}</p>
      </div>

      <h2 className="mt-6 text-md font-bold text-center">{journal.text}</h2>
      <p className="text-sm text-gray-300">{new Date(journal.date).toLocaleDateString()}</p>
    </div>
  </div>
</div>

  );
}

export default page;