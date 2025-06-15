import express from "express";
import {
  getNearbyHospitals,
  getHospitalById,
} from "../controllers/osmController.js";
// If you use authentication middleware, import them as well:
// import { authenticate } from "../middleware/authenticate.js";
// import { authorizeAdmin } from "../middleware/authorizeAdmin.js";

const router = express.Router();

// Public routes
router.post("/nearby", getNearbyHospitals);
router.get("/:id", getHospitalById);

export default router;
