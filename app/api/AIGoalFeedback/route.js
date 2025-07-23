import { NextResponse } from "next/server";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

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
                        description: "suggested next goal of the day that is specific, measurable, achievable, and relevant for the first week of the goal phrased in the first person future tense."
                    },
                    dailyGoalAdvice: {
                        type: "string",
                        description: "Advice on how to reach the daily goal."
                    }
                },
                required: ["goalAnalysis", "whatToKeepInMind", "nextGoalOfTheDay", "dailyGoalAdvice"]
            }
        }
    }
];

export async function POST(req) {
    try {
        const body = await req.json();
        const { mainGoal, subGoals, currentGoal } = body;

        console.log(currentGoal, "the current goal in the submit word route%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(subGoals, "the subgoals in the submit word route%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
        console.log(currentGoal, "the current goal in the submit word route%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");

        if (!subGoals) {
            throw new Error("subGoals is undefined");
        }

        function formatSubgoals(subGoals) {
            return subGoals.map(subgoal => {
                return `Subgoal: ${subgoal.goalText}, Progress: ${subgoal.progress}, Feedback: ${subgoal.feedback}, Additional Comments: ${subgoal.feedbackAdditionalComments}, Result: ${subgoal.feedbackResult}`;
            }).join('\n');
        }

        function StructureCurrentGoal(currentGoal, subGoals) {
            const currentGoalObj = subGoals.find(subgoal => subgoal._id === currentGoal);
            if (!currentGoalObj) {
                throw new Error("Current goal not found in subGoals");
            }
            return `My current goal is ${currentGoalObj.goalText} and the result of the goal is ${currentGoalObj.feedbackResult} and the difficulty of the goal is ${currentGoalObj.feedbackDifficulty}`;
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: 'system', content: 'You are a helpful assistant that helps me create my next goal toward my 12-week goal. Provide specific feedback based on the given main goal and subgoals.' },
                { role: 'user', content: 'please be my goal coach.' },
                { role: 'user', content: "can you generate my next daily goal based on my current progress." },
                { role: 'user', content: `my 12 week goal is ${mainGoal.goalText}` },
                { role: "assistant", content: "what is your current progress on your 12 week goal?" },
                { role: 'user', content: `my current progress is:\n${formatSubgoals(subGoals)}` },
                { role: 'assistant', content: "what is the result of your current goal?" },
                { role: 'user', content: `${StructureCurrentGoal(currentGoal, subGoals)}` }
            ],
            tools: tools,
            tool_choice: { "type": "function", "function": { "name": "generate_feedback" } }
        });

        let data = await response.choices[0].message.tool_calls[0].function.arguments;
        console.log(data, "the data in the submit word route");
        console.log(typeof (data), "the type of data in the submit word route");
        data = data.replace(/[\n\t\r]/g, "");
        const dataObj = JSON.parse(data);

        return NextResponse.json(dataObj);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.error(new Error('Failed to fetch response'));
    }
}
//tool_choice: "auto",
//             tool_choice:{"type": "function", "function": {"name": "generate_question"}}
