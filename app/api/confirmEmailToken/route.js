// my-app/app/api/confirmEmailToken/route.js
import {connect} from "../../../utils/config/dbConfig"
import User from "../../../models/User";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { token } = await req.json();
    await connect();

    // Find user with the token
    const user = await User.findOne({ emailToken: token });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    // Update user record
    user.emailToken = null;
    user.emailConfirmed = true;
    user.subscription = "trial";
    user.trialStart = new Date();
    await user.save();

    return NextResponse.json({ message: "Email confirmed. Free trial started." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while confirming the email." },
      { status: 500 }
    );
  }
}