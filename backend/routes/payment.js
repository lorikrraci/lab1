const express = require('express');
const router = express.Router();

const { 
    processPayment,
    sendStripeApi
} = require('../controllers/paymentController');
const { isAuthenticatedUser } = require('../middlewares/auth');

// router.route('/process').post(isAuthenticatedUser, processPayment);
router.post("/process", processPayment);
// router.route('/stripeapi').get(isAuthenticatedUser, sendStripeApi);


module.exports = router;

