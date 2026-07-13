const Gig = require("../models/Gig");

// Get All Gigs
const getAllGigs = (req, res) => {

    const gigs = Gig.getAll();

    res.status(200).json({
        success: true,
        data: gigs
    });

};

// Get Single Gig
const getGigById = (req, res) => {

    const gig = Gig.getById(req.params.id);

    if (!gig) {
        return res.status(404).json({
            success: false,
            message: "Gig not found"
        });
    }

    res.status(200).json({
        success: true,
        data: gig
    });

};

// Create Gig
const createGig = (req, res) => {

    const gig = Gig.create(req.body, req.user.id);

    res.status(201).json({
        success: true,
        message: "Gig created successfully",
        data: gig
    });

};

// Update Gig
const updateGig = (req, res) => {

    const gig = Gig.getById(req.params.id);

    if (!gig) {
        return res.status(404).json({
            success: false,
            message: "Gig not found"
        });
    }

    // Ownership check - only the gig's owner can update it
    if (gig.userId !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: "You are not allowed to update this gig"
        });
    }

    const updated = Gig.update(req.params.id, req.body);

    res.status(200).json({
        success: true,
        message: "Gig updated successfully",
        data: updated
    });

};

// Delete Gig
const deleteGig = (req, res) => {

    const gig = Gig.getById(req.params.id);

    if (!gig) {
        return res.status(404).json({
            success: false,
            message: "Gig not found"
        });
    }

    // Ownership check - only the gig's owner can delete it
    if (gig.userId !== req.user.id) {
        return res.status(403).json({
            success: false,
            message: "You are not allowed to delete this gig"
        });
    }

    Gig.delete(req.params.id);

    res.status(200).json({
        success: true,
        message: "Gig deleted successfully"
    });

};

module.exports = {
    getAllGigs,
    getGigById,
    createGig,
    updateGig,
    deleteGig
};
