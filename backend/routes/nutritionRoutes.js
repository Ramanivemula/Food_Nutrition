const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();

// Route to fetch nutritional data
router.get("/food", async (req, res) => {
  try {
    const { query } = req.query; // Get food name from query params
    if (!query) {
      return res.status(400).json({ message: "Food query is required" });
    }

    const response = await axios.get(`https://api.api-ninjas.com/v1/nutrition?query=${query}`, {
      headers: { "X-Api-Key": process.env.API_NINJAS_KEY },
    });

    if (response.data.length === 0) {
      return res.status(404).json({ message: "No data found for this food item" });
    }

    res.json(response.data[0]); // Send the first result
  } catch (error) {
    console.error("Error fetching nutrition data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
