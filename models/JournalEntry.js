import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  direction: {
    type: String,
    enum: ["long", "short"],
    required: true,
  },
  asset: {
    type: String,
    required: true,
  },
  session: {
    type: String,
    enum: ["New York", "London", "Asia"],
    required: true,
  },
  result: {
    type: String,
    enum: ["win", "lose", "break-even"],
    required: true,
  },
  pnl: {
    type: Number,
    required: true,
  },
  comments: {
    type: String,
  },
  confluences_used: {
    type: [String],
    enum: [
      "FVG",
      "CHoCH",
      "Liquidity Sweep",
      "MSS",
      "Inverse FVG",
      "BOS",
      "Equilibrium",
      "Order Block",
    ],
    default: [],
  },
  emotions: {
    type: String,
    enum: ["Fear", "Greed", "FOMO", "Calm"],
  },
}, {
  timestamps: true
});

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

export default JournalEntry;
