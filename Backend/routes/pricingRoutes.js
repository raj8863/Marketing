import express from 'express';
import { getPlans, createEnquiry, getLeads, upsertPlan, deletePlan } from '../controllers/pricingController.js';

const router = express.Router();

// Public Routes
router.get('/plans', getPlans); 
router.post('/enquire', createEnquiry);

// Admin Routes (Used by PricingManager & PricingForm)
router.get('/', getPlans); // PricingManager calls this
router.post('/', upsertPlan); 
router.put('/:id', upsertPlan);
router.delete('/:id', deletePlan);
router.get('/admin/leads', getLeads);

export default router;