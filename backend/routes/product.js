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