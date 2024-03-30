import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});

export async function GET(){

    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                "role": "system",
                "content": `you are a program that returns the word of the day and related data`
            },
            {
                "role": "user",
                "content": `What is the word of the day in this format {
                   word: "",
                   meaning:"",
                   orgin:""
                    usedinasentence:"",
                 
                    }`
            }
        ],
    });

    // Extracting the AI response
    const AI_Response = response.choices[0].message.content;

    // Creating a uniform JSON object
 
    // Returning the JSON response
    return NextResponse.json(AI_Response);
}
