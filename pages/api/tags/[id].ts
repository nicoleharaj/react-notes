import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import { Tag } from '../../../models/Models';
import { TagProps } from '../../../utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const tag: TagProps | null = await Tag.findById(id);

        if (!tag) res.status(404).json({ success: false });

        res.status(200).json({ success: true, data: tag });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    case 'PUT':
      try {
        const tag = await Tag.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        if (!tag) res.status(404).json({ success: false });

        res.status(200).json({ success: true, data: tag });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e });
      }
      break;

    case 'DELETE':
      try {
        const deletedTag = await Tag.deleteOne({ _id: id });
        res.status(200).json({ success: true, data: deletedTag });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    default:
      res.status(403).json({ success: false });
  }
}
