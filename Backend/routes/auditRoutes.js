import express from 'express';
// Yahan .js extension aur { } ke andar exact name hona chahiye
import { verifyAndCreateAudit, getAudits } from '../controllers/auditController.js'; 

const router = express.Router();

router.post('/verify', verifyAndCreateAudit);
router.get('/all', getAudits); // Dashboard leads fetch karne ke liye

export default router;