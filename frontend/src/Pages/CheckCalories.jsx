import { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const CheckCalories = () => {
  const [showMore, setShowMore] = useState(false);
  const [highlightedNutrient, setHighlightedNutrient] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch nutrition data from the backend
  const handleSearch = async () => {
    setIsSearched(true);
    setLoading(true);
    setError("");
    setData(null);

    if (!searchQuery.trim()) {
      setError("Please enter a valid food item.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/api/nutrition/food?query=${searchQuery}`);
      if (response.data.error) {
        setError(response.data.error);
        setData(null);
      } else {
        setData(response.data);
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to fetch nutrition data. Please try again.");
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const handleHighlight = (nutrient) => {
    setHighlightedNutrient(nutrient);
  };

  const mainNutrients = ["calories", "cholesterol_mg", "carbohydrates_total_g"];
  const allNutrients = data ? Object.keys(data).filter((key) => key !== "name") : [];

  const chartData = {
    labels: allNutrients,
    datasets: [
      {
        label: "Nutrient Values",
        data: allNutrients.map((nutrient) => data[nutrient]),
        backgroundColor: allNutrients.map((nutrient) =>
          nutrient === highlightedNutrient ? "#ff6384" : "#36a2eb"
        ),
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 py-24 px-6 flex flex-col items-center">
        <div className="relative w-full max-w-lg mb-10">
          <div className="flex items-center bg-white bg-opacity-90 border border-gray-300 rounded-full shadow-md backdrop-blur-lg px-4 py-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for food (e.g., Apple, Banana, Orange)"
              className="w-full bg-transparent border-none text-gray-700 text-lg focus:outline-none px-2"
            />
            <button onClick={handleSearch} className="text-gray-500 hover:text-gray-700 transition duration-300">
              <FaSearch className="text-xl" />
            </button>
          </div>
        </div>

        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {isSearched && data && (
          <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl">
            {/* 🍏 Nutrients Section */}
            <div className="bg-white shadow-2xl rounded-xl w-full md:w-1/2 p-6 hover:scale-105 transform transition duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Nutritional Information</h2>
              <ul className="space-y-4">
                {mainNutrients.map((nutrient) => (
                  <li
                    key={nutrient}
                    className="p-4 cursor-pointer bg-gray-200 rounded-lg hover:bg-blue-200 transition duration-200"
                    onClick={() => handleHighlight(nutrient)}
                  >
                    <strong className="text-gray-700">{nutrient.replace("_", " ").toUpperCase()}:</strong> {data[nutrient]}
                  </li>
                ))}
              </ul>

              {showMore && (
                <ul className="mt-4 space-y-4">
                  {allNutrients
                    .filter((nutrient) => !mainNutrients.includes(nutrient))
                    .map((nutrient) => (
                      <li
                        key={nutrient}
                        className="p-4 cursor-pointer bg-gray-200 rounded-lg hover:bg-blue-200 transition duration-200"
                        onClick={() => handleHighlight(nutrient)}
                      >
                        <strong className="text-gray-700">{nutrient.replace("_", " ").toUpperCase()}:</strong> {data[nutrient]}
                      </li>
                    ))}
                </ul>
              )}

              <button
                className="mt-6 px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-full shadow-md hover:scale-105 transform transition duration-300"
                onClick={handleShowMore}
              >
                {showMore ? "Show Less Details" : "More Details"}
              </button>
            </div>

            {/* 📊 Graph Section */}
            <div className="bg-white shadow-2xl rounded-xl w-full md:w-1/2 p-6 hover:scale-105 transform transition duration-300">
              <h2 className="text-3xl font-semibold text-gray-800 mb-6">Nutrient Breakdown</h2>
              <Bar data={chartData} />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CheckCalories;
