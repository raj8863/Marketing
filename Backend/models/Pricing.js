import mongoose from 'mongoose';

const planSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: String, 
  desc: String,
  popular: { type: Boolean, default: false },
  color: { type: String, default: 'slate' },
  // 🔥 Unlimited Dynamic Features
  features: [{
    name: String,
    info: String,
    isAvailable: { type: Boolean, default: true }
  }]
}, { timestamps: true });

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  website: String,
  planChosen: String,
  createdAt: { type: Date, default: Date.now }
});

export const Plan = mongoose.model('Plan', planSchema);
export const Enquiry = mongoose.model('Enquiry', enquirySchema);