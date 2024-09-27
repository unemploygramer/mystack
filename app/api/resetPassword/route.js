// my-app/app/api/resetPassword/route.js
import {connect} from "../../../utils/config/dbConfig"
import User from "../../../models/User";
import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const {email} = await req.json();
    await connect();

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    // Generate a token
    const token = crypto.randomBytes(20).toString('hex');
    const resetLink = `http://localhost:3000/reset-password-request/${token}`;

    // Update user record with reset token
    user.resetToken = token;
    await user.save();

    // Create a transporter object
    let transporter = nodemailer.createTransport({
      service: 'gmail', // replace with your email service
      auth: {
        user: 'affirmlyapp@gmail.com', // replace with your email
        pass: 'tdgw wdpv qthy iuib' // replace with your password
      }
    });

    // Use the sendMail method of the transporter object
    let mailOptions = {
      from: 'affirmlyapp@gmail.com', // sender's email
      to: email, // receiver's email
      subject: 'Reset Password', // Subject
      text: `You requested to reset your password. Please click on the following link to reset your password: ${resetLink}` // plain text body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error, "error of email");
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    return NextResponse.json({ message: "Reset password email sent." }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while resetting the password." },
      { status: 500 }
    );
  }
}