const db = require('../config/database'); // a mysql2 Pool or Connection

module.exports = {
    // 1. Get all orders for a specific user
    getOrdersByUserId: async (userId) => {
      const sql = 'SELECT * FROM orders WHERE userId = ?';
      const [rows] = await db.execute(sql, [userId]);
      return rows; // array of order objects
    },
}  

  