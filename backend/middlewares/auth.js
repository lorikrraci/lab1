const jwt = require('jsonwebtoken');
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require('../models/user'); // Correctly pointing to the consolidated user model

// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return next(new ErrorHandler('Login first to access this resource.', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.getUserById(decoded.id);

        if (!user) {
            return next(new ErrorHandler('User not found.', 404));
        }

        req.user = user; // Attach user to request
        next();
    } catch (error) {
        return next(new ErrorHandler('Invalid Token. Please login again.', 401));
    }
});

// Handling user roles
exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new ErrorHandler(Role `(${req.user.role}) is not allowed to access this resource`, 403)
            );
        }
        next();
    }
};