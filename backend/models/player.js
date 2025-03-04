const db = require("../config/database");

module.exports = {
  // 1. Create a new player
  createPlayer: async (playerData) => {
    const {
      first_name,
      last_name,
      position,
      jersey_number,
      image_url,
      height,
      weight,
      birth_date,
    } = playerData;

    const sql = `
      INSERT INTO players 
        (first_name, last_name, position, jerQQQsey_number, image_url, height, weight, birth_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await db.execute(sql, [
      first_name,
      last_name || null,
      position,
      jersey_number,
      image_url || null,
      height || null,
      weight || null,
      birth_date || null,
    ]);

    return result.insertId;
  },

  // 2. Get a player by ID
  getPlayerById: async (id) => {
    const sql = "SELECT * FROM players WHERE id = ?";
    const [rows] = await db.execute(sql, [id]);
    if (!rows[0]) return null;

    return rows[0];
  },

  // 3. Update a player
  updatePlayer: async (id, updates) => {
    const fields = [];
    const values = [];

    if (updates.first_name !== undefined) {
      fields.push("first_name = ?");
      values.push(updates.first_name);
    }
    if (updates.last_name !== undefined) {
      fields.push("last_name = ?");
      values.push(updates.last_name);
    }
    if (updates.position !== undefined) {
      fields.push("position = ?");
      values.push(updates.position);
    }
    if (updates.jersey_number !== undefined) {
      fields.push("jersey_number = ?");
      values.push(updates.jersey_number);
    }
    if (updates.image_url !== undefined) {
      fields.push("image_url = ?");
      values.push(updates.image_url);
    }
    if (updates.height !== undefined) {
      fields.push("height = ?");
      values.push(updates.height);
    }
    if (updates.weight !== undefined) {
      fields.push("weight = ?");
      values.push(updates.weight);
    }
    if (updates.birth_date !== undefined) {
      fields.push("birth_date = ?");
      values.push(updates.birth_date);
    }

    const sql = `UPDATE players SET ${fields.join(", ")} WHERE id = ?`;
    values.push(id);

    const [result] = await db.execute(sql, values);
    return result.affectedRows;
  },

  // 4. Delete a player
  deletePlayer: async (id) => {
    const sql = "DELETE FROM players WHERE id = ?";
    const [result] = await db.execute(sql, [id]);
    return result.affectedRows;
  },

  // 5. Get all players
  getAllPlayers: async (
    keyword = "",
    position = "",
    jerseyRange = [0, 99],
    sortOption = "id ASC",
    limit = 10,
    offset = 0
  ) => {
    let sql = "SELECT * FROM players WHERE 1=1";
    let countSql = "SELECT COUNT(*) as total FROM players WHERE 1=1";
    let values = [];
    let countValues = [];

    if (keyword) {
      sql += " AND (first_name LIKE ? OR last_name LIKE ?)";
      countSql += " AND (first_name LIKE ? OR last_name LIKE ?)";
      values.push(`%${keyword}%`, `%${keyword}%`);
      countValues.push(`%${keyword}%`, `%${keyword}%`);
    }

    if (position) {
      sql += " AND position = ?";
      countSql += " AND position = ?";
      values.push(position);
      countValues.push(position);
    }

    if (jerseyRange) {
      sql += " AND jersey_number BETWEEN ? AND ?";
      countSql += " AND jersey_number BETWEEN ? AND ?";
      values.push(jerseyRange[0], jerseyRange[1]);
      countValues.push(jerseyRange[0], jerseyRange[1]);
    }

    sql += ` ORDER BY ${sortOption}`;

    if (limit !== null && offset !== null) {
      sql += " LIMIT ? OFFSET ?";
      values.push(limit, offset);
    }

    const [rows] = await db.execute(sql, values);
    const [countRows] = await db.execute(countSql, countValues);
    const totalPlayers = countRows[0].total;

    return { players: rows, totalPlayers };
  },
};