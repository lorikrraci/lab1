const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile 
} = require('../controllers/authController'); // Ensure only one import for these

const { isAuthenticatedUser } = require('../middlewares/auth'); // Authentication middleware

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/me').get(isAuthenticatedUser, getUserProfile);
router.route('/me/update').put(isAuthenticatedUser, updateUserProfile);

module.exports = router;

controllers/authController.js
const User = require('../models/user'); // Import the consolidated user model
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Helper function to generate and send JWT token
const sendToken = (user, statusCode, res) => {
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });

    // Optionally, set token in a cookie
    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
        ),
    });

    // Remove password from the user object before sending the response
    const { password, ...userData } = user;

    res.status(statusCode).json({
        success: true,
        user: userData,
        token,
    });
};

// 1. Register a new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.getUserByEmail(email);
    if (existingUser) {
        return next(new ErrorHandler('Email already exists', 400));
    }

    // Create user in MySQL
    const newUserId = await User.createUser({ name, email, password });

    // Retrieve the newly created user
    const user = await User.getUserById(newUserId);

    // Send token and user data
    sendToken(user, 201, res);
});
