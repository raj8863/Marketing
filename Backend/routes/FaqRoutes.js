// routes/faqRoutes.js
import express from "express";
import Faq from "../models/Faq.js";
const router = express.Router();

// Public: Saare FAQ get karna
router.get("/", async (req, res) => {
  try {
    const faqs = await Faq.find().sort({ order: 1 });
    res.json(faqs);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Admin: Create, Update, Delete (Isme aapka 'protect' middleware lagega)
// POST a new FAQ
router.post("/", async (req, res) => {
  const faq = new Faq(req.body);
  try {
    const newFaq = await faq.save();
    res.status(201).json(newFaq);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const updatedFaq = await Faq.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedFaq);
});

router.delete("/:id", async (req, res) => {
  await Faq.findByIdAndDelete(req.params.id);
  res.json({ message: "FAQ Deleted" });
});

export default router;