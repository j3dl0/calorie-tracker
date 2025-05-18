import mongoose from "mongoose";

const EntrySchems = new mongoose.Schema({

    food: String,
    calories: Number,
    createdAt: { type: Date, default: Date.now}

});

export default mongoose.models.Entry || mongoose.model('Entry', EntrySchema);