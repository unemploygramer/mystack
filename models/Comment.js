// import mongoose from 'mongoose';

// const commentSchema = new mongoose.Schema({

//   comment: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// const Comment =  mongoose.models?.Comment ||   mongoose.model('Comment', commentSchema);

// export default Comment;
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Event/Post ID
    ref: 'Event', // Reference to the Event/Post model
    required: true
  },
  comment: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Comment = mongoose.models?.Comment || mongoose.model('Comment', commentSchema);

export default Comment;
