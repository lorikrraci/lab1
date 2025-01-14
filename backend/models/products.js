const db = require('../config/database'); 

module.exports = {
    // 1. Create a product
    createProduct: async (productData) => {
      const {
        name,
        price,
        description,
        ratings,
        images,
        category,
        seller,
        stock,
        numOfReviews,
        reviews,
        userId,
      } = productData;
  
      const sql = `
        INSERT INTO products 
          (name, price, description, ratings, images, category, seller, stock, 
           numOfReviews, reviews, userId, createdAt, updatedAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
  
      const [result] = await db.execute(sql, [
        name,
        price,
        description,
        ratings,
        JSON.stringify(images),    // Convert images array to string
        category,
        seller,
        stock,
        numOfReviews,
        JSON.stringify(reviews),   // Convert reviews array to string
        userId
      ]);
  
      return result.insertId; // The newly created product's ID
    },
}