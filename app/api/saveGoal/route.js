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
    const newSubgoals = await Promise.all(subgoals.map(subgoal => Subgoal.create({
      ...subgoal,
      dueDate: subgoal.goalType === 'weekly' ? Date.now() + 7 * 24 * 60 * 60 * 1000 : Date.now() + 24 * 60 * 60 * 1000,
    })));

    // Create new goal with subgoals
    const newGoal = await Goal.create({
      goalText,
      verbs, // Make sure to include this
      totalHours,
      currentProgress,
      goalAdvice,
      suggestedGoal,
      owner,
            createdDate: Date.now(),
      subgoals: newSubgoals.map(subgoal => subgoal._id)
    });
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