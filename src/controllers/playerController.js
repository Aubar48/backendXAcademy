const Player = require('../models/playerModels');

// Obtener todos los jugadores
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los jugadores', error });
  }
};

// Obtener un jugador por ID
exports.getPlayerById = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el jugador', error });
  }
};

// Crear un nuevo jugador
exports.createPlayer = async (req, res) => {
  try {
    const player = await Player.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el jugador', error });
  }
};

// Actualizar un jugador por ID
exports.updatePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    await player.update(req.body);
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el jugador', error });
  }
};

// Eliminar un jugador por ID
exports.deletePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await Player.findByPk(id);
    if (!player) {
      return res.status(404).json({ message: 'Jugador no encontrado' });
    }
    await player.destroy();
    res.json({ message: 'Jugador eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el jugador', error });
  }
};
