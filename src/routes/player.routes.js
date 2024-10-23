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

// Ruta para descargar los jugadores en formato CSV
router.get('/download/csv', playerController.downloadPlayersCSV);
// Ruta para convertir CSV a Excel
router.get('/convert/csv-to-excel', playerController.convertCsvToExcel);

module.exports = router;
