const express = require('express');
const app = express();

// Environment Variables
require('dotenv').config();

// Import all the routes
const products = require('./routes/product');

// Route Handling
app.use('/api/v1/products', products);

// Middleware to handle errors
app.use(errorMiddleware);
 
module.exports = app;