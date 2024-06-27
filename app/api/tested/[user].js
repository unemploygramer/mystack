import { NextResponse } from "next/server";


export async function GET(req,res) {
console.log(req, "the request")
return NextResponse.json({hello: "world"})
}