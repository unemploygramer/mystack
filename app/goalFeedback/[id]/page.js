import FeedbackInput from "../../components/FeedbackInput"

async function getGoal(id) {
  try {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/getGoalByID/${id}`, {
      method: 'GET',
    });
    if (response.ok) {
      const data = await response.json();
      return data.userGoal;
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return;
  }
}

async function page ({params}) {
  const id = params.id
  const goal = await getGoal(id) // await the result of getGoal
  console.log(goal, "the goal%%%%%%%%%%")
  return (
    <div className=" mt-[100px] w-screen ">
    <h1 className="text-3xl text-center m-6">Goal Feedback</h1>
        <div className="flex justify-center   ">
        <h3 className="bg-orange-300 p-4 rounded-xl  max-w-[500px] w-[90vw]">
        {goal.goalText}
        </h3>
        </div>
<FeedbackInput subgoalId={id}/>    </div>
  )
}

export default page