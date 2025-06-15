import express from "express";
import {
  getAllSchemes,
  getSchemeById,
  getEligibleSchemes, // <-- Add this import
} from "../controllers/schemeController.js";
const router = express.Router();

router.get("/", getAllSchemes);
router.get("/:id", getSchemeById);
router.post("/eligible", getEligibleSchemes);

export default router;
