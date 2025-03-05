const express = require('express');
const router = express.Router();
const playerController = require('../controllers/playerController'); // Adjust path if needed

router.get('/player', playerController.getAllPlayers);

module.exports = router;