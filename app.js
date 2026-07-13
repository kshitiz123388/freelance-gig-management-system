const express = require("express");
const path = require("path");

const loggerMiddleware = require("./middleware/loggerMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");


const authRoutes = require("./routes/authRoutes");
const gigRoutes = require("./routes/gigRoutes");

const app = express();

const PORT = process.env.PORT || 3000;

// Read JSON data
app.use(express.json());

// Read form data
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use(loggerMiddleware);

// Public folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/gigs", gigRoutes);

// Home Page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// 404 Error
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    });
});

// Error Middleware
app.use(errorMiddleware);

// Start Server
app.listen(PORT, () => {
    console.log("==================================");
    console.log(`Server is running on Port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log("==================================");
});
