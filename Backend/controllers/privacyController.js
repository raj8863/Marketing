import Privacy from "../models/Privacy.js";

// ✅ GET PRIVACY
export const getPrivacy = async (req, res) => {
  try {
    let data = await Privacy.findOne();

    // Auto create if empty
    if (!data) {
      data = await Privacy.create({
        sections: [
          {
            title: "Information We Collect",
            content: "We collect user data..."
          }
        ]
      });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ UPDATE PRIVACY
export const updatePrivacy = async (req, res) => {
  try {
    let data = await Privacy.findOne();

    if (!data) {
      data = new Privacy(req.body);
    } else {
      data.sections = req.body.sections;
      data.lastUpdated = new Date().toDateString();
    }

    await data.save();
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};