// server/middlewares/errorMiddleware.js

/**
 * @function notFound
 * @description Handles 404 errors for non-existent routes.
 */
export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the next error handler
};

/**
 * @function errorHandler
 * @description General error handler middleware.
 */
export const errorHandler = (err, req, res, next) => {
    // Sometimes the status code is set by Express, but sometimes it remains 200 on an error
    // We change 200 to 500 (Internal Server Error) otherwise use the existing status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        // Only show stack trace in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};