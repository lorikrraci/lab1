const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController");

router.get("/players", playerController.getAllPlayers); // GET all players
router.get("/players/:id", playerController.getPlayerById); // GET player by ID
router.post("/players", playerController.createPlayer); // POST create player
router.put("/players/:id", playerController.updatePlayer); // PUT update player
router.delete("/players/:id", playerController.deletePlayer); // DELETE player

module.exports = router;
