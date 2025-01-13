const db = require('../config/database'); // MySQL pool from mysql2/promise
const bcrypt = require('bcryptjs');

module.exports = {
    // CREATE a new user
    createUser: async ({ name, email, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `
            INSERT INTO users (name, email, password, createdAt, updatedAt)
            VALUES (?, ?, ?, NOW(), NOW())
        `;
        const [result] = await db.execute(sql, [name, email, hashedPassword]);
        return result.insertId; // newly created user's ID
    },

    // READ user by ID
    getUserById: async (id) => {
        const sql = 'SELECT * FROM users WHERE id = ?';
        const [rows] = await db.execute(sql, [id]);
        return rows[0]; // single user or undefined
    },

    // READ user by email
    getUserByEmail: async (email) => {
        const sql = 'SELECT * FROM users WHERE email = ?';
        const [rows] = await db.execute(sql, [email]);
        return rows[0];
    },
}