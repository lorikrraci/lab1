const express = require('express');
const router = express.Router();

const { 
    getProducts
} = require('../controllers/productController');

module.exports = router;
const { 
    getProducts, // Renamed from getProducts
    createProduct,  // Renamed from newProduct
    getProductById, // Renamed from getSingleProduct
    updateProduct,
    deleteProduct,
    // Add review-related controllers if they exist
} = require('../controllers/productController'); // Ensure this path is correct
// Define your routes here
router.route('/').get(getProducts); 
router.route('/:id').get(getProductById);
// Admin Routes
router.route('/admin/products/new').post(isAuthenticatedUser, authorizeRoles('admin'), createProduct);
router.route('/admin/products/:id')
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteProduct);