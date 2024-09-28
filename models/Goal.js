import mongoose from "mongoose";

const goalSchema = new mongoose.Schema({
  goalText: {
    type: String,
    required: true,
  },
  verbs: {
    type: [String],
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Goal = mongoose.models?.Goal || mongoose.model("Goal", goalSchema)

export default Goal