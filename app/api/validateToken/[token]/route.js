// my-app/app/api/validateToken/[token]/route.js
import {connect} from "../../../../utils/config/dbConfig"
import User from "../../../../models/User";
import { NextResponse } from "next/server";


//export async function GET(req) {
export async function GET(req, context) {
  try {
    const { token } = context.params;

    console.log(token, 'token!!!!!!!!!!!!!!!!!!!!');
    await connect();

    const user = await User.findOne({ resetToken: token });
    if (!user) {
      return NextResponse.json({ valid: false }, { status: 400 });
    }

    return NextResponse.json({ valid: true }, { status: 200 });
  } catch (error) {
    console.log(error, 'error of validate token^^^^^^^^^^^^^^^^^^^^');
    return NextResponse.json(
      { message: 'An error occurred while validating the token.' },
      { status: 500 }
    );
  }
}