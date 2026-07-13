const express = require("express");

const router = express.Router();

const gigController = require("../controllers/gigController");
const authMiddleware = require("../middleware/authMiddleware");
const { validateGig } = require("../validators/gigValidator");

// Get all gigs
router.get("/", gigController.getAllGigs);

// Get single gig
router.get("/:id", gigController.getGigById);

// Create new gig
router.post("/", authMiddleware, validateGig, gigController.createGig);

// Update gig
router.put("/:id", authMiddleware, validateGig, gigController.updateGig);

// Delete gig
router.delete("/:id", authMiddleware, gigController.deleteGig);

module.exports = router;
