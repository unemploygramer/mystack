import mongoose from "mongoose";

// Goal Model
const goalSchema = new mongoose.Schema({
  goalText: {
    type: String,
    required: true,
  },
  verbs: [ // Add this field
    {
      type: String,
      required: true,
    },
  ],
  totalHours: {
    type: Number,
    required: true,
  },
  currentProgress: {
    type: String,
    required: true,
  },
    dueDate: {
      type: Date,
      default: () => Date.now() + 12 * 7 * 24 * 60 * 60 * 1000, // 12 weeks from now
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

const Goal = mongoose.models?.Goal || mongoose.model("Goal", goalSchema)

export default Goal