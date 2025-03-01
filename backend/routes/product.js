const express = require("express");
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { isAuthenticatedUser, authorizeRoles } = require("../middlewares/auth");

// Define your routes here
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

// Admin Routes
router
  .route("/admin/products/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router
  .route("/admin/products/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

// // Review Routes
// router.route('/reviews').put(isAuthenticatedUser, creatyeProductReview);
// router.route('/reviews')
//     .get(isAuthenticatedUser, getProductReviews)
//     .delete(isAuthenticatedUser, deleteReview);

module.exports = router;
