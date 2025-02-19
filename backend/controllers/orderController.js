const orderModel = require('../models/order'); // <-- Raw MySQL queries
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');

// 1. Merr të gjitha porositë => /api/v1/orders
exports.getOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.getOrdersByUserId(req.user.id);

  res.status(200).json({
    success: true,
    orders,
  });
});

// 2. Krijo një porosi të re => /api/v1/order/new
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
    shippingInfo, // Mund ta ruani shippingInfo si JSON nëse shtoni një kolonë
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  });

  // Opsionale: Merr porosinë e sapokrijuar për ta kthyer
  const order = await orderModel.getOrderByIdAndUserId(orderId, req.user.id);

  res.status(201).json({
    success: true,
    order,
  });
});

// 3. Merr një porosi të vetme => /api/v1/order/:id
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

// 4. Përditëso statusin e porosisë => /api/v1/order/:id/status
exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  // Nëse dëshironi të përditësoni si admin, mund ta anashkaloni kontrollin e përdoruesit
  const existingOrder = await orderModel.getOrderById(req.params.id);
  if (!existingOrder) {
    return next(new ErrorHandler('Order not found', 404));
  }

  await orderModel.updateOrderStatus(req.params.id, req.body.status);

  res.status(200).json({
    success: true,
  });
});

// 5. Fshi një porosi => /api/v1/order/:id
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