import mongoose from 'mongoose';
import { TagProps } from '../utils/types';

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title cannot be empty.'],
  },

  markdown: {
    type: String,
    required: [true, 'Body cannot be empty.'],
  },

  tags: [
    {
      type: String,
      required: false,
    },
  ],
});

export default mongoose.models.Note || mongoose.model('Note', NoteSchema);
