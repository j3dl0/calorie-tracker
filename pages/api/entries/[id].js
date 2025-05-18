import { connectToDatabase } from '../../../lib/db';
import Entry from '../../../models/Entry';

//DELETE
export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (req.method === 'DELETE') {
    await Entry.findByIdAndDelete(id);
    res.status(204).end();
  }
}
