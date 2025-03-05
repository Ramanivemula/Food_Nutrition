const mongoose = require("mongoose");

const recommendationSchema = new mongoose.Schema({
  phase: { type: String, required: true },
  ageGroup: { min: Number, max: Number },
  pregnancyMonth: Number,
  foods: [
    {
      name: String,
      benefit: String,
      image: String,
    },
  ],
  exercises: [
    {
      name: String,
      benefit: String,
      image: String,
    },
  ],
});

module.exports = mongoose.model("Recommendation", recommendationSchema);
