const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Import raw-MySQL-based model functions
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts
} = require('../models/products');