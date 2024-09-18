import Image from "next/image";
import JournalInput from "./components/JournalInput";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/authOptions";
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
  return (
    <main className="">
<Title/>

<JournalInput/>

    </main>
  );
}
