import {connect} from "@/utils/config/dbConfig"
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {

    const {email, password } = await req.json();
    console.log(email,password,"$$$$$")
    const hashedPassword = await bcrypt.hash(password, 10);
    await connect();
    await User.create({  email, password: hashedPassword });

    return NextResponse.json({ message: "User registered." }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}