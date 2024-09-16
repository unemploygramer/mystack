"use client"

import { useState, useEffect, useRef } from 'react';




export default function GenerateVoice ({affirmation}){
  const [isLoading, setLoading] = useState(false);
  const [voice, setVoice] = useState(null);
  const [error, setError] = useState(null); // New state variable for errors
    const audioRef = useRef();

async function createVoice(){
  const asyncFetch = async (affirmation) => {
    setLoading(true);
    setError(null); // Reset error state when starting a new fetch
    try {
      const res = await fetch(`/api/wordVoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({wordString: affirmation})
      });
      if (!res.ok) {
        throw new Error('Failed to fetch data');
      }
      const blob = await res.blob();
      setVoice(URL.createObjectURL(blob));
      setLoading(false);
    } catch (error) {
      setError("could not find audio");
    } finally {
      setLoading(false);
    }
  };

  asyncFetch(affirmation);
}

return (
    <div className="w-full flex justify-center items-center">
      {voice ? (
        <audio ref={audioRef} src={voice} controls />
      ) : isLoading ? (
        <p>Loading...</p>
      ) : (
        <button onClick={createVoice} className="p-4 bg-amber-500 font-bold text-xl">Hear Affirmation</button>
      )}
    </div>

)


}