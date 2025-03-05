import { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const WomenNutrition = () => {
  const [user, setUser] = useState(null);
  const [phase, setPhase] = useState("");
  const [age, setAge] = useState(null);
  const [pregnancyMonth, setPregnancyMonth] = useState("");
  const [recommendations, setRecommendations] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (!token) {
          console.error("No token found. Redirecting to login...");
          return; // Optionally redirect to login
        }

        const response = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Fetched User Data:", response.data);

        if (response.data.message === "Invalid token") {
          console.error("Token expired. Redirecting to login...");
          localStorage.removeItem("userToken");
          return; // Optionally redirect to login
        }

        if (response.data.phases) setPhase(response.data.phases);
        setAge(response.data.age);
        setUser(response.data);
      } catch (error) {
        console.error(
          "Error fetching user details:",
          error.response ? error.response.data : error.message
        );
      }
    };

    fetchUserDetails(); // ✅ Ensuring the function runs on mount
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/recommendations", {
        phase: phase,
        age: age,
        pregnancyMonth: phase === "Pregnancy" ? pregnancyMonth : undefined,
      });

      console.log("Fetched Recommendations:", res.data);

      if (!res.data || res.data.length === 0) {
        console.error("No recommendations found!");
        setRecommendations(null);
      } else {
        setRecommendations(res.data[0]); // Assuming first item has the needed data
      }
    } catch (error) {
      console.error(
        "Error fetching recommendations:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <><Header/>
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-8">Personalized Nutrition & Fitness</h1>

      {user ? (
        <div className="w-full max-w-3xl bg-white p-6 shadow-xl rounded-2xl border border-gray-200">
          <p className="text-lg font-semibold mb-2 text-gray-700">
            <strong>Phase:</strong> {phase}
          </p>
          <p className="text-lg font-semibold mb-4 text-gray-700">
            <strong>Age:</strong> {age} years
          </p>

          {phase === "Pregnancy" && (
            <div className="mb-6">
              <label className="block text-gray-800 font-semibold mb-2">
                Select Pregnancy Month:
              </label>
              <select
                value={pregnancyMonth}
                onChange={(e) => setPregnancyMonth(e.target.value)}
                className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">Select</option>
                {Array.from({ length: 9 }, (_, i) => (
                  <option key={i + 1} value={i + 1}>{`${i + 1} Month`}</option>
                ))}
              </select>
            </div>
          )}

          <button
            onClick={fetchRecommendations}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition-all"
          >
            Get Recommendations
          </button>

          {recommendations && (
  <div className="mt-8">
    {/* Food Recommendations */}
    <h2 className="text-2xl font-bold text-blue-600 mb-4">Recommended Foods</h2>
    <div className="grid grid-cols-2 gap-6">
      {recommendations?.foods?.length > 0 ? (
        recommendations.foods.map((food, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <img
              src={food.image}
              alt={food.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <p className="mt-3 font-bold text-center">{food.name}</p>
            <p className="text-sm text-center">{food.benefit}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">
          No food recommendations available.
        </p>
      )}
    </div>

    {/* Exercise Recommendations */}
    <h2 className="text-2xl font-bold text-green-600 mt-8 mb-4">Recommended Exercises</h2>
    <div className="grid grid-cols-2 gap-6">
      {recommendations?.exercises?.length > 0 ? (
        recommendations.exercises.map((exercise, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-lg">
            <img
              src={exercise.image}
              alt={exercise.name}
              className="w-full h-32 object-cover rounded-lg"
            />
            <p className="mt-3 font-bold text-center">{exercise.name}</p>
            <p className="text-sm text-center">{exercise.benefit}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">
          No exercise recommendations available.
        </p>
      )}
    </div>
  </div>
)}
        </div>
      ) : (
        <p className="text-red-500 font-semibold">Loading user data...</p>
      )}
    </div>
    <Footer></Footer>
    </>
  );

};

export default WomenNutrition;
