import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Tag from '../../../models/Tag';
import { TagProps } from '../../../utils/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const allTags: TagProps[] = await Tag.find({});
        res.status(200).json(allTags);
      } catch (e: any) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const tag: TagProps = await Tag.create(req.body);
        res.status(201).json(tag);
      } catch (e: any) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
  }
}
