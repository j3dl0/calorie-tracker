import mongoose from "mongoose";

//Collection in the database
const EntrySchema = new mongoose.Schema({

    food: String,
    calories: Number,
    category: { type: String, enum: ['Breakfast', 'Lunch', 'Dinner', 'Snack'], required: true },
    date: { type: Date, default: Date.now }
});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);