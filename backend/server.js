require('dotenv').config();

const app = require('./app');
const db = require('./config/database'); // MySQL pool from mysql2/promise
const dotenv = require('dotenv');