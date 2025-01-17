const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const bodyparser = require('body-parser');

const errorMiddleware = require('./middlewares/errors');
const cors = require('cors');

// Environment Variables
require('dotenv').config();

// Import all the routes
const products = require('./routes/product');
const order = require('./routes/order');

// Route Handling
app.use('/api/v1/products', products);
app.use('/api/v1/orders', order);

// Middleware to handle errors
app.use(errorMiddleware);
 
module.exports = app;