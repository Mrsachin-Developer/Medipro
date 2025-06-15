import axios from "axios";
import Hospital from "../models/Hospital.js";

// Utility to get lat/lon using Nominatim API
const getCoordinates = async ({ pincode, city }) => {
  const query = pincode ? `${pincode}, India` : `${city}, India`;
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    query
  )}`;

  try {
    const res = await axios.get(url, {
      headers: { "User-Agent": "MediSetu-App/1.0" },
    });

    if (!res.data || res.data.length === 0)
      throw new Error("Location not found via Nominatim");

    return {
      lat: parseFloat(res.data[0].lat),
      lon: parseFloat(res.data[0].lon),
    };
  } catch (error) {
    console.error("Nominatim Geocoding Error:", error.message);
    throw new Error("Failed to get coordinates for the provided location.");
  }
};

// POST /api/hospitals/nearby
export const getNearbyHospitals = async (req, res) => {
  const { pincode, city, schemeId } = req.body;

  if (!pincode && !city) {
    return res.status(400).json({ error: "Pincode or City required" });
  }

  try {
    const { lat, lon } = await getCoordinates({ pincode, city });

    const query = `
      [out:json];
      (
        node["amenity"~"hospital|clinic"](around:5000,${lat},${lon});
        way["amenity"~"hospital|clinic"](around:5000,${lat},${lon});
        relation["amenity"~"hospital|clinic"](around:5000,${lat},${lon});
      );
      out center;
    `;

    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      `data=${encodeURIComponent(query)}`,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    let hospitals = response.data.elements.map((h) => ({
      name: h.tags?.name || "Unnamed Hospital",
      operator: h.tags?.operator || "Unknown",
      type: h.tags?.amenity || "hospital",
      lat: h.lat || h.center?.lat,
      lon: h.lon || h.center?.lon,
      address: h.tags?.address || h.tags?.["addr:full"] || "",
      phone: h.tags?.phone || "",
      website: h.tags?.website || "",
    }));

    // If a schemeId is provided, mark empanelled hospitals
    if (schemeId) {
      const empanelledHospitals = await Hospital.find({
        empanelledSchemes: schemeId,
      }).select("_id name location");

      hospitals = hospitals.map((osmHosp) => {
        const dbMatch = empanelledHospitals.find(
          (dbHosp) => dbHosp.name.toLowerCase() === osmHosp.name.toLowerCase()
        );
        return {
          ...osmHosp,
          isEmpanelledForScheme: !!dbMatch,
          dbId: dbMatch ? dbMatch._id : null,
        };
      });
    }

    return res.json({
      source: "Overpass API",
      location_used: pincode ? `Pincode: ${pincode}` : `City: ${city}`,
      total_found: hospitals.length,
      hospitals,
    });
  } catch (err) {
    console.error("Hospital fetch error:", err.message);
    res.status(500).json({
      error: err.message || "Could not fetch hospitals",
    });
  }
};

// GET /api/hospitals/:id
export const getHospitalById = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id).populate(
      "empanelledSchemes",
      "name"
    );
    if (!hospital) {
      return res.status(404).json({ error: "Hospital not found in DB" });
    }
    // Always return lat/lon at top level for frontend map compatibility
    const hospitalObj = hospital.toObject();
    hospitalObj.lat = hospital.location?.lat;
    hospitalObj.lon = hospital.location?.lon;
    res.status(200).json(hospitalObj);
  } catch (error) {
    console.error("Error fetching hospital by ID:", error.message);
    res.status(500).json({ error: "Server error fetching hospital details." });
  }
};

// POST /api/hospitals
export const createHospital = async (req, res) => {
  const {
    name,
    type,
    operator,
    lat,
    lon,
    address,
    phone,
    website,
    empanelledSchemes,
  } = req.body;

  if (!name || !lat || !lon) {
    return res.status(400).json({
      error: "Name, latitude, and longitude are required for a hospital.",
    });
  }

  try {
    const newHospital = await Hospital.create({
      name,
      type,
      operator,
      location: { lat, lon },
      address,
      phone,
      website,
      empanelledSchemes,
    });

    // Always return lat/lon at top level for frontend map compatibility
    const hospitalObj = newHospital.toObject();
    hospitalObj.lat = newHospital.location?.lat;
    hospitalObj.lon = newHospital.location?.lon;

    res.status(201).json({
      message: "Hospital added successfully to DB",
      hospital: hospitalObj,
    });
  } catch (error) {
    console.error("Error creating hospital:", error.message);
    res.status(500).json({ error: "Could not create hospital in DB." });
  }
};
