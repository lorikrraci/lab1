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

router.route('/order/new').post(isAuthenticatedUser, newOrder);

router.route('/order/me').get(isAuthenticatedUser, getOrders); // Adjust if it fetches orders by user
router.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);

router.route('/admin/order').get(isAuthenticatedUser, authorizeRoles('admin'), getOrders); // Adjust if needed
router.route('/admin/order/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateOrderStatus)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteOrder);
module.exports = router;

