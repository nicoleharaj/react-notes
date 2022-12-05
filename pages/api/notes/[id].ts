import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import { Note } from '../../../models/Models';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const note = await Note.findById(id).populate('tags');

        if (!note) res.status(404).json({ success: false });

        res.status(200).json({ success: true, data: note });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    case 'PUT':
      try {
        const note = await Note.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!note) res.status(400).json({ success: false });

        res.status(200).json({ success: true, data: note });
      } catch (e: any) {
        console.error(e);
        res.status(400).json({ success: false, message: e });
      }
      break;

    case 'DELETE':
      try {
        const deletedNote = await Note.deleteOne({ _id: id });
        res.status(200).json({ success: true, data: deletedNote });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    default:
      res.status(403).json({ success: false });
  }
}
