import { NextRequest, NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import Script from "../../../../models/script"
import User from "../../../../models/User"
import { getSession } from "next-auth/client"
import type { NextApiRequest, NextApiResponse } from 'next'

// export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
export const GET: any = async (req: NextRequest, context: any) => {
  try {
    const {email} = await context.params;
    console.log(email,"da email")
   await connect();

    const fetchedUser = await User.find({email:email});
    console.log(fetchedUser[0].credits,"fetched user")
    const creds = fetchedUser[0].credits
//  const FetchedScripts =  await Script.find({company: 'toyota'}, function (err, docs) { 
//   if (err){ 
//       console.log(err); 
//   } 
//   else{ 
//       console.log("First function call : ", docs); 
//   } 
// }); 



    // res.statusCode = 200;
    return NextResponse.json(creds);
  } catch (error) {
    console.log(error);
    return NextResponse.error;
  }
};
