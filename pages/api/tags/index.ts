import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import { Tag } from '../../../models/Models';
import { TagProps } from '../../../utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const allTags: TagProps[] = await Tag.find({});
        res.status(200).json({ success: true, data: allTags });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    case 'POST':
      try {
        const tag: TagProps = await Tag.create(req.body);
        res.status(201).json({ success: true, data: tag });
      } catch (e: any) {
        res.status(400).json({ success: false, message: e });
      }
      break;
    default:
      res.status(403).json({ success: false });
  }
}
