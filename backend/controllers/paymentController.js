const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const express = require("express");
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    try {
      const { amount } = req.body;
  
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: "usd",
        metadata: { integration_check: "accept_a_payment" },
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Payment processing failed" });
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
