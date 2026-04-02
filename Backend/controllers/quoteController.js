import Quote from '../models/Quote.js';

// @desc    Submit a new quote request
// @route   POST /api/quotes
export const createQuote = async (req, res, next) => {
    try {
        const quote = new Quote(req.body);
        const savedQuote = await quote.save();
        res.status(201).json(savedQuote);
    } catch (error) {
        res.status(400);
        next(error);
    }
};

// @desc    Get all quote requests (for Dashboard)
// @route   GET /api/quotes
export const getQuotes = async (req, res, next) => {
    try {
        const quotes = await Quote.find().sort({ createdAt: -1 });
        res.status(200).json(quotes);
    } catch (error) {
        res.status(500);
        next(error);
    }
};

// @desc    Delete a quote
// @route   DELETE /api/quotes/:id
export const deleteQuote = async (req, res, next) => {
    try {
        await Quote.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Quote deleted" });
    } catch (error) {
        next(error);
    }
};