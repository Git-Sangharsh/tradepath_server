import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import journalRoutes from "./routes/Journal.js";
import authRoutes from "./routes/Auth.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/journal", journalRoutes);
app.use("/api/auth", authRoutes);

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mainnikedb.jx4pwkk.mongodb.net/tradepath`,
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(PORT, () => {
  console.log(`Server is live on port ${PORT}`);
});
