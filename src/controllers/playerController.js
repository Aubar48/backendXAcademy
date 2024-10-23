// src/controllers/playerController.js

const playerService = require('../services/player.services');

// Obtener todos los jugadores
// src/controllers/playerController.js
exports.getAllPlayers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Obtener los parámetros de la consulta

  const offset = (page - 1) * limit; // Calcular el desplazamiento

  try {
    const { count, rows } = await playerService.getAllPlayers(limit, offset); // Pasar limit y offset a la función de servicio

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
      players: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los jugadores', error: error.message });
  }
};


// Obtener un jugador por ID
exports.getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await playerService.getPlayerById(id);
    if (!player) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el jugador', error: error.message });
  }
};

// Crear un nuevo jugador
exports.createPlayer = async (req, res) => {
  try {
    const player = await playerService.createPlayer(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el jugador', error: error.message });
  }
};

// Actualizar un jugador por ID
exports.updatePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await playerService.updatePlayer(id, req.body);
    res.json(player);
  } catch (error) {
    if (error.message === 'Jugador no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al actualizar el jugador', error: error.message });
  }
};

// Eliminar un jugador por ID
exports.deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await playerService.deletePlayer(id);
    res.json(result);
  } catch (error) {
    if (error.message === 'Jugador no encontrado') {
      return res.status(404).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error al eliminar el jugador', error: error.message });
  }
};
