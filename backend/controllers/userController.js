const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const { createUser, getUserById, getAllUsers, updateUser, deleteUser, getUserByEmail } = require('../models/user');

// Merr të gjithë përdoruesit
exports.getUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await getAllUsers();
    console.log("Users fetched:", users); // Log për debug

    res.status(200).json({
        success: true,
        users,
    });
});

// Krijo një përdorues të ri
exports.createUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    // Kontrollo nëse emaili ekziston
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
        return next(new ErrorHandler('Email already exists', 400));
    }

    // Kontrollo nëse fjalëkalimi është i pranuar
    if (!password) {
        return next(new ErrorHandler('Password is required', 400));
    }

    // Krijo përdoruesin
    const userId = await createUser({ name, email, password, role });
    const user = await getUserById(userId);

    res.status(201).json({
        success: true,
        user,
    });
});

// Përditëso një përdorues
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;
    const updates = req.body;

    const rowsAffected = await updateUser(userId, updates);
    if (rowsAffected === 0) {
        return next(new ErrorHandler('User not found', 404));
    }

    const updatedUser = await getUserById(userId);
    res.status(200).json({
        success: true,
        user: updatedUser,
    });
});

// Fshi një përdorues
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.params.id;

    const rowsAffected = await deleteUser(userId);
    if (rowsAffected === 0) {
        return next(new ErrorHandler('User not found', 404));
    }

    res.status(200).json({
        success: true,
        message: 'User deleted successfully',
    });
});
