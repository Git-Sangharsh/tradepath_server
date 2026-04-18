import express from "express";
import JournalEntry from "../models/JournalEntry.js";
import authMiddleware from "../middleware/authMiddleware.js";
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const groq_client = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

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
// GET /api/journal
router.get("/get-journal", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;

    // Fetch all entries to show in UI
    const entries = await JournalEntry.find({ user: userId }).sort({
      createdAt: -1,
    });

    // Only send the 10 most recent entries for AI analysis
    const recentEntries = entries.slice(0, 10); // Use first 10 after sorting

    const formattedEntries = recentEntries.map((entry) => ({
      date: entry.date,
      session: entry.session,
      asset: entry.asset,
      direction: entry.direction,
      result: entry.result,
      pnl: entry.pnl,
      setups: entry.setups,
      confluences_used: entry.confluences_used,
      comments: entry.comments,
    }));

    // LLaMA Prompt
    const prompt = `
You are a trading coach AI. A trader has shared their recent trading journal with you in structured format.

Your job:
- Analyze their past 10 trades
- Spot patterns of success and failure
- Identify which setups, confluences, or sessions are profitable
- Highlight common mistakes
- Give direct suggestions for improvement

Respond in a friendly but professional tone.
Use bullet points.

Data:
${JSON.stringify(formattedEntries, null, 2)}
`;

    const response = await groq_client.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [{ role: "user", content: prompt }],
    });

    const analysis =
      response.choices[0]?.message?.content || "No analysis generated.";

    res.json({
      entries, // all trades for display
      analysis, // analysis from only 10 recent trades
    });
  } catch (err) {
    console.error("Error during journal fetch or AI analysis:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
