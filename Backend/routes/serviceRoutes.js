import express from 'express';
import { createService, deleteService, getServiceBySlug, getServices, updateService } from '../controllers/serviceController.js';


const router=express.Router();
router.route('/').get(getServices).post(createService)
router.route('/slug/:slug').get(getServiceBySlug);
router.route('/:id').put(updateService).delete(deleteService)

export default router;