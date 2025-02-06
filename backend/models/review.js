const db = require('../config/database'); // MySQL pool nga mysql2/promise

module.exports = {
    // Krijo një vlerësim të ri
    createReview: async ({ productId, userId, rating, comment }) => {
        const sql = `
            INSERT INTO reviews (productId, userId, rating, comment, reviewDate, createdAt, updatedAt)
            VALUES (?, ?, ?, ?, NOW(), NOW(), NOW())
        `;
        const [result] = await db.execute(sql, [productId, userId, rating, comment]);
        return result.insertId; // ID i vlerësimit të ri
    },

    // Merr të gjitha vlerësimet
    getAllReviews: async () => {
        console.log('Fetching all reviews...'); // Kontrollo nëse ky funksion po thirret
        const sql = 'SELECT * FROM reviews';
        const [rows] = await db.execute(sql);
        return rows;
    },

    // Përditëso një vlerësim
    updateReview: async (id, { rating, comment }) => {
        const fields = [];
        const values = [];

        if (rating !== undefined) {
            fields.push('rating = ?');
            values.push(rating);
        }
        if (comment !== undefined) {
            fields.push('comment = ?');
            values.push(comment);
        }

        // Përditëso gjithashtu datën e përditësimit
        fields.push('updatedAt = NOW()');

        const sql = `UPDATE reviews SET ${fields.join(', ')} WHERE id = ?`;
        values.push(id);

        const [result] = await db.execute(sql, values);
        return result.affectedRows; // Numri i rreshtave të përditësuar
    },

    // Fshi një vlerësim
    deleteReview: async (id) => {
        const sql = 'DELETE FROM reviews WHERE id = ?';
        const [result] = await db.execute(sql, [id]);
        return result.affectedRows; // Numri i rreshtave të fshirë
    },
};