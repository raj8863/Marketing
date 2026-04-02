// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import connectDB from './config/db.js';
import User from './models/User.js';

// Routes imports
import serviceRoutes from './routes/serviceRoutes.js';
import { errorHandler } from './middlewares/errorMiddleware.js';
import blogRoutes from './routes/BlogRoutes.js';
import quoteRoutes from './routes/QuoteRoute.js';
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import auditRoutes from './routes/auditRoutes.js';
import authRoutes from "./routes/authRoutes.js";
import teamRoutes from "./routes/teamRoutes.js";
import privacyRoutes from "./routes/privacyRoutes.js";
import faqRoutes from './routes/FaqRoutes.js';
import pricingRoutes from './routes/pricingRoutes.js'; 
import bookingRoutes from './routes/bookingRoutes.js';

// 👇 ADDED: Import the new About Routes
import aboutRoutes from './routes/aboutRoutes.js';

dotenv.config();

// --- ADMIN SEEDER LOGIC ---
const seedAdmin = async () => {
    try {
        const adminEmail = process.env.ADMIN_EMAIL.toLowerCase().trim();
        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            console.log("🚀 Creating Default Admin...");
            const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
            
            await User.create({
                name: "Super Admin",
                email: adminEmail,
                password: hashedPassword,
            });
            console.log("✅ Admin Created Successfully: ", adminEmail);
        } else {
            console.log("ℹ️ Admin already exists in database.");
        }
    } catch (error) {
        console.error("❌ Admin Seeding Error:", error.message);
    }
};

// Database connect
connectDB().then(() => {
    seedAdmin(); 
});

const app = express();

app.use(cors());
app.use(express.json());

// --- MOUNT THE ROUTES ---
app.use("/api/auth", authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/audit', auditRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/privacy", privacyRoutes);
app.use("/api/faqs", faqRoutes);
app.use('/api/bookings', bookingRoutes);
app.use("/api/pricing", pricingRoutes);


app.use("/api/about", aboutRoutes);

// Static folders
app.use('/uploads', express.static('uploads'));

app.get('/', (req, res) => {
    res.send('Digital Marketing API is running...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});