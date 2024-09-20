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
            name: "generate_verbs",
            description: "Generate a list of verbs that are associated with the users goal",
            parameters: {
                type: "object",
                properties: {
                    verbs: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        description: "a list of verbs that are associated with the users goal"
                    }
                },
                required: ["verbs"]
            }
        }
    }
]
//const schema = {
//    type: "object",
//    properties: {
//        affirmation: {
//            type: "string",
//            description: "a generated affiratmion"
//        }
//    },
//    required: ["affirmation"]
//};






export async function POST(req){


const body = req.body;
//console.log(body,"the body")
    try {
  const body = await req.json();

        // Now you can access the data in the body
        const goal = body.goal;
//        console.log(chat,"the chat in the findGoal route")
//        const messages = [
//            {role: 'system', content: 'You are a helpful assistant trying to find and help people make goals that are specific, measurable, achievable, and relevant .'},
//            ...chat.map(message => ({role: message.role, content: message.content}))
//        ];
        // Retrieve a random word

         const response = await openai.chat.completions.create({
             model: "gpt-4",
             messages: [            {role: 'system', content: 'You are a helpful assistant trying to find and help people make goals that are specific, measurable, achievable, and relevant .'},
             {role: 'user', content:`my goal is to ${goal}`}
],
             tools: tools,
             tool_choice:{"type": "function", "function": {"name": "generate_verbs"}}



             // functions: [
             //     {name: "get_word_of_the_day", "parameters": schema}
             // ],
             // function_call: {name: "get_word_of_the_day"},
             // temperature:0.7,
         });

        let data = await  response.choices[0].message.tool_calls[0].function.arguments;
console.log(data,"the data in the submit word route")
console.log(typeof(data),"the type of data in the submit word route")
       data = data.replace(/[\n\t\r]/g,"");
        const dataObj = JSON.parse(data);
// Call the function with the new parameters
return NextResponse.json(dataObj);
//        return NextResponse.json({hello: "working"});
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error(new Error('Failed to fetch response'));
    }

};
//tool_choice: "auto",
//             tool_choice:{"type": "function", "function": {"name": "generate_question"}}
