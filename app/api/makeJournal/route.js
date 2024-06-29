import {connect} from "../../../utils/config/dbConfig"
import JournalEntry from "../../../models/JournalEntry";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import User from "../../../models/User";

function encrypt(text) {
  const algorithm = 'aes-256-ctr';
//  const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'; // replace with your own secret key
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, process.env.DECRYPT_KEY, iv);

  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

  return {
    iv: iv.toString('hex'),
    content: encrypted.toString('hex')
  };
}


export async function POST(req) {
try {
await connect();
console.log("Connected to DB")
    // Extract the necessary data from the request
    const { text, owner, affirmation } = await req.json();
        console.log({ text, owner, affirmation },"#### the text owner and affirmation");

    // Fetch the user's credits
    const user = await User.findOne({ email: owner });
console.log(user,"the user ")
    // Check if the user has enough credits
    if (user.credits <= 0) {
      return NextResponse.json({ message: "You do not have enough credits to create a journal entry" }, { status: 400 });
    }
    // Encrypt the journal text
    const encryptedText = encrypt(text);
    console.log(encryptedText);

    // Create a new JournalEntry
    const newJournalEntry = new JournalEntry({
      text: encryptedText.content,
      owner,
      affirmation,
        textiv: encryptedText.iv
    });


    // Save the new JournalEntry to the database
    await newJournalEntry.save();
    console.log("Journal entry saved");

    return NextResponse.json({ message: "Journal entry created successfully", journalEntry: newJournalEntry }, { status: 201 });


  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred while creating the journal entry" }, { status: 500 });
  }



}