import React from 'react'
import SignUp from "../components/SignUp"
import LoginComponent from "../components/LoginComponent"
import {redirect} from "next/navigation"
import { getServerSession } from 'next-auth'
import { authOptions } from "../api/auth/[...nextauth]/route"
import Title from "../components/Title"
async function page() {
  const session = await getServerSession(authOptions);
console.log(session,"session")
  return (
<div className="animate-slideIn overflow-x-hidden">    <Title/>
        <LoginComponent/>
    </div>
  )
}

export default page