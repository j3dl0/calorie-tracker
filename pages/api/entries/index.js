import { connectToDatabase } from "../../../lib/db";
import Entry from "../../../models/Entry";

//GET
export default async function handler(req, res) {
    await connectToDatabase();

    if(req.method === 'GET'){
        const entries = await Entry.find().sort({ createdAt: -1 }); //sorts entries from new -> old
        res.status(200).json(entries);
    }
//POST
    if (req.method === 'POST') {
        const { food, calories } = req.body;
        const newEntry = await Entry.create({ food, calories });    //creates entries in db
        res.status(201).json(newEntry);
    }
}