// utils/dbConnect.js

import {connect} from "../../../utils/config/dbConfig"
import bcryptjs from "bcryptjs";
import User from "../../../models/User";
import { NextResponse, NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import crypto from 'crypto';
export async function POST(request) {
 // Generate a token

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
// Generate a token
const token = crypto.randomBytes(20).toString('hex');
const confirmationLink = `http://localhost:3000/confirm-email?token=${token}`;

// Save the token in your database associated with the user
newUser.emailToken = token;
    const savedUser = await newUser.save();

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



    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}