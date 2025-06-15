import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HospitalMap from "../components/HospitalMap";

const EligibilityResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { schemes = [], hospitals = [], formData = {} } = location.state || {};

  if (!location.state) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex flex-col items-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-150 to-purple-300">
      <div className="w-full max-w-3xl mx-auto space-y-6 my-10">
        {/* Matching Schemes */}
        <div>
          <h2 className="text-xl font-semibold text-center mb-2">
            Matching Schemes
          </h2>
          {schemes.length > 0 ? (
            schemes.map((scheme, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md mb-4"
              >
                <h3 className="text-lg font-bold text-indigo-800">
                  {scheme.name}
                </h3>
                <p>
                  <span className="font-semibold">Benefits:</span>{" "}
                  {scheme.benefits}
                </p>
                <p>
                  <span className="font-semibold">Details:</span>{" "}
                  {scheme.details}
                </p>
                <p>
                  <span className="font-semibold">Description:</span>{" "}
                  {scheme.description}
                </p>
                <p>
                  <span className="font-semibold">Eligibility:</span>{" "}
                  {scheme.eligibility}
                </p>
                <p>
                  <span className="font-semibold">Required Documents:</span>{" "}
                  {scheme.documents}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center">No schemes found.</p>
          )}
        </div>

        {/* Nearby Hospitals */}
        <div>
          <h2 className="text-xl font-semibold text-center mb-2">
            Nearby Medical Care
          </h2>
          {hospitals.length > 0 ? (
            <>
              {hospitals.map((hospital, idx) => (
                <div
                  key={idx}
                  className="bg-gray-100 rounded-xl p-5 shadow-md mb-3"
                >
                  <h3 className="text-md font-bold text-blue-900">
                    {hospital.name}
                  </h3>
                  <p>
                    <span className="font-semibold">Address:</span>{" "}
                    {hospital.address}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span> {hospital.type}
                  </p>
                  <p>
                    <span className="font-semibold">Contact:</span>{" "}
                    {hospital.phone || hospital.contact || "N/A"}
                  </p>
                </div>
              ))}
              <div className="my-6">
                <h2 className="text-xl font-semibold text-center mb-2">
                  Hospitals on Map
                </h2>
                <HospitalMap hospitals={hospitals} />
              </div>
            </>
          ) : (
            <p className="text-center">
              No hospitals found near "{formData.location}".
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EligibilityResults;
