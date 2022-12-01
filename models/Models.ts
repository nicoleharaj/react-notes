import mongoose, { MongooseError, Schema } from 'mongoose';

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
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    },
  ],
});

const TagSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Label cannot be empty.'],
  },
  notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

export const Note = mongoose.models.Note || mongoose.model('Note', NoteSchema);
export const Tag = mongoose.models.Tag || mongoose.model('Tag', TagSchema);
