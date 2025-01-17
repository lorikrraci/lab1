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
// Admin Routes
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);