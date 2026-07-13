const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Strip the password hash before sending a user object to the client
const toSafeUser = (user) => {
    const { password, ...safeUser } = user;
    return safeUser;
};

const register = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists"
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            success: true,
            message: "Registration successful",
            user: toSafeUser(user)
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const login = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findByEmail(email);

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const match = await User.comparePassword(password, user.password);

        if (!match) {
            return res.status(400).json({
                success: false,
                message: "Invalid email or password"
            });
        }

        const token = jwt.sign(
            {
                id: user.id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: toSafeUser(user)
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    register,
    login
};
