import express from "express";
import { login, register, updateProfile,deleteAccount, getMe } from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/me", protect, getMe);
router.delete("/profile", protect, deleteAccount);
router.put("/profile", protect, upload.single("profileImage"),updateProfile);

export default router;