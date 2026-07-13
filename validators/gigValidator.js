const validateGig = (req, res, next) => {

    const { title, clientName, budget, status } = req.body;

    // Check Title
    if (!title) {
        return res.status(400).json({
            success: false,
            message: "Title is required"
        });
    }

    // Check Client Name
    if (!clientName) {
        return res.status(400).json({
            success: false,
            message: "Client name is required"
        });
    }

    // Check Budget (must be a real, positive number)
    const numericBudget = Number(budget);

    if (budget === undefined || budget === null || budget === "" || Number.isNaN(numericBudget) || numericBudget <= 0) {
        return res.status(400).json({
            success: false,
            message: "Enter valid budget"
        });
    }

    // Check Status
    if (!status) {
        return res.status(400).json({
            success: false,
            message: "Status is required"
        });
    }

    const statusList = [
        "Available",
        "In Progress",
        "Completed"
    ];

    if (!statusList.includes(status)) {
        return res.status(400).json({
            success: false,
            message: "Invalid Status"
        });
    }

    next();

};

module.exports = {
    validateGig
};