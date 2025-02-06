const express = require('express');
const { getReviews, createReview, updateReview, deleteReview } = require('../controllers/reviewController');
const router = express.Router();

// Ruterët për vlerësimet
router.route('/reviews')
    .get(getReviews)  // Merr të gjitha vlerësimet
    .post(createReview); // Krijo një vlerësim të ri

router.route('/reviews/:id')
    .put(updateReview) // Përditëso një vlerësim
    .delete(deleteReview); // Fshi një vlerësim

module.exports = router;