import multer from "multer";
import path from "path";
import { storage } from "../config/cloudinary.js"; // This is the CloudinaryStorage instance

/**
 * UPDATED: Cloudinary Multer Middleware
 * We no longer need fs or uploadDir because the files 
 * flow directly to the cloud.
 */
export const upload = multer({
  storage: storage, // Use the Cloudinary storage engine
  limits: { 
    fileSize: 3 * 1024 * 1024 // Increased to 3MB for high-quality headshots
  }, 
  fileFilter: (req, file, cb) => {
    // Regular expression to check file extensions
    const fileTypes = /jpeg|jpg|png|webp/;
    
    // Check extension
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime type
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    }
    
    // If validation fails, return an error that our errorMiddleware can catch
    cb(new Error("Security_Protocol_Violation: Only images (jpeg, jpg, png, webp) are allowed"));
  }
});