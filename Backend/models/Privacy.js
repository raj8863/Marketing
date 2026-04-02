import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
  title: String,
  content: String,
  order: Number
});

const privacySchema = new mongoose.Schema({
  lastUpdated: {
    type: String,
    default: new Date().toDateString()
  },
  sections: [sectionSchema]
});

export default mongoose.model("Privacy", privacySchema);