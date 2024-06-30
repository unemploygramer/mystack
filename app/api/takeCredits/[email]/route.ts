import { NextRequest, NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import User from "../../../../models/User"

export const POST: any = async (req: NextRequest, context: any) => {
  try {
    const {email} = await context.params;
    await connect();

    // Fetch the user
    const fetchedUser = await User.findOne({email:email});

    // Check if the user has enough credits
    if (fetchedUser.credits < 1) {
      return NextResponse.json({ message: "Not enough credits" }, { status: 400 });
    }

    // Subtract one credit
    fetchedUser.credits -= 1;

    // Save the updated user
    await fetchedUser.save();

    // Return the updated credit count
    return NextResponse.json(fetchedUser.credits);
  } catch (error) {
    console.log(error);
    return NextResponse.error;
  }
};