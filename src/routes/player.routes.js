// src/routes/playerRoutes.js
const express = require('express');
const playerController = require('../controllers/playerController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Aplicar autenticación a todas las rutas de jugadores
router.use(authenticate);

router.get('/', playerController.getAllPlayers);
router.get('/:id', playerController.getPlayerById);
router.post('/', playerController.createPlayer);
router.put('/:id', playerController.updatePlayer);
router.delete('/:id', playerController.deletePlayer);

module.exports = router;
