import Image from "next/image";
import JournalInput from "./components/JournalInput";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../utils/authOptions";
export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session, "the session");
  return (
    <main className="">
      <div className="">
 <h1 className="">My Stack</h1>
<JournalInput/>
      </div>
    </main>
  );
}
