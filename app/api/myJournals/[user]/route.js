import { NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import JournalEntry from "../../../../models/JournalEntry";


export async function GET(req,context) {
const {user} = context.params;
console.log(user, "the user")
try{
await connect();
const userJournals = await  JournalEntry.find({owner: user})
return NextResponse.json({userJournals: userJournals})

} catch (error) {


console.log(error)}

}