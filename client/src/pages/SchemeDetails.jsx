import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const schemes = [
  {
    name: "Arogya Yojana",
    benefits: "Free medical checkups and discounted treatments",
    details: "Applicable in government hospitals and select private clinics.",
    description:
      "A health scheme for low-income families providing essential care.",
    eligibility: "Income below ₹2,00,000/year, Age 18-60",
    documents: "Aadhar card, Income certificate, Medical prescription",
    portal: "https://arogya.gov.in",
  },
  {
    name: "Swasthya Suraksha",
    benefits: "Cashless hospitalization up to ₹5,00,000",
    details: "Covers major surgeries and critical illness.",
    description: "National-level scheme for serious health conditions.",
    eligibility: "All citizens aged 21-65 with valid ID",
    documents: "Aadhar, Voter ID, Recent medical reports",
    portal: "https://swasthya.gov.in",
  },
];

const SchemeDetails = () => {
  const { schemeName } = useParams();
  const navigate = useNavigate();
  const scheme = schemes.find(
    (s) => s.name.replace(/\s+/g, "-").toLowerCase() === schemeName
  );

  if (!scheme)
    return <div className="text-center text-red-600">Scheme not found.</div>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl p-8 mt-10 shadow-lg">
      <button className="mb-4 text-indigo-600" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <h2 className="text-2xl font-bold mb-2">{scheme.name}</h2>
      <p className="mb-2">
        <span className="font-semibold">Description:</span> {scheme.description}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Benefits:</span> {scheme.benefits}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Details:</span> {scheme.details}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Eligibility:</span> {scheme.eligibility}
      </p>
      <p className="mb-2">
        <span className="font-semibold">Required Documents:</span>{" "}
        {scheme.documents}
      </p>
      <a
        href={scheme.portal}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-700 underline"
      >
        Government Portal
      </a>
    </div>
  );
};

export default SchemeDetails;
