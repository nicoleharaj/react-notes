import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Note from '../../../models/Note';
import { NoteProps } from '../../../utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { _id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const note: NoteProps | null = await Note.findById(_id);
        if (!note) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json(note);
      } catch (e: any) {
        console.error(e);
      }
      break;
  }
}
