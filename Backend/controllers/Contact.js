import Contact from '../models/Contact.js';

export const submitContact = async (req, res, next) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(201).json({ success: true, data: newContact });
  } catch (error) {
    res.status(400);
    next(error);
  }
};

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500);
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Message deleted" });
  } catch (error) {
    next(error);
  }
};