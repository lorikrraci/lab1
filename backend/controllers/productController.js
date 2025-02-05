const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { createProduct, getProductById, updateProduct, deleteProduct, getAllProducts } = require('../models/products');

// Merr të gjitha produktet
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const keyword = req.query.keyword || '';
    const category = req.query.category || '';
    const priceRange = [req.query.price?.[0] || 1, req.query.price?.[1] || 5000];
    const rating = req.query.ratings || 0;
    const sortOption = req.query.sort || 'id ASC';

    const products = await getAllProducts(keyword, priceRange, category, rating, sortOption);

    res.status(200).json({
        success: true,
        products,
    });
});

// Merr një produkt sipas ID
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
    const product = await getProductById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});

// Krijo një produkt të ri
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
    const { name, price, description, ratings, category, seller, stock, numOfReviews } = req.body;

    const productId = await createProduct({
        name,
        price,
        description,
        ratings,
        category,
        seller,
        stock,
        numOfReviews,
    });

    const product = await getProductById(productId);

    res.status(201).json({
        success: true,
        product,
    });
});

// Përditëso një produkt
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;
    const updates = req.body;

    const rowsAffected = await updateProduct(productId, updates);

    if (rowsAffected === 0) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const updatedProduct = await getProductById(productId);

    res.status(200).json({
        success: true,
        product: updatedProduct,
    });
});

// Fshi një produkt
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const productId = req.params.id;

    const rowsAffected = await deleteProduct(productId);

    if (rowsAffected === 0) {
        return next(new ErrorHandler('Product not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
    });
});