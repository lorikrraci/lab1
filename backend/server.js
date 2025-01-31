require('dotenv').config();

const app = require('./app');
const db = require('./config/database'); // MySQL pool from mysql2/promise
const dotenv = require('dotenv');


// Handle Uncaught Exceptions
process.on('uncaughtException', err => {
    console.error(`Uncaught Exception: ${err.message}`);
    console.error(err.stack);
    console.log('Shutting down due to uncaught exceptions.');
    process.exit(1);
});

// Setting up config file
dotenv.config({ path: 'backend/config/.env' });

// Start the server only after ensuring database connectivity
const startServer = async () => {
    try {
        // Test the database connection
        await db.getConnection();
        console.log('MySQL Database connected successfully.');

        const server = app.listen(process.env.PORT, () => {
            console.log(`Server is running on http://localhost:${process.env.PORT}`);
        });

        // Handle unhandled promise rejections
        process.on('unhandledRejection', err => {
            console.error(`Unhandled Rejection: ${err.message}`);
            console.error(err.stack);
            console.log('Shutting down the server due to unhandled promise rejection.');
            server.close(() => {
                process.exit(1);
            });
        });
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1);
    }
};

startServer();
