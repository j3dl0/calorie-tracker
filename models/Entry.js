import mongoose from "mongoose";

//Collection in the database
const EntrySchema = new mongoose.Schema({

    food: String,
    calories: Number,
    createdAt: { type: Date, default: Date.now}

});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);