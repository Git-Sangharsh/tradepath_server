import express from "express";
import JournalEntry from "../models/JournalEntry.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();


// POST /api/journal
router.post("/journal", authMiddleware, async (req, res) => {
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
      setups,
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
      setups,
      user: req.userId,
    });

    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/journal
router.get("/get-journal", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId; // this comes from JWT in middleware
    const entries = await JournalEntry.find({ user: userId }).sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
