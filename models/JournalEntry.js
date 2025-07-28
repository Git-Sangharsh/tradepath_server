import mongoose from "mongoose";

const journalEntrySchema = new mongoose.Schema(
  {
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
      enum: [
        "NASDAQ",
        "S&P 500",
        "BTC/USD",
        "ETH/USD",
        "XAU/USD", // Gold
        "USOIL",
        "US30",
        "EUR/USD",
        "GBP/USD",
        "USD/JPY",
        "USD/CHF",
        "AUD/USD",
        "NZD/USD",
        "USD/CAD",
      ],
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
    setups: {
      type: String,
      enum: ["A+", "A", "B", "C", "D"],
      default: "A+",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const JournalEntry = mongoose.model("JournalEntry", journalEntrySchema);

export default JournalEntry;
