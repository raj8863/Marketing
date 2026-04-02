import { Plan, Enquiry } from "../models/Pricing.js";

// @desc Get all plans for user site
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: 1 });
    res.status(200).json(plans);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc Admin: Create or Update (Upsert) plan
export const upsertPlan = async (req, res) => {
  try {
    const { id } = req.params;
    if (id) {
      const updated = await Plan.findByIdAndUpdate(id, req.body, { new: true });
      return res.json(updated);
    }
    const newPlan = new Plan(req.body);
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (err) { res.status(400).json({ message: err.message }); }
};

// @desc Admin: Delete plan
export const deletePlan = async (req, res) => {
  try {
    await Plan.findByIdAndDelete(req.params.id);
    res.json({ message: "Plan Terminated" });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc User: Submit enquiry
export const createEnquiry = async (req, res) => {
  try {
    const newLead = new Enquiry(req.body);
    await newLead.save();
    res.status(201).json({ success: true });
  } catch (err) { res.status(400).json({ success: false }); }
};

// @desc Admin: Get enquiry list
export const getLeads = async (req, res) => {
  try {
    const leads = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(leads);
  } catch (err) { res.status(500).json({ message: err.message }); }
};