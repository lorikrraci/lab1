const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;

    if (process.env.NODE_ENV === 'DEVELOPMENT') {
        
        res.status(err.statusCode).json({
            success: false,
            error: err,
            errMesage: err.message,
            stack: err.stack
        });
    }

    if (process.env.NODE_ENV === 'PRODUCTION') {
        let error = { ...err };
        error.name = err.name;
        error.message = err.message;
        error.code = err.code;

        // Wrong Mongoose Object ID Error
        if (error.name === 'CastError') {
            const message = `Resource not found. Invalid: ${error.path}`;
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose Validation Error
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(value => value.message).join(', ');
            error = new ErrorHandler(message, 400);
        }

        // Handling Mongoose duplicate key errors
        if (error.code === 11000) {
            const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
            error = new ErrorHandler(message, 400);
        }

        // Handling wrong JWT error
        if (error.name === 'JsonWebTokenError') {
            const message = 'JSON Web Token is invalid. Try again!!!';
            error = new ErrorHandler(message, 400);
        }

        // Handling Expired JWT error
        if (error.name === 'TokenExpiredError') {
            const message = 'JSON Web Token is expired. Try again!!!';
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Internal Server Error'
        });
    }
};