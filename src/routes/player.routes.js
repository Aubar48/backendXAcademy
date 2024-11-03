// src/routes/playerRoutes.js
const express = require('express');
const playerController = require('../controllers/playerController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Players
 *   description: Rutas para manejar jugadores
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: Obtener todos los jugadores
 *     tags: [Players]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Lista de jugadores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 123456
 *                   name:
 *                     type: string
 *                     example: Juan Pérez
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error en el servidor.
 */

/**
 * @swagger
 * /players/{id}:
 *   get:
 *     summary: Obtener un jugador por ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugador obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: 123456
 *                 name:
 *                   type: string
 *                   example: Juan Pérez
 *       404:
 *         description: Jugador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Jugador no encontrado.
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error en el servidor.
 */

/**
 * @swagger
 * /players/create:
 *   post:
 *     summary: Crear un nuevo jugador
 *     tags: [Players]
 *     security:
 *       - bearerAuth: [] 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               position:
 *                 type: string
 *                 example: Delantero
 *     responses:
 *       201:
 *         description: Jugador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Jugador creado con éxito.
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Datos inválidos.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error en el servidor.
 */

/**
 * @swagger
 * /players/edit/{id}:
 *   put:
 *     summary: Actualizar un jugador existente
 *     tags: [Players]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               position:
 *                 type: string
 *                 example: Delantero
 *     responses:
 *       200:
 *         description: Jugador actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Jugador actualizado con éxito.
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Datos inválidos.
 *       404:
 *         description: Jugador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Jugador no encontrado.
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error en el servidor.
 */

/**
 * @swagger
 * /players/{id}:
 *   delete:
 *     summary: Eliminar un jugador por ID
 *     tags: [Players]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del jugador a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugador eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Jugador eliminado con éxito.
 *       404:
 *         description: Jugador no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Jugador no encontrado.
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error en el servidor.
 */

/**
 * @swagger
 * /players/search:
 *   get:
 *     summary: Buscar jugadores
 *     tags: [Players]
 *     security:
 *       - bearerAuth: [] 
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Nombre del jugador a buscar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Jugadores encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: 123456
 *                   name:
 *                     type: string
 *                     example: Juan Pérez
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error en el servidor.
 */

/**
 * @swagger
 * /players/download/csv:
 *   get:
 *     summary: Descargar jugadores en formato CSV
 *     tags: [Players]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: CSV descargado exitosamente
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error en el servidor.
 */

/**
 * @swagger
 * /players/convert/csv-to-excel:
 *   get:
 *     summary: Convertir CSV a Excel
 *     tags: [Players]
 *     security:
 *       - bearerAuth: [] 
 *     responses:
 *       200:
 *         description: Conversión a Excel realizada exitosamente
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Acceso denegado.
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Ocurrió un error en el servidor.
 */

router.get('/', authenticate, playerController.getAllPlayers);
router.get('/:id', authenticate, playerController.getPlayerById);
router.post('/create', authenticate, playerController.createPlayer);
router.put('/edit/:id', authenticate, playerController.updatePlayer);
router.delete('/:id', authenticate, playerController.deletePlayer);
router.get('/search', authenticate, playerController.searchPlayers);
router.get('/download/csv', authenticate, playerController.downloadPlayersCSV);
router.get('/convert/csv-to-excel', authenticate, playerController.convertCsvToExcel);

module.exports = router;
