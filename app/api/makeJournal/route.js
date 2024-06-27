import {connect} from "../../../utils/config/dbConfig"
import JournalEntry from "../../../models/JournalEntry";
import { NextResponse } from "next/server";
import crypto from 'crypto';

function encrypt(text) {
  const algorithm = 'aes-256-ctr';
  const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'; // replace with your own secret key
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);

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

    // Encrypt the journal text
    const encryptedText = encrypt(text);

    // Create a new JournalEntry
    const newJournalEntry = new JournalEntry({
      text: encryptedText.content,
      owner,
      affirmation,
        textiv: encryptedText.iv
    });


    // Save the new JournalEntry to the database
    await newJournalEntry.save();

    return NextResponse.json({ message: "Journal entry created successfully", journalEntry: newJournalEntry }, { status: 201 });


  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred while creating the journal entry" }, { status: 500 });
  }



}