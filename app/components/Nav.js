"use client";
import { useState } from "react";
import Link from 'next/link'
//import Hamburger from "./Hamburger";
import {useSession} from "next-auth/react"
import { signOut } from "next-auth/react";
import { getServerSession } from 'next-auth/next';
import Credits from "../components/Credits"



function Nav() {

  const [open, setOpen] = useState(false);
  const { data: session } = useSession();

  const StyleRender = () => {
    if (open === true) {
      return "animate-slideIn";
    } else {
      return "animate-slideOut pointer-events-none";
    }
  };

 
  return (
    <div className=" z-30 bg-gray-800  h-20 flex items-center justify-end  pr-4 pl-2   fixed top-0 w-full">
       <div>      <div>
        <label className="h-0">
        </label>
      </div>
  <button onClick={()=> setOpen(true)} className="bg-violet-500 p-1 rounded-md">
Menu
  </button>

      <div onClick={()=> setOpen(false)}
        className={` ${StyleRender()}  fixed w-screen h-screen top-0 right-0`}
      >
      </div>
        <div className={`${StyleRender()} z-20 fixed h-screen w-1/2 top-0 right-0 bg-gray-800 flex items-center flex-col`}>
           <Link onClick={()=> setOpen(false)} className="text-stone-100 p-4 text-2xl text-center" href="/List">Entries</Link>
           <Link onClick={()=> setOpen(false)} className="text-stone-100 p-4 text-2xl text-center" href="/">Make Entry</Link>

           <button onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })} className="text-stone-100 p-4 text-2xl text-center" >Log out</button>
     
        </div> </div> 

    </div>
  );
}

export default Nav;
