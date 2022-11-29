import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Note from '../../../models/Note';
import { NoteProps } from '../../../utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const allNotes: NoteProps[] = await Note.find({});
        return res.status(200).json(allNotes);
      } catch (e: any) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const note: NoteProps = await Note.create(req.body);
        return res.status(201).json(note);
      } catch (e: any) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
