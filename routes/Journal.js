import express from "express";
import JournalEntry from "../models/JournalEntry.js";

const router = express.Router();

// POST /api/journal
router.post("/journal", async (req, res) => {
  try {
    const {
      date,
      direction,
      asset,
      session,
      result,
      pnl,
      comments,
      confluences_used,
      emotions,
      user, // this comes from frontend or auth token
    } = req.body;

    const entry = new JournalEntry({
      date,
      direction,
      asset,
      session,
      result,
      pnl,
      comments,
      confluences_used,
      emotions,
      user,
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/journal
router.get("/get-journal", async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
