import mongoose from 'mongoose';

export const TagSchema = new mongoose.Schema({
  label: {
    type: String,
    required: [true, 'Tag must have a name'],
    unique: [true, 'This tag already exists'],
  },
});

export default mongoose.models.Tag || mongoose.model('Tag', TagSchema);
