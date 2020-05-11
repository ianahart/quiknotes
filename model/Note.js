const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Note = mongoose.model('Note', NoteSchema);
module.exports = Note;
