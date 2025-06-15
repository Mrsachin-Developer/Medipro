import fetchRealTimeSchemes from "../utils/schemeScraper.js";

export const getAllSchemes = async (req, res) => {
  try {
    const schemes = await fetchRealTimeSchemes();
    res.status(200).json({ schemes });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch real-time schemes",
      error: error.message,
    });
  }
};

export const getSchemeById = async (req, res) => {
  try {
    const id = req.params.id;
    const schemes = await fetchRealTimeSchemes();
    const scheme = schemes.find((s) => String(s.id) === String(id));
    if (!scheme) {
      return res.status(404).json({ message: "Scheme not found" });
    }
    res.status(200).json({ scheme });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch scheme", error: error.message });
  }
};

export const getEligibleSchemes = async (req, res) => {
  try {
    const user = req.body; // { age, gender, location, income, symptoms }
    const schemes = await fetchRealTimeSchemes();

    // TODO: Replace with real eligibility logic based on your scheme data
    const eligibleSchemes = schemes.filter((scheme) => {
      // Example: filter by income, age, etc.
      // return user.income <= scheme.maxIncome && user.age >= scheme.minAge;
      return true; // Placeholder: allow all
    });

    res.status(200).json({ schemes: eligibleSchemes });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch eligible schemes",
      error: error.message,
    });
  }
};
