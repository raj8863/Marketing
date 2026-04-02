import express from "express";
import { getTeam, createTeam, updateTeam, deleteTeam } from "../controllers/teamController.js";
import { storage } from "../config/cloudinary.js";
import multer from "multer";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ storage });

router.get("/", getTeam);

// Error handling wrapper for Multer
const handleUpload = (req, res, next) => {
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error("Cloudinary/Multer Error:", err);
      return res.status(500).json({ message: "Multer/Cloudinary Error", error: err.message });
    }
    next();
  });
};

router.post("/", protect, handleUpload, createTeam);
router.put("/:id", protect, handleUpload, updateTeam);
router.delete("/:id", protect, deleteTeam);

export default router;