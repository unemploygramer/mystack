import { NextResponse } from "next/server";
import OpenAI from 'openai';




const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
});
//const journalEntry = "I am feeling unmotivated and my goals are seemingly impossible. I dont know how i am going to make money and i am broke and in debt. I need to figure something out. all of my programming projects seem to be finished but i have made no money from them. I feel very alone and like i dont belong";
//const journalEntry = "I am trying to stay motivated and positive. I am working on my goals and trying to make money. I am working on my programming projects and trying to make money from them";
const tools = [
    {
        type: "function",
        function: {
            name: "generate_affirmation",
            description: "Generates an affirmation in first person based on journal entries",
            parameters: {
                type: "object",
                properties: {
                    affirmation: {
                        type: "string",
                        description: "the affirmation based on the journal entry"
                    }
                },
                required: ["affirmation"]
            }
        }
    }
]
const schema = {
    type: "object",
    properties: {
        affirmation: {
            type: "string",
            description: "a generated affiratmion"
        }
    },
    required: ["affirmation"]
};






export async function POST(req){


//const body = req.body;
//console.log(body,"the body")
    try {
  const body = await req.json();
  console.log(`Response body from /api/submitWord: ${JSON.stringify(body)}`);
        // Now you can access the data in the body
        const affirmation = body.affirmation;
console.log(affirmation,"the affirmation in the submit word route")
        // Retrieve a random word

         const response = await openai.chat.completions.create({
             model: "gpt-4o-mini",
             messages: [
                 {
                     "role": "system",
                     "content": `you are a program that returns  an affirmation based on journal entries`
                 },
                 {
                     "role": "user",
            "content": `journal entry: ${affirmation}` // Use the journal entry variable
                 }
             ],
             tools: tools,
             tool_choice:{"type": "function", "function": {"name": "generate_affirmation"}}
             // functions: [
             //     {name: "get_word_of_the_day", "parameters": schema}
             // ],
             // function_call: {name: "get_word_of_the_day"},
             // temperature:0.7,
         });

         const data = await  response.choices[0].message.tool_calls[0].function.arguments;
console.log(data,"the data in the submit word route")
console.log(typeof(data),"the type of data in the submit word route")
const dataObj = JSON.parse(data);
console.log(dataObj,"the data object in the submit word route")
// Call the function with the new parameters
return NextResponse.json(dataObj);
//        return NextResponse.json({hello: "working"});
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error(new Error('Failed to fetch response'));
    }

};
