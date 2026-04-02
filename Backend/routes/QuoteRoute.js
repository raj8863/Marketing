import express from 'express';
import { createQuote, getQuotes, deleteQuote } from '../controllers/quoteController.js';

const router = express.Router();

router.route('/')
    .post(createQuote) // For the Modal
    .get(getQuotes);   // For the Dashboard

router.route('/:id')
    .delete(deleteQuote);

export default router;