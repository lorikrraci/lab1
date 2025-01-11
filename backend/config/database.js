const dotenv = require('dotenv');

const mysql = require('mysql2/promise');

// console.log(process.env)
dotenv.config({path : 'backend/config/.env'})
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,  // Should be empty if no password
    database: process.env.DB_NAME,
    port: process.env.DB_PORT || 3306,
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

module.exports = pool;