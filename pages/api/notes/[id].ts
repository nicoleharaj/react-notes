import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Note from '../../../models/Note';
import { NoteProps } from '../../../utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const note: NoteProps | null = await Note.findById(id);
        if (!note) {
          return res.status(400).json({ success: false });
        }
        return res.status(200).json(note);
      } catch (e: any) {
        res.status(400).json({ success: false });
      }
      break;
    case 'PUT':
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!note) {
          return res.status(400).json({ success: false });
        }
        res.status(400).json(note);
      } catch (e: any) {
        res.status(400).json({ success: false });
      }
      break;

    case 'DELETE':
      try {
        const deletedNote = await Note.deleteOne({ _id: id });
        res.status(200).json(deletedNote);
      } catch (e: any) {
        res.status(400).json({ success: false });
      }
      break;
  }
}
