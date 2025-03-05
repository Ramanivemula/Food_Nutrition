import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEdit3 } from "react-icons/fi"; // Edit icon
import { IoArrowBack } from "react-icons/io5"; // Back button icon

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    age: "",
    weight: "",
    height: "",
    phases: "",
  });

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    age: false,
    weight: false,
    height: false,
    phases: false,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          console.log("No token found! Redirecting...");
          return;
        }
        const res = await axios.get("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("userToken");
      await axios.put("http://localhost:5000/api/profile", user, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Profile updated successfully!");
      setEditMode({
        name: false,
        email: false,
        age: false,
        weight: false,
        height: false,
        phases: false,
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="flex justify-center items-center min-h-screen p-6 bg-gray-50">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8 relative">
        {/* Back Button (Only Icon) */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-900"
        >
          <IoArrowBack size={24} />
        </button>

        {/* Profile Title - Unique Name & Blue Color */}
        <h2 className="text-3xl font-bold text-blue-600 text-center mb-6">
         View Profile
        </h2>

        <div className="space-y-6">
          {[
            { label: "Name", field: "name" },
            { label: "Email", field: "email" },
            { label: "Age", field: "age" },
            { label: "Weight (kg)", field: "weight" },
            { label: "Height (cm)", field: "height" },
          ].map(({ label, field }) => (
            <div key={field} className="relative border-b pb-2">
              <label className="font-semibold text-black">{label}</label>
              <div className="flex justify-between items-center mt-1">
                {editMode[field] ? (
                  <input
                    type="text"
                    name={field}
                    value={user[field]}
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2  rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                ) : (
                  <span className="text-gray-800">{user[field]}</span>
                )}
                <button
                  onClick={() =>
                    setEditMode({ ...editMode, [field]: !editMode[field] })
                  }
                  className="absolute right-0 top-0 text-blue-5f00 hover:text-blue-300"
                >
                  <FiEdit3 size={18} />
                </button>
              </div>
            </div>
          ))}

          {/* Phases Dropdown */}
          <div className="relative border-b pb-2">
            <label className="font-semibold text-black">Phases</label>
            <div className="flex justify-between items-center mt-1">
              {editMode.phases ? (
                <select
                  name="phases"
                  value={user.phases}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
                >
                  <option value="Menstrual">Menstrual</option>
                  <option value="Pregnancy">Pregnancy</option>
                  <option value="Normal">Normal</option>
                </select>
              ) : (
                <span className="text-gray-800">{user.phases}</span>
              )}
              <button
                onClick={() =>
                  setEditMode({ ...editMode, phases: !editMode.phases })
                }
                className="absolute right-0 top-0 text-blue-500 hover:text-blue-700"
              >
                <FiEdit3 size={18} />
              </button>
            </div>
          </div>

          {/* Save Changes Button - Unique Style */}
          <div className="text-center mt-6">
            <button
              onClick={handleSave}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:scale-105 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
