const express = require("express");
const router = express.Router();
const doctorController = require("../controllers/doctorController");

// Get all doctors
router.get("/", doctorController.getAllDoctors);

// Get available time slots for a doctor on a specific date
router.get("/:id/slots", doctorController.getAvailableSlots);

module.exports = router;
