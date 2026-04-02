import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

// .env file load karne ke liye
dotenv.config();

// Configuration setup
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dvbc2ocgq',
  api_key: process.env.CLOUDINARY_API_KEY || '474195536472622',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'keK8oxK9cWY1L0v3SL67JQzL3-o',
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'decent11_team',
    allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
    // Transformation optimization ke liye zaroori hai
    transformation: [{ width: 600, height: 600, crop: 'fill', gravity: 'face' }],
  },
});

export { cloudinary, storage };