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
            name: "generate_advice",
            description: "Give advice on how to structure time management for a goal, and how to set up a schedule to achieve it, and how to track progress",
            parameters: {
                type: "object",
                properties: {

                    goalOfTheDay: {
                        type: "string",
                        description: "suggested goal of the day that is specific,measurable, achievable, and relevant for the first week of the goal phrased in the first person future tense."
                    }
                },
                required: [ "goalOfTheDay"]
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

  // Destructure the variables from the body
  const { renderedGoal, verbs, totalHours, currentProgress, week1Goal } = body;
  console.log("Rendered goal: ", renderedGoal);
    console.log("Verbs: ", verbs);
    console.log("Total hours: ", totalHours);
    console.log("Current progress: ", currentProgress);


//        console.log(chat,"the chat in the findGoal route")
//        const messages = [
//            {role: 'system', content: 'You are a helpful assistant trying to find and help people make goals that are specific, measurable, achievable, and relevant .'},
//            ...chat.map(message => ({role: message.role, content: message.content}))
//        ];
        // Retrieve a random word

         const response = await openai.chat.completions.create({
             model: "gpt-4o-mini",
    messages: [
        {role: 'system', content: 'You are a helpful assistant that creates  a daily goal towards their   12 week goal.'},
        {role: 'user', content: 'Can you help me reach my goal?'},
        {role: 'assistant', content: 'Sure, what is your goal?'},
        {role: 'user', content: `${renderedGoal}`},
        {role: 'assistant', content: 'Okay, what actions are needed to achieve this goal?'},
        {role: 'user', content: `${verbs}`},
        {role: 'assistant', content: 'How many hours per week can you dedicate to this goal?'},
        {role: 'user', content: `${totalHours}`},
        {role: 'assistant', content: 'What is your current progress?'},
        {role: 'user', content: `${currentProgress}`},
        {role: 'assistant', content: 'What is your weekly goal?'},
        {role: 'user', content: `${week1Goal}`},
        {role:'user', content: "can you generate me a daily goal"}
    ],
             tools: tools,
             tool_choice:{"type": "function", "function": {"name": "generate_advice"}}



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
