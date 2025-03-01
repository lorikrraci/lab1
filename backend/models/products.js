const db = require("../config/database");

module.exports = {
  // 1. Krijo një produkt
  createProduct: async (productData) => {
    const {
      name,
      price,
      description,
      ratings,
      category,
      seller,
      stock,
      numOfReviews,
    } = productData;

    const sql = `
            INSERT INTO products 
                (name, price, description, ratings, category, seller, stock, numOfReviews, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
        `;

    const [result] = await db.execute(sql, [
      name,
      price,
      description,
      ratings,
      category,
      seller,
      stock,
      numOfReviews,
    ]);

    return result.insertId; // Kthen ID-në e produktit të sapokrijuar
  },

  // 2. Merr një produkt sipas ID
  getProductById: async (id) => {
    const sql = "SELECT * FROM products WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    if (!rows[0]) return null;

    return rows[0]; // Kthen një objekt produkti
  },

  // 3. Përditëso një produkt
  updateProduct: async (id, updates) => {
    const fields = [];
    const values = [];

    if (updates.name !== undefined) {
      fields.push("name = ?");
      values.push(updates.name);
    }
    if (updates.price !== undefined) {
      fields.push("price = ?");
      values.push(updates.price);
    }
    if (updates.description !== undefined) {
      fields.push("description = ?");
      values.push(updates.description);
    }
    if (updates.ratings !== undefined) {
      fields.push("ratings = ?");
      values.push(updates.ratings);
    }
    if (updates.category !== undefined) {
      fields.push("category = ?");
      values.push(updates.category);
    }
    if (updates.seller !== undefined) {
      fields.push("seller = ?");
      values.push(updates.seller);
    }
    if (updates.stock !== undefined) {
      fields.push("stock = ?");
      values.push(updates.stock);
    }
    if (updates.numOfReviews !== undefined) {
      fields.push("numOfReviews = ?");
      values.push(updates.numOfReviews);
    }

    fields.push("updatedAt = NOW()");

    const sql = `UPDATE products SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    console.log("Executing SQL:", sql);
    console.log("With values:", values);

    const [result] = await db.execute(sql, values);
    return result.affectedRows; // Kthen numrin e rreshtave të ndikuar
  },

  // 4. Fshi një produkt
  deleteProduct: async (id) => {
    const sql = "DELETE FROM products WHERE id = ?";
    console.log("Executing SQL:", sql);
    console.log("With ID:", id);

    const [result] = await db.execute(sql, [id]);
    return result.affectedRows; // Kthen numrin e rreshtave të ndikuar
  },

  // 5. Merr të gjitha produktet me filtrim dhe sortim
  getAllProducts: async (
    keyword = "",
    priceRange = [1, 5000],
    category = "",
    rating = 0,
    sortOption = "id ASC",
    limit = 10,
    offset = 0
  ) => {
    let sql = "SELECT * FROM products WHERE 1=1";
    let countSql = "SELECT COUNT(*) as total FROM products WHERE 1=1";
    let values = [];
    let countValues = [];

    // Apply filters to both queries
    if (keyword) {
      sql += " AND name LIKE ?";
      countSql += " AND name LIKE ?";
      values.push(`%${keyword}%`);
      countValues.push(`%${keyword}%`);
    }

    if (category) {
      sql += " AND category = ?";
      countSql += " AND category = ?";
      values.push(category);
      countValues.push(category);
    }

    if (rating > 0) {
      // Only apply if rating is positive
      sql += " AND ratings >= ?";
      countSql += " AND ratings >= ?";
      values.push(rating);
      countValues.push(rating);
    }

    if (priceRange) {
      sql += " AND price BETWEEN ? AND ?";
      countSql += " AND price BETWEEN ? AND ?";
      values.push(priceRange[0], priceRange[1]);
      countValues.push(priceRange[0], priceRange[1]);
    }

    // Sorting for main query only
    sql += ` ORDER BY ${sortOption}`;

    // Apply LIMIT and OFFSET only if they are not null
    if (limit !== null && offset !== null) {
      sql += " LIMIT ? OFFSET ?";
      values.push(limit, offset);
    }

    console.log("Executing SQL:", sql);
    console.log("With values:", values);

    const [rows] = await db.execute(sql, values);
    const [countRows] = await db.execute(countSql, countValues);
    const totalProducts = countRows[0].total;

    console.log("Fetched products:", rows);
    console.log("Total products:", totalProducts);

    return { products: rows, totalProducts };
  },
};
