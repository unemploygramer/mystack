import React from 'react'
import SignUp from "../components/SignUp"
import LoginComponent from "../components/LoginComponent"
import {redirect} from "next/navigation"
import { getServerSession } from 'next-auth'
import { authOptions } from "../api/auth/[...nextauth]/route"
async function page() {
  const session = await getServerSession(authOptions);
console.log(session,"session")
  return (
    <div>
        <LoginComponent/>
    </div>
  )
}

export default page