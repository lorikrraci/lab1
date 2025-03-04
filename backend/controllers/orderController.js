const orderModel = require("../models/order"); // <-- Raw MySQL queries
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");

exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  console.log("Order data received:", req.body);

  try {
    const orderId = await orderModel.createOrder({
      userId: req.user.id,
      orderItems,
      shippingInfo,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const order = await orderModel.getOrderByIdAndUserId(orderId, req.user.id);

    res.status(201).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return next(
      new ErrorHandler(`Failed to create order: ${error.message}`, 500)
    );
  }
});

exports.getOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await orderModel.getOrdersByUserId(req.user.id);

  res.status(200).json({
    success: true,
    orders,
  });
});

exports.updateOrderStatus = catchAsyncErrors(async (req, res, next) => {
  const { status, deliveredAt } = req.body;

  const existingOrder = await orderModel.getOrderByIdAndUserId(
    req.params.id,
    req.user.id
  );
  if (!existingOrder) {
    return next(
      new ErrorHandler("Order not found or you do not have permission", 404)
    );
  }

  await orderModel.updateOrderStatus(req.params.id, status, deliveredAt);

  const updatedOrder = await orderModel.getOrderByIdAndUserId(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    order: updatedOrder,
  });
});

exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const existingOrder = await orderModel.getOrderByIdAndUserId(
    req.params.id,
    req.user.id
  );
  if (!existingOrder) {
    return next(
      new ErrorHandler("Order not found or you do not have permission", 404)
    );
  }

  await orderModel.deleteOrder(req.params.id);

  res.status(200).json({
    success: true,
  });
});

// 3. Merr një porosi të vetme => /api/v1/order/:id
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await orderModel.getOrderByIdAndUserId(
    req.params.id,
    req.user.id
  );

  if (!order) {
    return next(new ErrorHandler("Order not found", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});
