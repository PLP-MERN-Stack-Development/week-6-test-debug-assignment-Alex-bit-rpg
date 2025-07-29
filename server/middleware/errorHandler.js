const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the stack trace to the console

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // Use existing status code or 500
    res.status(statusCode);

    res.json({
        message: err.message,
        // Only include stack trace in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
};

module.exports = { errorHandler };