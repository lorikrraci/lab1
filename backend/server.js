require('dotenv').config();

const app = require('./app');
const db = require('./config/database'); 
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

startServer();