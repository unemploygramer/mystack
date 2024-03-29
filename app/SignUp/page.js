import React from 'react'
import SignUp from "../components/SignUp"
import {redirect} from "next/navigation"
import { getServerSession } from 'next-auth'
import { authOptions } from "../api/auth/[...nextauth]"
async function page() {
  const session = await getServerSession(authOptions);
console.log(session,"session")
  return (
    <div>
        <SignUp/>
    </div>
  )
}

export default page