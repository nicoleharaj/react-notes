import mongoose from 'mongoose';
import { TagSchema } from './Tag';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty.'],
  },

  markdown: {
    type: String,
    required: [true, 'Body cannot be empty.'],
  },

  tags: [TagSchema],
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
