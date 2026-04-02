import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  subtitle: { type: String },
  category: { type: String, required: true }, // e.g., UI/UX, Web Design
  client: { type: String },
  timeline: { type: String },
  role: { type: String },
  website: { type: String },
  
  // Stats for the case study
  stats: [
    { label: String, value: String, iconType: String }
  ],
  
  // Content Sections
  challengeText: { type: String },
  challengePoints: [String],
  solutionText: { type: String },
  techStack: [String],
  
  // Images
  mainImage: { type: String, required: true },
  secondaryImage: { type: String },
  mobileMockup: { type: String },
  
  isFeatured: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Project', ProjectSchema);