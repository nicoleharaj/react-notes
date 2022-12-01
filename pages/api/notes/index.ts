import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import { Note } from '../../../models/Models';
import { NoteProps } from '../../../utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const allNotes: NoteProps[] = await Note.find({}).populate('tags');
        res.status(200).json({ success: true, data: allNotes });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    case 'POST':
      try {
        const note: NoteProps = await Note.create(req.body);
        res.status(200).json({ success: true, data: note });
      } catch (e) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
