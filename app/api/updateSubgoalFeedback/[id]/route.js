// File: my-app/app/api/updateSubgoalFeedback/[id]/route.js
import { NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import Subgoal from "../../../../models/Subgoal";

export async function PUT(req, context) {
  const {id} = context.params;
    const body = await req.json();

    const { difficulty, result, additionalComments } = body;
  console.log(difficulty, result, additionalComments, id, "the feedback data")
  try{
    await connect();
    const subgoal = await Subgoal.findById(id);
    if (!subgoal) {
      console.log('Subgoal not found');
      return NextResponse.error({message: "Subgoal not found"});
    }
    console.log('Subgoal found:', subgoal);
    subgoal.feedbackDifficulty = difficulty;
    subgoal.feedbackResult = result;
    subgoal.progress = result;
    await subgoal.save();
    console.log('Subgoal updated successfully:', subgoal);
    return NextResponse.json({message: "Subgoal feedback updated successfully"});
  } catch (error) {
    console.log('An error occurred while updating the subgoal feedback:', error);
    return NextResponse.error({message: "An error occurred while updating the subgoal feedback"});
  }
}