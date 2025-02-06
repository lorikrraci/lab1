const { createReview, getAllReviews, updateReview, deleteReview } = require('../models/review');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// Merr të gjitha vlerësimet
exports.getReviews = catchAsyncErrors(async (req, res, next) => {
    console.log('Fetching reviews...'); // Kontrollo nëse kërkesa po arrin në server
    const reviews = await getAllReviews();
    res.status(200).json({
        success: true,
        reviews,
    });
});

// Krijo një vlerësim të ri
exports.createReview = catchAsyncErrors(async (req, res, next) => {
    const { productId, userId, rating, comment } = req.body;

    if (!rating || !comment) {
        return next(new ErrorHandler('Rating and comment are required', 400));
    }

    const reviewId = await createReview({ productId, userId, rating, comment });
    const review = await getAllReviews(reviewId);

    res.status(201).json({
        success: true,
        review,
    });
});

// Përditëso një vlerësim
exports.updateReview = catchAsyncErrors(async (req, res, next) => {
    const reviewId = req.params.id;
    const updates = req.body;

    const rowsAffected = await updateReview(reviewId, updates);
    if (rowsAffected === 0) {
        return next(new ErrorHandler('Review not found', 404));
    }

    const updatedReview = await getAllReviews(reviewId);
    res.status(200).json({
        success: true,
        review: updatedReview,
    });
});

// Fshi një vlerësim
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const reviewId = req.params.id;

    const rowsAffected = await deleteReview(reviewId);
    if (rowsAffected === 0) {
        return next(new ErrorHandler('Review not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'Review deleted successfully',
    });
});