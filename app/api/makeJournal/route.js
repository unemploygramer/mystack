import {connect} from "@/utils/config/dbConfig"
import JournalEntry from "../../../models/JournalEntry";
import { NextResponse } from "next/server";


export async function POST(req) {
try {
await connect();
console.log("Connected to DB")
    // Extract the necessary data from the request
    const { text, owner, affirmation } = await req.json();

    // Create a new JournalEntry
    const newJournalEntry = new JournalEntry({
      text,
      owner,
      affirmation
    });

    // Save the new JournalEntry to the database
    await newJournalEntry.save();

    return NextResponse.json({ message: "Journal entry created successfully", journalEntry: newJournalEntry }, { status: 201 });


  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "An error occurred while creating the journal entry" }, { status: 500 });
  }



}