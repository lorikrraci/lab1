const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');

const errorMiddleware = require('./middlewares/errors');
const cors = require('cors');

// Environment Variables
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({ extended: true }));

// Configure CORS
const corsOptions = {
    origin: 'http://localhost:3000', // Restrict to your frontend domain
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

// Use CORS middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight requests

// Middleware for custom headers (if needed)
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Credentials', 'true'); // Enable cookies and authorization headers
    next();
});

// Import all the routes
const products = require('./routes/product');
const auth = require('./routes/auth');
const payment = require('./routes/payment');
const order = require('./routes/order');

// Route Handling
app.use('/api/v1/products', products); // Products routes
app.use('/api/v1/auth', auth);         // Authentication routes
app.use('/api/v1/payment', payment);         // Authentication routes
app.use('/api/v1/orders', order);      // Orders routes

// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app;