import { NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import JournalEntry from "../../../../models/JournalEntry";


export async function GET(req,context) {
try{
const {id} = context.params;
console.log(id, "the id inside the route")
await connect();

    const userJournal = await JournalEntry.find({_id: id})
    return NextResponse.json({userJournals: userJournal})

} catch (error) {


console.log(error)}

}