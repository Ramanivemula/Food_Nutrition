import { Link } from "react-router-dom";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import background from "../assets/background.jpg";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import calorie from "../assets/calorie.png";
import healthy from "../assets/healthy.jpg";
import women from "../assets/women.jpg";
import choose from "../assets/choose.jpg";

const Home = ({ user }) => {
  const [bmiModal, setBmiModal] = useState(false);
  const [nutritionModal, setNutritionModal] = useState(false);
  const [eatingModal, setEatingModal] = useState(false);
  const [selectedNutrition, setSelectedNutrition] = useState(null);
  const [dietPreference, setDietPreference] = useState("Vegetarian");
  const [bmi, setBmi] = useState(null);
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const calculateBMI = () => {
    if (weight && height) {
      const heightInMeters = height / 100;
      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
      setBmi(bmiValue);
    }
  };

  const getBMICategory = () => {
    if (!bmi) return "";
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 18.5 && bmi < 24.9) return "Normal weight";
    if (bmi >= 25 && bmi < 29.9) return "Overweight";
    return "Obese";
  };

  const nutritionPlans = {
    "Pregnancy Nutrition": "Include folic acid, iron-rich foods, and calcium sources like milk, leafy greens, and nuts.",
    "Menstrual Health Diet": "Focus on iron-rich foods like spinach, lentils, and lean meats. Include omega-3 sources like flaxseeds.",
  };

  const mealPlans = {
    Vegetarian: "Eat legumes, grains, tofu, leafy greens, and nuts for a balanced diet.",
    "Non-Vegetarian": "Include lean meats, fish, eggs, and dairy with vegetables and grains.",
    Vegan: "Focus on plant-based proteins like beans, lentils, quinoa, and fortified plant milks.",
    "Gluten-Free": "Opt for rice, quinoa, potatoes, fresh fruits, and vegetables while avoiding wheat-based products.",
  };

  const cards = [
    {
      id: 1,
      title: "Check Calories / BMI",
      description: "Calculate your BMI and understand your body weight category.",
      image: calorie,
      action: () => setBmiModal(true),
    },
    {
      id: 2,
      title: "Women's Nutrition",
      description: "Get recommended food plans for pregnancy & menstrual health.",
      image: women,
      action: () => setNutritionModal(true),
    },
    {
      id: 3,
      title: "Healthy Eating",
      description: "Understand what you eat and make healthier choices every day.",
      image: healthy,
      action: () => setEatingModal(true),
    },
  ];

  return (
    <>
      <Header user={user} />
      {/*Main Part */}
      <div className="bg-gray-100">
        <section className="relative w-full h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
          <div className="bg-black bg-opacity-50 p-10 rounded-lg text-center text-white max-w-3xl shadow-lg">
            <h1 className="text-5xl font-extrabold mb-4">Fuel Your Health with NutriTrack</h1>
            <p className="text-lg mb-6">Discover the best nutrition plans tailored to your needs.</p>
            <Link to="/check-calories" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition">Start Tracking Now</Link>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="container mx-auto px-6 py-20 flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose NutriTrack? 🤔</h2>

          <div className="flex flex-col md:flex-row items-center justify-center gap-16 max-w-5xl">
            {/* Left Side Image */}
            <div className="w-64 h-auto flex justify-center">
              <img src={choose} alt="Healthy Eating" className="rounded-lg shadow-lg" />
            </div>

            {/* Right Side Content */}
            <div className="text-left max-w-lg space-y-6">
              <p className="text-gray-700 text-lg">✔ Track your daily calorie intake effortlessly.</p>
              <p className="text-gray-700 text-lg">🥗 Get detailed nutrition breakdowns of various foods.</p>
              <p className="text-gray-700 text-lg">💪 Achieve your fitness goals with personalized diet recommendations.</p>
              <p className="text-gray-700 text-lg">👩‍⚕ Special nutrition plans for pregnancy and menstrual health.</p>
              <p className="text-gray-700 text-lg">📊 Visualize nutrition values with interactive graphs.</p>
              </div>
          </div>
        </section>

        {/*Cards */}
        <section className="container mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {cards.map((card) => (
            <div key={card.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 cursor-pointer p-6 flex flex-col items-center text-center" onClick={card.action}>
              <img src={card.image} alt={card.title} className="w-32 h-32 object-cover rounded-lg" />
              <h2 className="text-xl font-semibold mt-4">{card.title}</h2>
              <p className="text-gray-600 mt-2">{card.description}</p>
            </div>
          ))}
        </section>
      </div>
      <Footer />

      {/* BMI Modal */}
      {bmiModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center relative">
            <FaTimes className="absolute top-4 right-4 text-gray-700 cursor-pointer hover:text-red-500" onClick={() => setBmiModal(false)} />
            <h2 className="text-2xl font-bold mb-4">Calculate Your BMI</h2>
            <input type="number" placeholder="Weight (kg)" className="w-full p-2 border rounded mb-2" value={weight} onChange={(e) => setWeight(e.target.value)} />
            <input type="number" placeholder="Height (cm)" className="w-full p-2 border rounded mb-4" value={height} onChange={(e) => setHeight(e.target.value)} />
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg" onClick={calculateBMI}>Calculate</button>
            {bmi && (
              <div className="mt-4 p-3 bg-gray-100 rounded-lg">
                <h3 className="text-lg font-bold">Your BMI: {bmi} ({getBMICategory()})</h3>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Women's Nutrition Modal */}
      {nutritionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center relative">
            <FaTimes className="absolute top-4 right-4 text-gray-700 cursor-pointer hover:text-red-500" onClick={() => setNutritionModal(false)} />
            <h2 className="text-2xl font-bold mb-4">Women's Nutrition</h2>
            
            <div className="mb-4">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2" onClick={() => setSelectedNutrition("Pregnancy Nutrition")}>Pregnancy</button>
              <button className="bg-pink-500 text-white px-4 py-2 rounded-lg" onClick={() => setSelectedNutrition("Menstrual Health Diet")}>Menstrual Health</button>
            </div>

            {selectedNutrition && (
              <div className="p-3 bg-gray-100 rounded-lg">
                <p className="text-lg font-semibold">{nutritionPlans[selectedNutrition]}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Healthy Eating Modal */}
      {eatingModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center relative">
            <FaTimes className="absolute top-4 right-4 text-gray-700 cursor-pointer hover:text-red-500" onClick={() => setEatingModal(false)} />
            <h2 className="text-2xl font-bold mb-4">Healthy Eating Guide</h2>

            <p className="text-gray-700 text-lg">Choose a meal preference to see a plan:</p>
            
            <select className="w-full p-2 border rounded my-4" onChange={(e) => setDietPreference(e.target.value)}>
              {Object.keys(mealPlans).map((diet) => (
                <option key={diet} value={diet}>{diet}</option>
              ))}
            </select>

            <div className="p-3 bg-gray-100 rounded-lg">
              <p className="text-lg font-semibold">{mealPlans[dietPreference]}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
  