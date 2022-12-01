import mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Label cannot be empty.'],
  },
});

export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);
