

import { getServerSession } from 'next-auth'
import { authOptions } from "../../api/auth/[...nextauth]/route"
import React from 'react';
import Link from 'next/link';




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


  return (
  <div className="container mx-auto px-4 py-8 mt-24">
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
      <div key={journal._id} className="bg-violet-950 shadow overflow-hidden sm:rounded-lg p-6">
        <h2 className="text-md font-bold text-white">{journal.text}</h2>
        <div className="bg-violet-900 p-2 rounded mt-4 mb-4">
          <p className="text-gray-200 text-2xl ">{journal.affirmation}</p>
        </div>
        <p className="text-sm text-gray-300">{new Date(journal.date).toLocaleDateString()}</p>
      </div>
    </div>
  </div>
  );
}

export default page;