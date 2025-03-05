const playerModel = require("../models/player");

exports.getAllPlayers = async (req, res) => {
  try {
    const { keyword, position, jerseyRange, sortOption, limit, offset } =
      req.query;
    const parsedJerseyRange = jerseyRange ? JSON.parse(jerseyRange) : [0, 99];
    const result = await playerModel.getAllPlayers(
      keyword || "",
      position || "",
      parsedJerseyRange,
      sortOption || "id ASC",
      limit ? parseInt(limit) : 10,
      offset ? parseInt(offset) : 0
    );
    res.json({
      success: true,
      players: result.players,
      totalPlayers: result.totalPlayers,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching players" });
  }
};

exports.getPlayerById = async (req, res) => {
  try {
    const player = await playerModel.getPlayerById(req.params.id);
    if (!player)
      return res
        .status(404)
        .json({ success: false, error: "Player not found" });
    res.json({ success: true, player });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching player" });
  }
};

exports.createPlayer = async (req, res) => {
  try {
    const playerId = await playerModel.createPlayer(req.body);
    const newPlayer = await playerModel.getPlayerById(playerId);
    res.json({
      success: true,
      player: newPlayer,
      message: "Player created successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error creating player" });
  }
};

exports.updatePlayer = async (req, res) => {
  try {
    const affectedRows = await playerModel.updatePlayer(
      req.params.id,
      req.body
    );
    if (affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, error: "Player not found" });
    const updatedPlayer = await playerModel.getPlayerById(req.params.id);
    res.json({
      success: true,
      player: updatedPlayer,
      message: "Player updated successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error updating player" });
  }
};

exports.deletePlayer = async (req, res) => {
  try {
    const affectedRows = await playerModel.deletePlayer(req.params.id);
    if (affectedRows === 0)
      return res
        .status(404)
        .json({ success: false, error: "Player not found" });
    res.json({ success: true, message: "Player deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error deleting player" });
  }
};
