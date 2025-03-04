const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const express = require("express");
const Stripe = require("stripe");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res, next) => {
  try {
    const { amount } = req.body;

    if (!amount || amount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: "usd",
      metadata: { integration_check: "accept_a_payment" },
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

//Process stripe payments => /api/v1/payment/process
//E kalunja
// exports.processPayment = async (req, res, next) => {
//     try {
//       const paymentIntent = await stripe.paymentIntents.create({
//         amount: req.body.amount,
//         currency: 'usd',
//         metadata: { integration_check: 'accept_a_payment' },
//       });

//       res.status(200).json({
//         success: true,
//         clientSecret: paymentIntent.client_secret,
//       });
//     } catch (error) {
//       console.error('Error creating payment intent:', error);
//       res.status(500).json({ success: false, message: 'Payment processing failed' });
//     }
//   };
//Send stripe API Key => /api/v1/stripeapi
// exports.sendStripeApi = catchAsyncErrors( async (req, res, next ) => {

//     res.status(200).json({
//         stripeApiKey: process.env.STRIPE_API_KEY
//     })
// })
