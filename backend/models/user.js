const db = require("../config/database"); // MySQL pool from mysql2/promise
const bcrypt = require("bcryptjs");

module.exports = {
  // CREATE a new user
  createUser: async ({ name, email, password, role = "user" }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `
            INSERT INTO users (name, email, password, role, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, NOW(), NOW())
        `;
    const [result] = await db.execute(sql, [name, email, hashedPassword, role]);
    return result.insertId;
  },

  // READ user by ID
  getUserById: async (id) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    return rows[0];
  },

  // READ user by email
  getUserByEmail: async (email) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);
    return rows[0];
  },

  // READ user by email excluding a specific ID
  getUserByEmailExcludingId: async (email, excludeId) => {
    const sql = "SELECT * FROM users WHERE email = ? AND id != ?";
    const [rows] = await db.execute(sql, [email, excludeId]);
    return rows[0]; // Returns the user if found, or undefined if no match
  },

  // READ all users
  getAllUsers: async () => {
    const sql = "SELECT * FROM users";
    const [rows] = await db.execute(sql);
    return rows;
  },

  // UPDATE user
  updateUser: async (id, { name, email, password, role }) => {
    const fields = [];
    const values = [];

    if (name !== undefined) {
      fields.push("name = ?");
      values.push(name);
    }
    if (email !== undefined) {
      fields.push("email = ?");
      values.push(email);
    }
    if (password !== undefined) {
      const hashedPassword = await bcrypt.hash(password, 10);
      fields.push("password = ?");
      values.push(hashedPassword);
    }
    if (role !== undefined) {
      fields.push("role = ?");
      values.push(role);
    }

    fields.push("updatedAt = NOW()");

    const sql = `UPDATE users SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    return result.affectedRows;
  },

  // DELETE user
  deleteUser: async (id) => {
    const sql = "DELETE FROM users WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
  },
};
