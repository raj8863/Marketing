import Team from "../models/Team.js";
import { cloudinary } from "../config/cloudinary.js";

// Helper: Cloudinary se image delete karne ke liye Public ID nikalna
const getPublicId = (url) => {
  try {
    if (!url || !url.includes('upload/')) return null;
    
    // Cloudinary URL format: res.cloudinary.com/cloudname/image/upload/v123/folder/id.jpg
    const parts = url.split('/');
    const fileName = parts[parts.length - 1]; // e.g., "abc123.jpg"
    const folder = parts[parts.length - 2];   // e.g., "decent11_team"
    
    // folder/public_id return karta hai
    return `${folder}/${fileName.split('.')[0]}`;
  } catch (err) {
    console.error("Public ID Parsing Error:", err);
    return null;
  }
};

export const getTeam = async (req, res) => {
  try {
    const team = await Team.find().sort({ createdAt: -1 });
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Database Link Failure" });
  }
};

export const createTeam = async (req, res) => {
  try {
    const { name, role } = req.body;
    
    // Multer agar fail hota hai toh req.file undefined hoti hai
    if (!req.file) {
      console.error("UPLOAD_FAIL: Check your Cloudinary Cloud Name & API Key in config.");
      return res.status(400).json({ 
        message: "Image upload failed. Cloudinary is not responding.",
        error: "Check server terminal for details."
      });
    }

    const image = req.file.path; // Cloudinary URL milta hai yahan
    const member = await Team.create({ name, role, image });
    
    res.status(201).json(member);
  } catch (err) {
    // Agar server crash hota hai toh yahan details milengi
    console.error("BACKEND_CREATE_ERROR_DETAIL:", err); 
    res.status(500).json({ 
      message: "Cloud Onboarding Failed", 
      error: err.message 
    });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { name, role } = req.body;
    const member = await Team.findById(req.params.id);
    
    if (!member) return res.status(404).json({ message: "Operative Not Found" });

    member.name = name || member.name;
    member.role = role || member.role;

    // Agar nayi image upload hui hai
    if (req.file) {
      // 1. Purani image delete karein (agar exists)
      if (member.image) {
        const publicId = getPublicId(member.image);
        if (publicId) {
          await cloudinary.uploader.destroy(publicId);
          console.log("Old image deleted from Cloudinary:", publicId);
        }
      }
      // 2. Naya path update karein
      member.image = req.file.path;
    }

    const updated = await member.save();
    res.json(updated);
  } catch (err) {
    console.error("BACKEND_UPDATE_ERROR:", err);
    res.status(500).json({ message: "Update Error", error: err.message });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const member = await Team.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Node Not Found" });

    // Cloudinary se image hatana zaroori hai storage bachane ke liye
    if (member.image) {
      const publicId = getPublicId(member.image);
      if (publicId) {
        await cloudinary.uploader.destroy(publicId);
      }
    }

    await member.deleteOne();
    res.json({ message: "Operative Terminated" });
  } catch (err) {
    console.error("BACKEND_DELETE_ERROR:", err);
    res.status(500).json({ message: "Deletion Failed" });
  }
};