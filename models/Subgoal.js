// Subgoal Model
import mongoose from 'mongoose';

const subgoalSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    required: true,
  },

  advice: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: false,
  },
  progress: {
    type: String,
    required: true,
  },
    goalType: {
      type: String,
      enum: ['daily', 'weekly'],
      required: true,
    },
      goalText: {
        type: String,
        required: true,
      },
    dueDate: {
      type: Date,
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
  goalOutcome: {
    type: String,
    required: false,
  },
  goal: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Goal'
  }
});
const Subgoal = mongoose.models?.Subgoal || mongoose.model('Subgoal', subgoalSchema);
export default Subgoal;