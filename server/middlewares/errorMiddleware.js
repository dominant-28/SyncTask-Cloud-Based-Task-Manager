const routeNotFound = (req, res, next) => {
    const error = new Error(`Route not Found: ${req.originalUrl}`);
    res.status(404);
    next(error);
};

const errorhandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === "CastError" && err.path === "_id") {
        statusCode = 404;
        message = "Resource not found";
    }

    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV !== "production" ? err.stack : null
    });
};

export { routeNotFound, errorhandler };
