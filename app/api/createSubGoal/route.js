import { connect } from "../../../utils/config/dbConfig";
import Subgoal from "../../../models/Subgoal";
import Goal from "../../../models/Goal";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { goalId, goalText, weekNumber, advice, feedback, progress, timeSpent, completionStatus, userNotes, goalOutcome, goalType, owner } = await req.json();
    await connect();

    // Create new subgoal
    const newSubgoal = await Subgoal.create({
      goalText,
      weekNumber,
      advice,
      feedback,
      progress,
      timeSpent,
      completionStatus,
      userNotes,
      goalOutcome,
      goalType,
      owner,
      dueDate: goalType === 'weekly' ? Date.now() + 7 * 24 * 60 * 60 * 1000 : Date.now() + 24 * 60 * 60 * 1000,
    });

    // Update the main goal to include the new subgoal reference
    await Goal.findByIdAndUpdate(goalId, { $push: { subgoals: newSubgoal._id } });

    return NextResponse.json({ message: "Subgoal created.", subgoal: newSubgoal }, { status: 201 });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json(
      { message: "An error occurred while creating the subgoal." },
      { status: 500 }
    );
  }
}