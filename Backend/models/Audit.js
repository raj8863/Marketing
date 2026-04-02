import mongoose from 'mongoose';

const auditSchema = new mongoose.Schema({
  url: { type: String, required: true },
  email: { type: String, required: true },
  domain: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

const Audit = mongoose.model('Audit', auditSchema);
export default Audit;