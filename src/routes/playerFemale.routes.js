// src/routes/playerRoutes.js
const express = require('express');
const playerController = require('../controllers/playerFemaleController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

// Aplicar autenticación a todas las rutas de jugadores
router.get('/', authenticate, playerController.getAllPlayers);
router.get('/:id', authenticate, playerController.getPlayerById);
router.post('/', authenticate, playerController.createPlayer);
router.put('/:id', authenticate, playerController.updatePlayer);
router.delete('/:id', authenticate, playerController.deletePlayer);
router.get('/search',authenticate, playerController.searchPlayers);

// Ruta para descargar los jugadores en formato CSV
router.get('/download/csv', authenticate, playerController.downloadPlayersCSV);
// Ruta para convertir CSV a Excel
router.get('/convert/csv-to-excel', authenticate, playerController.convertCsvToExcel);





module.exports = router;
