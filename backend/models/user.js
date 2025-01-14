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

    // UPDATE user
    updateUser: async (id, { name, email, password }) => {
        const fields = [];
        const values = [];

        if (name !== undefined) {
            fields.push('name = ?');
            values.push(name);
        }
        if (email !== undefined) {
            fields.push('email = ?');
            values.push(email);
        }
        if (password !== undefined) {
            const hashedPassword = await bcrypt.hash(password, 10);
            fields.push('password = ?');
            values.push(hashedPassword);
        }

        // Always update updatedAt
        fields.push('updatedAt = NOW()');

        const sql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);

        const [result] = await db.execute(sql, values);
        return result.affectedRows; // number of updated rows
    },

    // DELETE user
    deleteUser: async (id) => {
        const sql = 'DELETE FROM users WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows; // number of rows deleted
    },

    // Check if an email is already taken excluding a specific user ID
    getUserByEmailExcludingId: async (email, excludeId) => {
        const sql = `SELECT * FROM users WHERE email = ? AND id <> ?`;
        const [rows] = await db.execute(sql, [email, excludeId]);
        return rows[0];
    },
};