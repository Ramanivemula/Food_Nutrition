const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number },
  weight: { type: Number },
  height: { type: Number },
  phases: { type: String,enum: ["Pregnancy", "Menstrual", "Normal"], required: true },
});

module.exports = mongoose.model("User", UserSchema);
