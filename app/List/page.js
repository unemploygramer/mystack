import SignUp from "../components/SignUp"
import {redirect} from "next/navigation"
import { getServerSession } from 'next-auth'
import { authOptions } from "../api/auth/[...nextauth]/route"
import React from 'react';
import Link from 'next/link'



async function fetchData() {
const session = await getServerSession(authOptions)
console.log(session, "the session")
  if (!session) {
    redirect('/') // replace with your redirect path
    return;
  }
const user = session.user.email;

  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/myJournals/${user}`, {
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

async function page() {
  const data = await fetchData()
  console.log(data,"the data")

  return (
    <div className="container mx-auto px-4 py-8 mt-24">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {data.userJournals.map((journal) => (
        <Link href="/journal/[id]" as={`/journal/${journal._id}`}>
          <div key={journal._id} className="bg-violet-950 shadow overflow-hidden sm:rounded-lg p-6">
            <h2 className="text-md font-bold text-white">{journal.text}</h2>
            <div className="bg-violet-900 p-2 rounded mt-4 mb-4">
              <p className="text-gray-200 text-2xl ">{journal.affirmation}</p>
            </div>
            <p className="text-sm text-gray-300">{new Date(journal.date).toLocaleDateString()}</p>
          </div>
        </Link>
        ))}
      </div>
    </div>
  );
}

export default page;