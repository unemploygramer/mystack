import Image from "next/image";
import JournalInput from "./components/JournalInput";
import { getServerSession } from "next-auth/next";
import authOptions from "../utils/authOptions";
import Credits from "./components/Credits";
import { redirect } from 'next/navigation'
import Title from "./components/Title"
import RecordAudio from "./components/RecordAudio";
export default async function Home() {
  const session = await getServerSession(authOptions);
//  console.log(session, "the session");
//    if (!session) {
//      redirect('/login')
//    }

const getNextSevenDays = () => {
  const days = [];
  const today = new Date(); // Get today's date

  for (let i = 0; i < 7; i++) {
    const nextDay = new Date(today); // Create a new date object
    nextDay.setDate(today.getDate() + i); // Add 'i' days to the current date
    days.push(nextDay);
  }

  return days;
};
  const days = getNextSevenDays(); // Get the next 7 days


  return (
    <main className="">
<Title/>

<JournalInput/>
    <div>
      <h2>Weekly Calendar</h2>
      <ul>
        {days.map((day, index) => (
          <li key={index}>
            {day.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </li>
        ))}
      </ul>
    </div>
    </main>
  );
}
