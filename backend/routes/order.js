const express = require("express");
const router = express.Router();

const {
  newOrder,
  getSingleOrder,
  getOrders,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");
const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/me").get(isAuthenticatedUser, getOrders);
router
  .route("/order/:id")
  .get(isAuthenticatedUser, getSingleOrder)
  .put(isAuthenticatedUser, updateOrderStatus)
  .delete(isAuthenticatedUser, deleteOrder);

router
  .route("/admin/order")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getOrders);

module.exports = router;
