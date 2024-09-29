function GoalDisplay({ data }) {
  const { goalText, verbs, totalHours, currentProgress, goalAdvice, suggestedGoal, owner } = data.userGoal;

  return (
    <div>
      <h2>Goal: {goalText}</h2>
      <p>Verbs: {verbs.join(', ')}</p>
      <p>Total Hours: {totalHours}</p>
      <p>Current Progress: {currentProgress}</p>
      <h3>Goal Advice:</h3>
      <p>{goalAdvice.helpfulAdvice}</p>
      <p>{goalAdvice.tip1}</p>
      <p>{goalAdvice.tip2}</p>
      <p>{goalAdvice.tip3}</p>
      <p>Week 1 Goal: {goalAdvice.week1Goal}</p>
      <p>Suggested Goal: {suggestedGoal}</p>
      <p>Owner: {owner}</p>
    </div>
  );
}