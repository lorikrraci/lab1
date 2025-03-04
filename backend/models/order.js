const db = require("../config/database");

module.exports = {
  getOrdersByUserId: async (userId) => {
    const sql = "SELECT * FROM orders WHERE userId = ?";
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  },

  createOrder: async (orderData) => {
    const {
      userId,
      orderItems,
      shippingInfo,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = orderData;

    const paidAt = new Date();

    const sql = `
      INSERT INTO orders (
        userId, 
        orderItems, 
        shippingInfo,
        paymentInfo, 
        paidAt, 
        itemsPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        createdAt, 
        updatedAt
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `;

    const [result] = await db.execute(sql, [
      userId,
      JSON.stringify(orderItems),
      JSON.stringify(shippingInfo),
      JSON.stringify(paymentInfo),
      paidAt,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    ]);

    return result.insertId;
  },

  getOrdersByUserId: async (userId) => {
    const sql = "SELECT * FROM orders WHERE userId = ?";
    const [rows] = await db.execute(sql, [userId]);
    return rows;
  },

  getOrderByIdAndUserId: async (orderId, userId) => {
    const sql = `SELECT * FROM orders WHERE id = ? AND userId = ? LIMIT 1`;
    const [rows] = await db.execute(sql, [orderId, userId]);
    return rows[0];
  },

  updateOrderStatus: async (orderId, status, deliveredAt) => {
    const fields = ["orderStatus = ?"];
    const values = [status];

    if (deliveredAt) {
      fields.push("deliveredAt = ?");
      values.push(deliveredAt);
    }

    fields.push("updatedAt = NOW()");

    const sql = `
      UPDATE orders
      SET ${fields.join(", ")}
      WHERE id = ?
    `;
    values.push(orderId);

    const [result] = await db.execute(sql, values);
    return result.affectedRows;
  },

  deleteOrder: async (orderId) => {
    const sql = `DELETE FROM orders WHERE id = ?`;
    const [result] = await db.execute(sql, [orderId]);
    return result.affectedRows;
  },
};
