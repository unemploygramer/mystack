// utils/dbConnect.js

import {connect} from "../../../utils/config/dbConfig"
import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
 
  await connect();
  try {
    const { email, password } = await request.json();

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
  
      email,
      password: hashedPassword,
      credits: 5
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}