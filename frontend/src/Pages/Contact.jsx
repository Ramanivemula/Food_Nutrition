import { useState } from "react";
import { FaUser, FaEnvelope, FaCommentDots, FaPhoneAlt } from "react-icons/fa";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setMessage("All fields are required!");
      return;
    }
    setMessage("Your message has been sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
    <Header></Header>
    <div className="px-2 py-28 bg-gray-100">
      <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg p-8">
        {/* Heading with Icon */}
        <div className="flex items-center justify-center mb-6">
          <FaPhoneAlt className="text-blue-600 text-3xl mr-3" />
          <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <FaCommentDots className="absolute left-3 top-3 text-gray-500" />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              className="pl-10 w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold"
          >
            Send Message
          </button>
        </form>

        {message && <p className="text-center text-gray-700 mt-4">{message}</p>}
      </div>
    </div>
    <Footer></Footer>
    </>
  );
};

export default Contact;
