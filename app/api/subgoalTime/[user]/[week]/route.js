import { NextResponse } from "next/server";
import {connect} from "../../../../../utils/config/dbConfig"
import Subgoal from '../../../../../models/Subgoal'; // Assuming you have a Subgoal model

export async function GET(req, context) {
  const { user, week} = context.params; // Extract date from params
  try {
    const decodedDate = decodeURIComponent(week); // Decode the date string
//2024-10-11T02%3A00%3A37.298%2B00%3A00
    const subGoals = await Subgoal.find({ owner: user, weekNumber: week }); // Find subgoals with the given id and dueDate
    return NextResponse.json({ subGoals: subGoals });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ message: "An error occurred while fetching the user's goal" });
  }
}