import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const EligibilityForm = () => {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    location: "",
    income: "",
    symptoms: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/schemes");
      const data = await response.json();
      const hospRes = await fetch(
        "http://localhost:5000/api/hospitals/nearby",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ city: formData.location }),
        }
      );
      const hospData = await hospRes.json();

      // Navigate to results page with data
      navigate("/eligibility-results", {
        state: {
          schemes: data.schemes || [],
          hospitals: hospData.hospitals || [],
          formData,
        },
      });
    } catch (error) {
      alert("Failed to fetch data from server.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-150 to-purple-300">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 m-10 rounded-lg shadow-lg w-150 text-sm mb-6"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Eligibilities
        </h1>
        <p className="text-center mb-6 text-indigo-300">
          Enter Your Eligibilities Below.
        </p>

        <div className="mb-4">
          <label className="block text-white mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          >
            <option value="" disabled>
              Select gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-white mb-1">Monthly Income (INR)</label>
          <input
            type="number"
            name="income"
            value={formData.income}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-white mb-1">
            Medical Needs or Symptoms
          </label>
          <textarea
            name="symptoms"
            value={formData.symptoms}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 rounded bg-gray-800 text-white focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded-full cursor-pointer hover:opacity-90 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default EligibilityForm;
