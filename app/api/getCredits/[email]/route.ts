import { NextRequest, NextResponse } from "next/server";
import {connect} from "../../../../utils/config/dbConfig"
import User from "../../../../models/User"
import type { NextApiRequest, NextApiResponse } from 'next'

export const GET: any = async (req: NextRequest, context: any) => {
  try {
    const {email} = await context.params;
    console.log(email,"da email")
   await connect();

    const fetchedUser = await User.find({email:email});
    console.log(fetchedUser[0].credits,"fetched user")
    const creds = fetchedUser[0].credits




    // res.statusCode = 200;
    return NextResponse.json(creds);
  } catch (error) {
    console.log(error);
    return NextResponse.error;
  }
};
