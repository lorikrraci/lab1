const sequelize = require('./database');
const Product = require('../models/products'); // Import all models
const User = require('../models/user');
const Order = require('../models/order');

const syncDatabase = async () => {
    try {
        await sequelize.sync({ alter: true }); // Creates or updates tables based on models
        console.log('Database synchronized');
    } catch (error) {
        console.error('Error synchronizing database:', error);
    }
};

syncDatabase();
