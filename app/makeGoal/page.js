import React from 'react'
import MakeGoal from "../components/MakeGoal"
import { getServerSession } from 'next-auth'
import authOptions from "../../utils/authOptions";


async function page() {
  const session = await getServerSession(authOptions);
console.log(session,"session")
  return (
<div className=" overflow-x-hidden">
<div className="animate-slideIn ">
   <MakeGoal/>
        </div>
    </div>
  )
}

export default page