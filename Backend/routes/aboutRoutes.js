import express from 'express';
import { getAboutData, seedAboutData } from '../controllers/aboutController.js';

const router = express.Router();

router.get('/', getAboutData);
router.post('/seed', seedAboutData); // Use Postman/Thunderclient to hit this once

export default router;