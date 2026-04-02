import express from "express";
import { getPrivacy, updatePrivacy } from "../controllers/privacyController.js";

const router = express.Router();

router.get("/", getPrivacy);
router.post("/update", updatePrivacy);

export default router;