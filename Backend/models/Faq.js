import mongoose from "mongoose";

const faqSchema = new mongoose.Schema({
  category: { type: String, required: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  order: { type: Number, default: 0 } // FAQ ki sequence control karne ke liye
}, { timestamps: true });

export default mongoose.model("Faq", faqSchema);