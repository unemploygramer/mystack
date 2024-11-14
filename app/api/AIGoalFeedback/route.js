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
            name: "generate_feedback",
            description: "create a smart goal for tomorrow and offer feedback on my current progress and things to keep in mind",
            parameters: {
                type: "object",
                properties: {
                    goalAnalysis: {
                        type: "string",
                        description: "analysis of the progress of the goal and feedback on how to keep up or improve on the goal."
                    },
                    whatToKeepInMind: {
                        type: "string",
                        description: "things to keep in mind when working towards the goal."
                    },
                    nextGoalOfTheDay: {
                        type: "string",
                        description: "suggested next goal of the day that is specific,measurable, achievable, and relevant for the first week of the goal phrased in the first person future tense."
                    },
                    dailyGoalAdvice: {
                        type: "string",
                        description: "Advice on how to reach the daily goal."
                    }
                },
                required: [ "goalAnalysis", "whatToKeepInMind", "nextGoalOfTheDay", "dailyGoalAdvice" ]
            }
        }
    }
]






export async function POST(req){


const body = req.body;
//console.log(body,"the body")
    try {
  const body = await req.json();

  // Destructure the variables from the body
  const {mainGoal,subGoals} = body;
    console.log(mainGoal,"the main goal in the submit word route")
    console.log(subGoals,"the subgoals in the submit word route")

function formatSubgoals(subGoals) {
  return subGoals.map(subgoal => {
    return `Subgoal: ${subgoal.goalText}, Progress: ${subgoal.progress}, Feedback: ${subgoal.feedback}, Additional Comments: ${subgoal.feedbackAdditionalComments}, Result: ${subgoal.feedbackResult}`;
  }).join('\n');
}

//        console.log(chat,"the chat in the findGoal route")
//        const messages = [
//            {role: 'system', content: 'You are a helpful assistant trying to find and help people make goals that are specific, measurable, achievable, and relevant .'},
//            ...chat.map(message => ({role: message.role, content: message.content}))
//        ];
        // Retrieve a random word

         const response = await openai.chat.completions.create({
             model: "gpt-4o-mini",
    messages: [
                { role: 'system', content: 'You are a helpful assistant that helps me create my next goal toward my 12-week goal. Provide specific feedback based on the given main goal and subgoals.' },
        {role: 'user', content: 'please be my goal coach.'},
//        {role: 'assistant', content: 'Sure, what is your goal?'},
//        {role: 'user', content: `${renderedGoal}`},
//        {role: 'assistant', content: 'Okay, what actions are needed to achieve this goal?'},
//        {role: 'user', content: `${verbs}`},
//        {role: 'assistant', content: 'How many hours per week can you dedicate to this goal?'},
//        {role: 'user', content: `${totalHours}`},
//        {role: 'assistant', content: 'What is your current progress?'},
//        {role: 'user', content: `${currentProgress}`},
//        {role: 'assistant', content: 'What is your weekly goal?'},
//        {role: 'user', content: `${week1Goal}`},
        {role:'user', content: "can you generate my next daily goal based on my current progress."},
        {role:'user', content: `my 12 week goal is ${mainGoal.goalText}` },
        {role: "assistant", content: "what is your current progress on your 12 week goal?"},
    { role: 'user', content: `my current progress is:\n${formatSubgoals(subGoals)}` }
    ],
             tools: tools,
             tool_choice:{"type": "function", "function": {"name": "generate_feedback"}}



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
