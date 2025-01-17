const express = require('express');
const router = express.Router();

const { 
    newOrder, 
    getSingleOrder, 
    getOrders,     
    updateOrderStatus, 
    deleteOrder
} = require('../controllers/orderController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');

// Define your routes here
router.route('/').get(getProducts); 
router.route('/:id').get(getProductById);

module.exports = router;