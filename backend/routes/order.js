const express = require('express');
const router = express.Router();

const { 
    newOrder, 
    getSingleOrder, 
    getOrders,     
    updateOrderStatus, 
    deleteOrder
} = require('../controllers/orderController');

