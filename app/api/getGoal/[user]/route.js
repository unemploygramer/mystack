import { NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import JournalEntry from "../../../../models/JournalEntry";
import crypto from 'crypto';
import { redirect } from 'next/navigation'
import Goal from "../../../../models/Goal";



export async function GET(req,context) {
  const {user} = context.params;
  console.log(user, "the user")
  try{
    await connect();
const userGoal = await Goal.findOne({owner: user})
    console.log("User goal:", userGoal);
    return NextResponse.json({userGoal: userGoal})
  } catch (error) {
    console.log(error)
    return NextResponse.error({message: "An error occurred while fetching the user's goal"})
  }
}