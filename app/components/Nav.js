"use client";
import { useState, useEffect } from "react";
import Link from 'next/link'
//import Hamburger from "./Hamburger";
import {useSession} from "next-auth/react"
import { signOut } from "next-auth/react";
import { getServerSession } from 'next-auth/next';
import Credits from "../components/Credits"
import { IoMenu } from "react-icons/io5";
import { v4 as uuidv4 } from 'uuid';

function Nav() {

  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
const [userId, setUserId] = useState(null);
  const [guestCredits, setGuestCredits] = useState(0);

  useEffect(() => {
    let userId = localStorage.getItem("userId");
        let credits = localStorage.getItem("guestCredits");
      if (!credits) {
        credits = 3;
        localStorage.setItem("guestCredits", credits);
      }
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    setUserId(userId);
  }, []);





  const StyleRender = () => {
    if (open === true) {
      return "animate-slideIn";
    } else {
      return "animate-slideOut pointer-events-none";
    }
  };

 
  return (
    <div className=" z-50 bg-gray-600  h-20 flex items-center justify-end  pr-4 pl-2   fixed top-0 w-full">
       <div>


           <div>
        <label className="h-0">

        </label>
      </div>

         <button onClick={()=> setOpen(true)} className="z-73 bg-amber-600  text-4xl p-1 rounded-md text-white">
          <IoMenu />
          </button>

      <div onClick={()=> setOpen(false)}
        className={` ${StyleRender()}  fixed w-screen h-screen top-0 right-0`}
      >
      </div>
        <div className={`${StyleRender()} z-5 fixed h-screen w-1/2 top-0 right-0 bg-gray-600 flex items-center flex-col`}>
           <Link onClick={()=> setOpen(false)} className="text-stone-100 p-4 text-2xl text-center" href="/List">Entries</Link>
           <Link onClick={()=> setOpen(false)} className="text-stone-100 p-4 text-2xl text-center" href="/">Make Entry</Link>
           <Link onClick={()=> setOpen(false)} className="text-stone-100 p-4 text-2xl text-center" href="/login">Login</Link>
                      <Link onClick={()=> setOpen(false)} className="text-stone-100 p-4 text-2xl text-center" href="/SignUp">Sign Up</Link>



           <button onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })} className="text-stone-100 p-4 text-2xl text-center" >Log out</button>

        </div> </div>

    </div>
  );
}

export default Nav;
