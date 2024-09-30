import { connect } from "../../../utils/config/dbConfig";
import Goal from "../../../models/Goal";
import { NextResponse, NextRequest } from "next/server";
import Subgoal from "../../../models/Subgoal";

export async function POST(req) {
  try {
    const { goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, owner, subgoals } = await req.json();
    console.log(owner,"the owner in the saveGoal route%%%%%%%%%%%%%%%%%%%%%%%%%%")
    console.log('Request body:', { goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, owner, subgoals });
    await connect();

    // Create new subgoals
    const newSubgoals = await Promise.all(subgoals.map(subgoal => Subgoal.create(subgoal)));

    // Create new goal with subgoals
    const newGoal = await Goal.create({ goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, owner, subgoals: newSubgoals.map(subgoal => subgoal._id) });
    console.log('New goal:', newGoal); // Log the new goal

    return NextResponse.json({ message: "Goal saved." }, { status: 201 });
  } catch (error) {
    console.error('An error occurred:', error); // Log the error
    return NextResponse.json(
      { message: "An error occurred while saving the goal." },
      { status: 500 }
    );
  }
}