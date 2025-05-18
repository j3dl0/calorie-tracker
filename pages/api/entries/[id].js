import { connectToDatabase } from '../../../lib/db';
import Entry from '../../../models/Entry';


export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

//DELETE
  if (req.method === 'DELETE') {
    await Entry.findByIdAndDelete(id);
    res.status(204).end();
  }
}

//UPDATE
  if (req.method === 'PUT') {
    const { food, calories } = req.body;
    const updated = await Entry.findByIdAndUpdate(id, { food, calories }, { new: true });
    res.status(200).json(updated);
  }