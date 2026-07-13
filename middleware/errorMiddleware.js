const errorMiddleware = (err, req, res, next) => {

    console.log("Error :", err.message);

    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong"
    });

};

module.exports = errorMiddleware;