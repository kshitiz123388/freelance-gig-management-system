const loggerMiddleware = (req, res, next) => {

    console.log("---------------");
    console.log("Method :", req.method);
    console.log("URL    :", req.url);
    console.log("Time   :", new Date().toLocaleString());
    console.log("---------------");

    next();

};

module.exports = loggerMiddleware;