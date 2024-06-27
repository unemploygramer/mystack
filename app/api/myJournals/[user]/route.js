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
const {user} = context.params;
console.log(user, "the user")
try{
await connect();
const userJournals = await  JournalEntry.find({owner: user})
// Log the userJournals before decryption
    console.log("Before decryption:", userJournals);

    // Uncomment the decryption process
    userJournals.forEach(journal => {
      if (journal.text && journal.textiv) {
        journal.text = decrypt(journal.text, journal.textiv);
      }
        if (journal.affirmation && journal.affirmationiv) {
          journal.affirmation = decrypt(journal.affirmation, journal.affirmationiv);
        }
    });

    // Log the userJournals after decryption
    console.log("After decryption:", userJournals);

    return NextResponse.json({userJournals: userJournals})

} catch (error) {


console.log(error)}
return NextResponse.error({message: "An error occurred while fetching the journal entries"})

}