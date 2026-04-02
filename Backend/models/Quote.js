import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  details: { type: String },
  services: [String], 
  budget: { type: String },
  status: { type: String, default: 'pending' }, 
  createdAt: { type: Date, default: Date.now }
});

const Quote = mongoose.model('Quote', QuoteSchema);
export default Quote;