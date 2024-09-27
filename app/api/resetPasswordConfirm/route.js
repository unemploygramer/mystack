// my-app/app/api/resetPasswordConfirm/route.js
import {connect} from "../../../utils/config/dbConfig"
import User from "../../../models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await connect();

    // Find user with the token
    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400 }
      );
    }

    // Update user password and remove reset token
    user.password = hashedPassword;
    user.resetToken = null;
    await user.save();

    return NextResponse.json({ message: "Password reset successfully." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while resetting the password." },
      { status: 500 }
    );
  }
}