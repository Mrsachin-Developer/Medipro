import React, { useState } from "react";
import HospitalMap from "../components/HospitalMap";

const HospitalFinder = () => {
  const [form, setForm] = useState({ pincode: "", city: "", schemeId: "" });
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");
    setHospitals([]);
    try {
      const res = await fetch("http://localhost:5000/api/hospitals/nearby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.hospitals && data.hospitals.length > 0) {
        setHospitals(data.hospitals);
        setMsg(data.message || `Found ${data.hospitals.length} hospitals.`);
      } else {
        setMsg("No hospitals found for the given location.");
      }
    } catch (err) {
      setMsg("Error fetching hospitals.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <form
        onSubmit={handleSearch}
        className="bg-white rounded shadow p-4 mb-4"
      >
        <div className="mb-2">
          <label className="block mb-1">Pincode</label>
          <input
            type="text"
            name="pincode"
            value={form.pincode}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            placeholder="Enter pincode"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">City</label>
          <input
            type="text"
            name="city"
            value={form.city}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            placeholder="Enter city"
          />
        </div>
        <div className="mb-2">
          <label className="block mb-1">Scheme ID (optional)</label>
          <input
            type="text"
            name="schemeId"
            value={form.schemeId}
            onChange={handleChange}
            className="w-full border px-2 py-1 rounded"
            placeholder="Enter scheme ID"
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? "Searching..." : "Find Hospitals"}
        </button>
      </form>
      {msg && <div className="mb-2 text-center">{msg}</div>}
      <HospitalMap hospitals={hospitals} />
    </div>
  );
};

export default HospitalFinder;
