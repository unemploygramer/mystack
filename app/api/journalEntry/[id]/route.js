import { NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import JournalEntry from "../../../../models/JournalEntry";
import crypto from 'crypto';
function decrypt(encrypted, iv) {
  const algorithm = 'aes-256-ctr';
  const secretKey = 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3'; // replace with your own secret key

  const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

  const decrypted = Buffer.concat([decipher.update(Buffer.from(encrypted, 'hex')), decipher.final()]);

  return decrypted.toString();
}
export async function GET(req,context) {
try{
const {id} = context.params;
console.log(id, "the id inside the route")
await connect();

    const userJournal = await JournalEntry.find({_id: id})
        // Decrypt the text and affirmation fields
        console.log(userJournal, "userJournal before the decryption")
  userJournal.forEach(journal => {
    if (journal.text && journal.textiv) {
      journal.text = decrypt(journal.text, journal.textiv);
    }
    if (journal.affirmation && journal.affirmationiv) {
      journal.affirmation = decrypt(journal.affirmation, journal.affirmationiv);
    }
  });
        console.log(userJournal, "userJournal after the decryption")
    return NextResponse.json({userJournals: userJournal})



//        return NextResponse.json({fuck:"you"})




} catch (error) {


console.log(error)}

}