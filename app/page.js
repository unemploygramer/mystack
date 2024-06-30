import Image from "next/image";
import JournalInput from "./components/JournalInput";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/authOptions";
import Credits from "./components/Credits";
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session, "the session");
    if (!session) {
      redirect('/login')
    }
  return (
    <main className="">

      <div className="">
 <h1 className="">My Stack</h1>
<JournalInput/>
      </div>
    </main>
  );
}
