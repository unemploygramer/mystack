import { connect } from "../../../utils/config/dbConfig";
import Goal from "../../../models/Goal";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req) {
  try {
    const { goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, userId } = await req.json();
    console.log('Request body:', { goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, userId }); // Log the request body

    await connect();

    // Create new goal
    const newGoal = await Goal.create({ goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, userId });
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