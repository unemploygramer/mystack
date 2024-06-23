import mongoose from 'mongoose';

const journalEntrySchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: String,

    required: true
  },
  affirmation: {
    type: String,
    required: false
  }
});

const JournalEntry = mongoose.models?.JournalEntry || mongoose.model('JournalEntry', journalEntrySchema);

export default JournalEntry;