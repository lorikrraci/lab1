const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} = require("../models/products");

// Merr të gjitha produktet
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  const keyword = req.query.keyword || "";
  const category = req.query.category || "";
  const priceRange = [req.query.price?.gte || 1, req.query.price?.lte || 5000];
  const rating = req.query.ratings?.gte || 0;
  const sortOption = req.query.sort || "id ASC";
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 6; // Allow limit to be overridden via query
  const fetchAll = req.query.all === "true"; // New parameter to fetch all products
  const offset = fetchAll ? 0 : (page - 1) * limit;

  const sortMap = {
    "price-asc": "price ASC",
    "price-desc": "price DESC",
    "name-asc": "name ASC",
    "most-relevant": "id ASC",
  };

  const sortValue = sortMap[sortOption] || "id ASC";

  const { products, totalProducts } = await getAllProducts(
    keyword,
    priceRange,
    category,
    rating,
    sortValue,
    fetchAll ? null : limit, // If fetchAll, no limit
    fetchAll ? null : offset // If fetchAll, no offset
  );

  res.status(200).json({
    success: true,
    products,
    totalProducts,
    totalPages: fetchAll ? 1 : Math.ceil(totalProducts / limit),
    resPerPage: fetchAll ? totalProducts : limit,
    currentPage: fetchAll ? 1 : page,
  });
});

// Merr një produkt sipas ID
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await getProductById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Krijo një produkt të ri
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  const {
    name,
    price,
    description,
    ratings,
    category,
    seller,
    stock,
    numOfReviews,
  } = req.body;

  const productId = await createProduct({
    name,
    price,
    description,
    ratings,
    category,
    seller,
    stock,
    numOfReviews,
  });

  const product = await getProductById(productId);

  res.status(201).json({
    success: true,
    product,
  });
});

// Përditëso një produkt
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;
  const updates = req.body;

  console.log("Updating product with ID:", productId);
  console.log("Updates:", updates);

  const rowsAffected = await updateProduct(productId, updates);

  if (rowsAffected === 0) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const updatedProduct = await getProductById(productId);

  res.status(200).json({
    success: true,
    product: updatedProduct,
  });
});

// Fshi një produkt
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const productId = req.params.id;

  console.log("Deleting product with ID:", productId);

  const rowsAffected = await deleteProduct(productId);

  if (rowsAffected === 0) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
