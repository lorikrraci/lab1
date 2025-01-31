const db = require('../config/database'); 
// 'db' should be a MySQL connection or pool created via mysql2/promise

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

  // 2. Get product by ID
  getProductById: async (id) => {
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await db.execute(sql, [id]);
    if (!rows[0]) return null;

    // Parse JSON columns if needed
    rows[0].images = JSON.parse(rows[0].images);
    if (rows[0].reviews) {
      rows[0].reviews = JSON.parse(rows[0].reviews);
    }

    return rows[0];
  },

  // 3. Update product
  updateProduct: async (id, updates) => {
    // Dynamically build SET clause
    const fields = [];
    const values = [];

    if (updates.name !== undefined) {
      fields.push('name = ?');
      values.push(updates.name);
    }
    if (updates.price !== undefined) {
      fields.push('price = ?');
      values.push(updates.price);
    }
    if (updates.description !== undefined) {
      fields.push('description = ?');
      values.push(updates.description);
    }
    if (updates.ratings !== undefined) {
      fields.push('ratings = ?');
      values.push(updates.ratings);
    }
    if (updates.images !== undefined) {
      fields.push('images = ?');
      values.push(JSON.stringify(updates.images));
    }
    if (updates.category !== undefined) {
      fields.push('category = ?');
      values.push(updates.category);
    }
    if (updates.seller !== undefined) {
      fields.push('seller = ?');
      values.push(updates.seller);
    }
    if (updates.stock !== undefined) {
      fields.push('stock = ?');
      values.push(updates.stock);
    }
    if (updates.numOfReviews !== undefined) {
      fields.push('numOfReviews = ?');
      values.push(updates.numOfReviews);
    }
    if (updates.reviews !== undefined) {
      fields.push('reviews = ?');
      values.push(JSON.stringify(updates.reviews));
    }
    // if (updates.userId !== undefined) {
    //   fields.push('userId = ?');
    //   values.push(updates.userId);
    // }
    
    // Always update updatedAt
    fields.push('updatedAt = NOW()');

    const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    return result.affectedRows;
  },
  // 4. Delete product
  deleteProduct: async (id) => {
    const sql = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
  },

  // 5. List or search products
  //   For example, to get all products or search by name
  // 5. List or search products
getAllProducts: async (keyword = '', priceRange = [1, 5000], category = '', rating = 0) => {
  let sql = 'SELECT * FROM products WHERE 1';
  let values = [];

  if (keyword) {
      sql += ' AND name LIKE ?';
      values.push(`%${keyword}%`);
  }

  if (category) {
      sql += ' AND category = ?';
      values.push(category);
  }

  if (rating) {
      sql += ' AND ratings >= ?';
      values.push(rating);
  }

  if (priceRange) {
      sql += ' AND price BETWEEN ? AND ?';
      values.push(priceRange[0], priceRange[1]);
  }

  const [rows] = await db.execute(sql, values);

  // Parse JSON columns
  rows.forEach((item) => {
      item.images = JSON.parse(item.images || '[]');
      if (item.reviews) {
          item.reviews = JSON.parse(item.reviews);
      }
  });

  return rows;
}

};