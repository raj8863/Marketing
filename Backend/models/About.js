
import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  logos: [{
    name: String,
    url: String
  }],
  seoCategories: [{
    name: String,
    iconName: String, // Stored as a string, e.g., "FaCode"
    color: String,
    desc: String
  }],
  preSeoProtocols: [{
    step: String,
    name: String,
    iconName: String, // e.g., "FaServer"
    detail: String
  }]
}, { timestamps: true });

export default mongoose.model('About', aboutSchema);