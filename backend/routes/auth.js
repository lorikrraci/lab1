const express = require('express');
const router = express.Router();

const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile 
} = require('../controllers/authController'); // Ensure only one import for these