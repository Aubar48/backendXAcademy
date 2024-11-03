const express = require('express');
const playerController = require('../controllers/playerFemaleController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Female Players
 *   description: Operaciones relacionadas con jugadoras femeninas
 */

/**
 * @swagger
 * /female:
 *   get:
 *     summary: Obtener todas las jugadoras femeninas
 *     tags: [Female Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de jugadoras femeninas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "María"
 *                   age:
 *                     type: integer
 *                     example: 25
 *                   position:
 *                     type: string
 *                     example: "Delantera"
 *       401:
 *         description: No autorizado (token inválido o ausente)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error en el servidor."
 */

/**
 * @swagger
 * /female/{id}:
 *   get:
 *     summary: Obtener una jugadora femenina por ID
 *     tags: [Female Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la jugadora femenina
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugadora femenina encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "María"
 *                 age:
 *                   type: integer
 *                   example: 25
 *                 position:
 *                   type: string
 *                   example: "Delantera"
 *       404:
 *         description: Jugadora femenina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Jugadora no encontrada."
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error en el servidor."
 */

/**
 * @swagger
 * /female/create:
 *   post:
 *     summary: Crear una nueva jugadora femenina
 *     tags: [Female Players]
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
 *                 example: "María"
 *               age:
 *                 type: integer
 *                 example: 25
 *               position:
 *                 type: string
 *                 example: "Delantera"
 *     responses:
 *       201:
 *         description: Jugadora femenina creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jugadora creada exitosamente."
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Los datos proporcionados no son válidos."
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error en el servidor."
 */

/**
 * @swagger
 * /female/edit/{id}:
 *   put:
 *     summary: Editar una jugadora femenina existente
 *     tags: [Female Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la jugadora femenina
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "María"
 *               age:
 *                 type: integer
 *                 example: 26
 *               position:
 *                 type: string
 *                 example: "Delantera"
 *     responses:
 *       200:
 *         description: Jugadora femenina actualizada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Jugadora actualizada exitosamente."
 *       400:
 *         description: Solicitud incorrecta (datos inválidos)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Los datos proporcionados no son válidos."
 *       404:
 *         description: Jugadora femenina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Jugadora no encontrada."
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error en el servidor."
 */

/**
 * @swagger
 * /female/{id}:
 *   delete:
 *     summary: Eliminar una jugadora femenina por ID
 *     tags: [Female Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la jugadora femenina
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Jugadora femenina eliminada
 *       404:
 *         description: Jugadora femenina no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Jugadora no encontrada."
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error en el servidor."
 */

/**
 * @swagger
 * /female/search:
 *   get:
 *     summary: Buscar jugadoras femeninas
 *     tags: [Female Players]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Nombre de la jugadora a buscar
 *         required: false
 *         schema:
 *           type: string
 *       - name: age
 *         in: query
 *         description: Edad de la jugadora a buscar
 *         required: false
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de jugadoras que coinciden con la búsqueda
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "María"
 *                   age:
 *                     type: integer
 *                     example: 25
 *                   position:
 *                     type: string
 *                     example: "Delantera"
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error en el servidor."
 */

/**
 * @swagger
 * /female/download/csv:
 *   get:
 *     summary: Descargar jugadoras en formato CSV
 *     tags: [Female Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo CSV descargado
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error en el servidor."
 */

/**
 * @swagger
 * /female/convert/csv-to-excel:
 *   get:
 *     summary: Convertir CSV a Excel
 *     tags: [Female Players]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Archivo Excel generado
 *       401:
 *         description: No autorizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Acceso denegado."
 *       500:
 *         description: Error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Ocurrió un error en el servidor."
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
