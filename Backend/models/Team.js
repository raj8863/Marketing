import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String, required: true }, // Stores Cloudinary URL
}, { timestamps: true });

export default mongoose.model("Team", teamSchema);