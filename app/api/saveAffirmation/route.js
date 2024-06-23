import {connect} from "../../../utils/config/dbConfig"
import JournalEntry from "../../../models/JournalEntry";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connect();

    // Extract the necessary data from the request
    const { id, affirmation } = await req.json();
    console.log(`Affirmation to be updated on saveAffirmation: ${affirmation}`);

    console.log(`Request body: ${JSON.stringify({ id, affirmation })}`); // Log the request body

    // Find the journal entry in the database
    const journalEntry = await JournalEntry.findById(id);
    if (!journalEntry) {
      console.log(`Journal entry not found for id: ${id}`); // Log if the journal entry is not found
      return NextResponse.json({ message: "Journal entry not found" }, { status: 404 });
    }

    console.log(`Found journal entry: ${JSON.stringify(journalEntry)}`); // Log the found journal entry

    // Update the affirmation field
    journalEntry.affirmation = affirmation;

    // Save the updated journal entry to the database
    await journalEntry.save();

    return NextResponse.json({ message: "Journal entry updated successfully" }, { status: 200 });
  } catch (error) {
    console.log(`Error occurred while updating the journal entry: ${error}`); // Log any errors that occur
    return NextResponse.json({ message: "An error occurred while updating the journal entry" }, { status: 500 });
  }
}