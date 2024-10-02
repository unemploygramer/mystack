import { NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import JournalEntry from "../../../../models/JournalEntry";
import crypto from 'crypto';
import { redirect } from 'next/navigation'
import Subgoal from '../models/Subgoal'; // Assuming you have a Subgoal model



export async function GET(req,context) {
  const {id} = context.params;
  console.log(user, "the user")
  try{
    await connect();
const subGoal = await Subgoal.findOne({_id: id})
    console.log("sub goal", userGoal);
    return NextResponse.json({userGoal: userGoal})
  } catch (error) {
    console.log(error)
    return NextResponse.error({message: "An error occurred while fetching the user's goal"})
  }
}