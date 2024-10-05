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
    <div className=" mt-[150px] w-screen h-screen">
        <div>{goal.goalText}</div>
    </div>
  )
}

export default page