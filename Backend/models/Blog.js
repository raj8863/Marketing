import mongoose from 'mongoose';

// Schema for individual comments
const commentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    text: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// Main Blog Schema
const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true }, // e.g., "seo-trends-2026"
    category: { type: String, required: true },
    author: { type: String, required: true },
    role: { type: String, required: true }, // e.g., "Head of Strategy"
    date: { type: String, required: true }, // e.g., "Jan 25, 2026"
    readTime: { type: String, required: true }, // e.g., "5 min read"
    image: { type: String, required: true },
    excerpt: { type: String, required: true },
    content: [{ type: String }], // Array of strings (paragraphs/headers)
    
    // Interactive Features
    likes: { type: Number, default: 0 },
    comments: [commentSchema]
}, {
    timestamps: true 
});

export default mongoose.model('Blog', blogSchema);