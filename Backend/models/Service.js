import mongoose from 'mongoose';

const processSchema = new mongoose.Schema({
    stepId: { type: Number, required: true },
    title: { type: String, required: true },
    icon: { type: String, required: true }, 
    text: { type: String, required: true }
});

const serviceSchema = new mongoose.Schema({
    serviceId: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    icon: { type: String, required: true },
    heroImage: { type: String, default: "" }, // Made optional to prevent 400s if empty
    mainImage: { type: String, default: "" }, // Made optional
    description: { type: String, required: true },
    points: [{ type: String }], 
    process: [processSchema]    
}, { timestamps: true });

export default mongoose.model('Service', serviceSchema);