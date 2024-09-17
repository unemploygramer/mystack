import React from 'react'
import SignUp from "../components/SignUp"
import {redirect} from "next/navigation"
import { getServerSession } from 'next-auth'
//import { authOptions } from "../api/auth/[...nextauth]/route"
import authOptions from "../../utils/authOptions";
import Title from "../components/Title"

async function page() {
  const session = await getServerSession(authOptions);
console.log(session,"session")
  return (
    <div className="animate-slideIn ">
    <Title />
        <SignUp/>
    </div>
  )
}

export default page