const express = require("express");
const router = express.Router();
const Recommendation = require("../models/Recommendation"); // Import model

router.post("/", async (req, res) => {
    try {
      const { phase, age, pregnancyMonth } = req.body;
  
      // Check if required fields are received
      console.log("Received Request:", { phase, age, pregnancyMonth });
  
      // Query MongoDB
      let query = { phase };
  
      if (phase === "Pregnancy") {
        query.pregnancyMonth = pregnancyMonth; // Ensure pregnancyMonth is matched
      }
  
      // Ensure age is within range
      query["ageGroup.min"] = { $lte: age };
      query["ageGroup.max"] = { $gte: age };
  
      console.log("MongoDB Query:", query);
  
      const recommendations = await Recommendation.find(query);
  
      console.log("Fetched Recommendations:", recommendations);
  
      if (!recommendations.length) {
        return res.status(404).json({ message: "No recommendations found" });
      }
  
      res.json(recommendations);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      res.status(500).json({ error: "Server error" });
    }
  });
  

module.exports = router;
