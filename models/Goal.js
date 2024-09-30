import mongoose from "mongoose";
// Goal Model
const goalSchema = new mongoose.Schema({
  goalText: {
    type: String,
    required: true,
  },
  totalHours: {
    type: Number,
    required: true,
  },
  currentProgress: {
    type: String,
    required: true,
  },
  goalAdvice: {
    type: Object,
    required: true,
  },
  suggestedGoal: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  subgoals: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subgoal'
  }]
});

// Subgoal Model
const subgoalSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
  },
  dailyTasks: [{
    type: String,
    required: true,
  }],
  advice: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
  progress: {
    type: String,
    required: true,
  },
  timeSpent: {
    type: Number,
    required: true,
  },
  completionStatus: {
    type: Boolean,
    required: true,
  },
  userNotes: {
    type: String,
    required: false,
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  }
});
const Goal = mongoose.models?.Goal || mongoose.model("Goal", goalSchema)

export default Goal