import { connectToDatabase } from '../../../lib/db';
import Entry from '../../../models/Entry';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await connectToDatabase();
  const { id } = req.query;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  if (req.method === 'DELETE') {
    try {
      await Entry.findByIdAndDelete(id);
      return res.status(204).end();
    } catch (err) {
      console.error('Delete error:', err);
      return res.status(500).json({ error: 'Failed to delete entry' });
    }
  }

  if (req.method === 'PUT') {
    const { food, calories } = req.body;
    try {
      const updated = await Entry.findByIdAndUpdate(
        id,
        { food, calories },
        { new: true }
      );
      if (!updated) {
        return res.status(404).json({ error: 'Entry not found' });
      }
      return res.status(200).json(updated);
    } catch (err) {
      console.error('Update error:', err);
      return res.status(500).json({ error: 'Failed to update entry' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
