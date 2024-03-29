// models/Event.js
// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  price: {
    type: String
  },
  organization: {
    type: String
  },
  organizer: {
    type: String
  }
});

const Event = mongoose.models?.Event || mongoose.model('Event', eventSchema);

export default Event;
