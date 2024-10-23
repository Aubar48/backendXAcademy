const express = require('express');
const playerController = require('../controllers/playerController.js');
const router = express.Router();

// Definir las rutas
router.get('/', playerController.getAllPlayers); // Obtener todos los jugadores
router.get('/:id', playerController.getPlayerById); // Obtener un jugador por ID
router.post('/', playerController.createPlayer); // Crear un nuevo jugador
router.put('/:id', playerController.updatePlayer); // Actualizar un jugador por ID
router.delete('/:id', playerController.deletePlayer); // Eliminar un jugador por ID

module.exports = router;
