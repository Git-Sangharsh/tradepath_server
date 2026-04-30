import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName:     { type: String, required: true },
  email:        { type: String, required: true, unique: true },
  password:     { type: String },           // not required — Google users have no password
  picture:      { type: String },
  authProvider: { type: String, default: "local" },
});

export default mongoose.model("User", userSchema);