import { NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import Subgoal from '../../../../models/Subgoal'; // Assuming you have a Subgoal model

export async function GET(req, context) {
  const { user } = context.params; // Extract user from params
  try {
    await connect();
    const subGoals = await Subgoal.find({ owner: user }); // Find all subgoals for the given user
    return NextResponse.json({ subGoals: subGoals });
  } catch (error) {
    console.log(error);
    return NextResponse.error({ message: "An error occurred while fetching the user's subgoals" });
  }
}