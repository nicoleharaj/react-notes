import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema(
  {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    ],
  },
  { timestamps: true }
);

const tagSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Label cannot be empty.'],
  },

  notes: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Note',
    },
  ],
});

export const Note = mongoose.models.Note || mongoose.model('Note', noteSchema);
export const Tag = mongoose.models.Tag || mongoose.model('Tag', tagSchema);
