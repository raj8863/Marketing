import About from '../models/About.js';

// @desc    Get About Page Content
// @route   GET /api/about
// @access  Public
export const getAboutData = async (req, res) => {
  try {
    // Assuming there is only one settings document for the page
    const aboutData = await About.findOne(); 
    if (!aboutData) {
      return res.status(404).json({ success: false, message: 'Content not found' });
    }
    res.status(200).json({ success: true, data: aboutData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Seed Initial Data (Run this ONCE to populate your DB)
// @route   POST /api/about/seed
// @access  Admin
export const seedAboutData = async (req, res) => {
  try {
    // Wipe existing data to prevent duplicates
    await About.deleteMany(); 
    
    // Create new data using your React arrays (Make sure to pass them in the request body)
    const seededData = await About.create(req.body);
    
    res.status(201).json({ success: true, message: "System Seeded", data: seededData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};