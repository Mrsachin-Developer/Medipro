import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EligibilityForm from "./pages/EligibilityForm";
import HospitalFinder from "./pages/HospitalFinder";
import EligibilityResults from "./pages/EligibilityResults"; // <-- Add this import

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/email-verify" element={<EmailVerify />} />
        <Route path="/eligibility-form" element={<EligibilityForm />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/hospitals" element={<HospitalFinder />} />
        <Route
          path="/eligibility-results"
          element={<EligibilityResults />}
        />{" "}
        {/* <-- Add this route */}
      </Routes>
    </div>
  );
};

export default App;
