import Image from "next/image";
import JournalInput from "./components/JournalInput";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/authOptions";
import Credits from "./components/Credits";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session, "the session");
  return (
    <main className="">
      <div className="">
      <Credits/>
 <h1 className="">My Stack</h1>
<JournalInput/>
      </div>
    </main>
  );
}
