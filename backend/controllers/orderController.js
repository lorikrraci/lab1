const orderModel = require('../models/order'); // <-- Raw MySQL queries
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// 1. Get all orders => /api/v1/orders
exports.getOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.getOrdersByUserId(req.user.id);

  res.status(200).json({
    success: true,
    orders,
  });
});

// 2. Create new order => /api/v1/order/new
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  } = req.body;

  const orderId = await orderModel.createOrder({
    userId: req.user.id,
    orderItems,
    shippingInfo, // You may store shippingInfo as JSON if you add a column
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  // Optionally fetch the newly created order to return
  const order = await orderModel.getOrderByIdAndUserId(orderId, req.user.id);

  res.status(201).json({
    success: true,
    order,
  });
});

// 3. Get single order => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.getOrderByIdAndUserId(req.params.id, req.user.id);

  if (!order) {
    return next(new ErrorHandler('Order not found', 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// 4. Update order status => /api/v1/order/:id/status
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  // In case you want Admin-level update, you might skip user check
  const existingOrder = await orderModel.getOrderById(req.params.id);
  if (!existingOrder) {
    return next(new ErrorHandler('Order not found', 404));
  }

  await orderModel.updateOrderStatus(req.params.id, req.body.status);

  res.status(200).json({
    success: true,
  });
});

// 5. Delete order => /api/v1/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const existingOrder = await orderModel.getOrderById(req.params.id);

  if (!existingOrder) {
    return next(new ErrorHandler('Order not found', 404));
  }

  await orderModel.deleteOrder(req.params.id);

  res.status(200).json({
    success: true,
  });
});


