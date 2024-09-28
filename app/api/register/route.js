import {connect} from "../../../utils/config/dbConfig"
import User from "../../../models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req) {
  try {
    const {email, password } = await req.json();
    const hashedPassword = await bcrypt.hash(password, 10);
    await connect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Generate a token
    const token = crypto.randomBytes(20).toString('hex');
    const confirmationLink = `http://localhost:3000/confirm-email/${token}`;

    // Create new user
// Create new user
const newUser = await User.create({ email, password: hashedPassword, emailToken: token, subscription: "free" });
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
      subject: 'Confirm Email to get one week ', // Subject
      text: `Thank you for signing up for Affirmly. Please confirm your email by clicking on the following link: ${confirmationLink}` // plain text body
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error, "error of email");
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

return NextResponse.json({ message: "User registered.", userId: newUser._id }, { status: 201 });  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred while registering the user." },
      { status: 500 }
    );
  }
}