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

// GET ALL PRODUCTS =>  /api/v1/products?keyword=apple
// ─────────────────────────────────────────────────────────────────────────────
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    // 1) If you want to do search/filter/pagination manually, you’ll have to build
    //    raw SQL queries. For now, we’ll just fetch all products:
    const products = await getAllProducts();

    // 2) Count how many we have
    const productCount = products.length;
    
    // 3) Optionally define a per-page (just as an example)
    const resPerPage = 4;

    // 4) Return your products
    res.status(200).json({
      success: true,
      message: "This route will show all products.",
      productCount,
      resPerPage,
      products
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

// GET SINGLE PRODUCT => /api/v1/products/:id
// ─────────────────────────────────────────────────────────────────────────────
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);

    if (!product) {
      return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      product
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});

// CREATE NEW PRODUCT => /api/v1/admin/products/new
// ─────────────────────────────────────────────────────────────────────────────
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    // Typically you’d track which user created the product:
    req.body.userId = req.user ? req.user.id : null;

    // Insert into DB and get the new product ID
    const newProductId = await createProduct(req.body);

    // Fetch the newly created product
    const newProduct = await getProductById(newProductId);

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Product creation failed',
      error: error.message
    });
  }
});
// UPDATE PRODUCT => /api/v1/admin/products/:id
// ─────────────────────────────────────────────────────────────────────────────
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;
    // Attempt to update
    const rowsAffected = await updateProduct(productId, req.body);

    if (rowsAffected === 0) {
      return next(new ErrorHandler('Product not found', 404));
    }

    // Fetch the updated record
    const updated = await getProductById(productId);

    res.status(200).json({
      success: true,
      product: updated
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});
// DELETE PRODUCT => /api/v1/admin/products/:id
// ─────────────────────────────────────────────────────────────────────────────
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const productId = req.params.id;

    // Attempt to delete
    const rowsAffected = await deleteProduct(productId);

    if (rowsAffected === 0) {
      return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
      success: true,
      message: 'Product is deleted.'
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: error.message
    });
  }
});