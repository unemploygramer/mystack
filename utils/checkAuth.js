
import React from 'react'
import { useSession, getSession } from "next-auth/react"
import { redirect } from 'next/navigation'
function checkAuth() {
    const { data: session, status } = useSession()
    if (status === "unauthenticated") {
        return    redirect('/')
      } else if (status === "loading") {
        return <p>Loading...</p>
      }

}

export default checkAuth