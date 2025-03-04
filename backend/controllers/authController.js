const User = require("../models/user"); // Import the consolidated user model
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// function to generate and send JWT token
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
  });

  const { password, ...userData } = user;

  res.status(statusCode).json({
    success: true,
    user: userData,
    token,
  });
};

// 1. Register a new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return next(
      new ErrorHandler("Please provide name, email, and password", 400)
    );
  }

  // Check if user already exists
  const existingUser = await User.getUserByEmail(email);
  if (existingUser) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  // Create user in MySQL
  const newUserId = await User.createUser({ name, email, password });

  // Retrieve the newly created user
  const user = await User.getUserById(newUserId);

  // Send token and user data
  sendToken(user, 201, res);
});

// 2. Login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email & password
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // Find user by email
  const user = await User.getUserByEmail(email);
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Compare passwords
  const isPasswordMatched = await bcrypt.compare(password, user.password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Send token and user data
  sendToken(user, 200, res);
});

// 3. Logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// 4. Get user profile
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.getUserById(req.user.id);

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Remove password before sending
  const { password, ...userData } = user;

  res.status(200).json({
    success: true,
    user: userData,
  });
});

// 5. Update user profile
exports.updateUserProfile = catchAsyncErrors(async (req, res, next) => {
  const { name, email, oldPassword, newPassword } = req.body;

  // Fetch the current user
  const currentUser = await User.getUserById(req.user.id);
  if (!currentUser) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Validate old password if newPassword is provided
  if (newPassword) {
    if (!oldPassword) {
      return next(new ErrorHandler("Please provide your old password", 400));
    }
    const isPasswordMatched = await bcrypt.compare(
      oldPassword,
      currentUser.password
    );
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old password is incorrect", 401));
    }
  }

  // Check if email is being updated and if it's already taken
  if (email && email !== currentUser.email) {
    const existingUser = await User.getUserByEmailExcludingId(
      email,
      req.user.id
    );
    if (existingUser) {
      return next(
        new ErrorHandler("Email already in use by another account", 400)
      );
    }
  }

  // Prepare updates
  const updates = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (newPassword) updates.password = newPassword;

  // Update user in MySQL if there are changes
  if (Object.keys(updates).length === 0) {
    return next(new ErrorHandler("No changes provided", 400));
  }

  const affectedRows = await User.updateUser(req.user.id, updates);
  if (affectedRows === 0) {
    return next(new ErrorHandler("No changes made or user not found", 400));
  }

  // Retrieve updated user
  const updatedUser = await User.getUserById(req.user.id);
  const { password: pwd, ...userData } = updatedUser;

  res.status(200).json({
    success: true,
    user: userData,
  });
});

// 6. Get all users (Admin only)
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied. Admins only.", 403));
  }

  const users = await User.getAllUsers();
  // Remove passwords from response
  const sanitizedUsers = users.map(({ password, ...userData }) => userData);

  res.status(200).json({
    success: true,
    users: sanitizedUsers,
  });
});

// 7. Update user by admin (Admin only)
exports.updateUserByAdmin = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied. Admins only.", 403));
  }

  const { id } = req.params;
  const { name, email, password, role } = req.body;

  // Check if email is being updated and if it's already taken
  if (email) {
    const existingUser = await User.getUserByEmailExcludingId(email, id);
    if (existingUser) {
      return next(new ErrorHandler("Email already in use", 400));
    }
  }

  const updates = {};
  if (name) updates.name = name;
  if (email) updates.email = email;
  if (password) updates.password = password;
  if (role) updates.role = role;

  const affectedRows = await User.updateUser(id, updates);
  if (affectedRows === 0) {
    return next(new ErrorHandler("User not found", 404));
  }

  const updatedUser = await User.getUserById(id);
  const { password: pwd, ...userData } = updatedUser;

  res.status(200).json({
    success: true,
    user: userData,
  });
});

// 8. Delete user (Admin only)
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(new ErrorHandler("Access denied. Admins only.", 403));
  }

  const { id } = req.params;
  const affectedRows = await User.deleteUser(id);

  if (affectedRows === 0) {
    return next(new ErrorHandler("User not found", 404));
  }

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
