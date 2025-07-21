import express from "express";
import JournalEntry from "../models/JournalEntry.js";

const router = express.Router();

// POST /api/journal
router.post("/", async (req, res) => {
  try {
    const entry = new JournalEntry(req.body);
    await entry.save();
    res.status(201).json(entry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/journal
router.get("/", async (req, res) => {
  try {
    const entries = await JournalEntry.find().sort({ createdAt: -1 });
    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
