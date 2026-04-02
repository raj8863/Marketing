import Audit from '../models/Audit.js';
import dns from 'dns/promises';
import nodemailer from 'nodemailer';

// 1. Audit Verify and Create Logic
export const verifyAndCreateAudit = async (req, res) => {
  const { url, email } = req.body;
  const domain = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0].split('?')[0];

  try {
    // DNS Check
    await dns.lookup(domain);

    // Save to DB
    const newAudit = await Audit.create({ url, email, domain });

    // Success Response (Immediate)
    res.status(201).json({ success: true, message: "Audit received", data: newAudit });

    // Background Email (Fire and forget)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Lead: ${domain}`,
      text: `Lead: ${email} for site ${url}`
    }).catch(err => console.log("Silent Email Error:", err.message));

  } catch (error) {
    console.log("Validation/DB Error:", error.message);
    res.status(400).json({ success: false, message: "Domain invalid or DB error." });
  }
};

// 2. Dashboard ke liye (Yahan export hona zaroori hai!)
export const getAudits = async (req, res) => {
  try {
    const audits = await Audit.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: audits });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error fetching audits." });
  }
};