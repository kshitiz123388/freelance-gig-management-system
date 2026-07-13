// Register Validation
const validateRegister = (req, res, next) => {

    const { name, email, password } = req.body;

    // Name
    if (!name) {
        return res.status(400).json({
            success: false,
            message: "Name is required"
        });
    }

    // Email
    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    // Password
    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "Password must be at least 6 characters"
        });
    }

    next();

};

// Login Validation
const validateLogin = (req, res, next) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({
            success: false,
            message: "Email is required"
        });
    }

    if (!password) {
        return res.status(400).json({
            success: false,
            message: "Password is required"
        });
    }

    next();

};

module.exports = {
    validateRegister,
    validateLogin
};