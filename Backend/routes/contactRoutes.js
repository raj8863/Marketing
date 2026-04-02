import express from 'express';
import { deleteContact, getContacts, submitContact, } from '../controllers/Contact.js';

const router=express.Router();
router.route('/').post(submitContact).get(getContacts);
router.route('/:id').delete(deleteContact);
export default router;

